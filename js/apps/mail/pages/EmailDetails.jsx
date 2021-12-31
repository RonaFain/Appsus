import { emailService } from '../services/email.service.js'

const { withRouter } = ReactRouterDOM

class _EmailDetails extends React.Component {
  state = {
    email: null,
  }

  componentDidMount() {
    this.loadEmail()
  }

  loadEmail = () => {
    const { emailId } = this.props
    emailService.getEmailById(emailId).then((email) => this.setState({ email }))
  }

  goBack = () => {
      this.props.history.push('/mailapp')
  }

  render() {
    const { email } = this.state
    if (!email) return <React.Fragment></React.Fragment>

    const { onReplyEmail , onRemoveEmail , onToggleField} = this.props
    const isReceived = (email.status === 'sent' || email.status === 'draft') ? true : false

    return (
      <section className="email-deatils">
        <div className="email-details-tools">
          <button onClick={this.goBack} title={'Go back'}><i className="fas fa-arrow-left"></i></button>
          <div className="tools-btns">
              {email.status === 'inbox' && 
                <button onClick={() => onReplyEmail()} title={'Reply'}>
                    <i className="fas fa-reply"></i>
                </button>
              }
              <button onClick={() => onRemoveEmail(null, email.id)} title={'Delete'}><i className="fas fa-trash-alt"></i></button>
              <button onClick={(ev) => onToggleField(ev, email.id, 'isRead')} title={email.isRead ? 'Mark as unread' : 'Mark as read'}>
                <i className={`fas fa-envelope${email.isRead ? '-open' : ''}`}></i>
              </button>
              <button title={'Export to note'}><i className="fas fa-sticky-note"></i></button>
              <button onClick={(ev) => onToggleField(ev, email.id, 'isStarred')} className={`email-star ${email.isStarred}`} 
                      title={email.isStarred ? 'Mark as unstarred' : 'Mark as starred'}>
                      <i className="fas fa-star"></i>
              </button>
          </div>
        </div>
        <div className="email-details-content">
            <p>{isReceived ? `To: ${email.to}`: `From: ${email.from}`  }</p>
            <p>Subject: {email.subject}</p>
            <p>{email.body}</p>
        </div>
      </section>
    )
  }
}

export const EmailDetails = withRouter(_EmailDetails)
