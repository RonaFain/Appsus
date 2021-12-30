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
          <button onClick={this.goBack}>Back</button>
          <div className="tools-btns">
              <button onClick={() => onReplyEmail()}>reply</button>
              <button onClick={() => onRemoveEmail(email.id)}>delete</button>
              <button>Mark as unread</button>
              <button>Export to note</button>
              <button onClick={() => onToggleField(email.id, 'isStared')} className={`email-star ${email.isStared}`}><i className="fas fa-star"></i></button>
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
