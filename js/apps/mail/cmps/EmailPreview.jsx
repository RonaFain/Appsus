import { utilService } from '../../../services/util.service.js'
import { emailService } from '../services/email.service.js'


export class EmailPreview extends React.Component {
  state = {
    isShowOptions: false
  }

  onShowOptions = () => {
    this.setState({ isShowOptions: true})
  }

  onHideOptions = () => {
    this.setState({ isShowOptions: false})
  }

  getUserName = (emailAddress) => {
    const userName = emailAddress.substring(0, emailAddress.indexOf('@'))
    return utilService.capitalFirstLetter(userName)
  }

  onRemoveEmail = () => {
    const { email } = this.props;
    emailService.removeEmail(email.id).then(() => {
      this.props.loadEmails()
    })
  }

  render() {
    const { email } = this.props
    const { isShowOptions } = this.state

    return (
      <section className="email-preview">
        <div className="email-preview-container" onMouseEnter={this.onShowOptions} onMouseLeave={this.onHideOptions}>
          <div className="email-details">
            <h3>{this.getUserName(email.from)}</h3>
            <span>{email.subject}</span>
            <span className="email-body">{email.body}</span>
          </div>
          {isShowOptions ? 
            <div className="options-btn">
              <button><i className="fas fa-reply"></i></button>
              <button onClick={this.onRemoveEmail}><i className="fas fa-trash-alt"></i></button>
              <button><i className={`fas fa-envelope${email.isRead ? '-open' : ''}`}></i></button>
            </div>
          : <span>{utilService.getTimeFromStamp(email.sentAt)}</span> }
        </div>
      </section>
    )
  }
}
