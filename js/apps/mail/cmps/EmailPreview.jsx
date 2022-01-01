import { utilService } from '../../../services/util.service.js'
import { emailService } from '../services/email.service.js'

import { EmailExpandPreview } from '../cmps/EmailExpandPreview.jsx'
import { LongTxt } from '../../../cmps/LongTxt.jsx'

export class EmailPreview extends React.Component {
  state = {
    isShowOptions: false,
    isExpendPreview: false
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

  onToggleExpandPreview = () => {
    this.setState({ isExpendPreview: !this.state.isExpendPreview })
    this.props.onSetReadEmail(this.props.email)
  }

  render() {
    const { email , onExpandEmail, onRemoveEmail, onReplyEmail , onToggleField } = this.props
    const { isShowOptions , isExpendPreview } = this.state

    return (
      <section className={`email-preview ${email.isRead ? 'read' : '' }`}>
        <div className="email-preview-container" 
             onMouseEnter={this.onShowOptions} 
             onMouseLeave={this.onHideOptions}
             onClick={this.onToggleExpandPreview}>
          <div className="email-content">
            <button onClick={(ev) => onToggleField(ev, email.id, 'isStarred')} className={`email-star ${email.isStarred}`}
                    title={email.isStarred ? 'Mark as unstarred' : 'Mark as starred'}>
              <i className="fas fa-star"></i>
            </button>
            <h3>{email.status === 'sent' ? this.getUserName(email.to) : this.getUserName(email.from)}</h3>
            <span>{email.subject}</span>
            <LongTxt text={email.body} />
          </div>
          {isShowOptions ? 
            <div className="options-btn">
              {email.status === 'inbox' && 
                <button onClick={(ev)=> onReplyEmail(ev, email.id)} title={'Reply'}>
                  <i className="fas fa-reply"></i>
                </button>}
              <button onClick={(ev) => onRemoveEmail(ev, email.id)} title={'Delete'}><i className="fas fa-trash-alt"></i></button>
              <button onClick={(ev) => onToggleField(ev, email.id, 'isRead')} title={email.isRead ? 'Mark as unread' : 'Mark as read'}>
                <i className={`fas fa-envelope${email.isRead ? '-open' : ''}`}></i>
              </button>
              <button onClick={(ev) => onExpandEmail(ev, email.id)} title={'Show more'}><i className="fas fa-expand"></i></button>
            </div>
          : <span>{utilService.getTimeFromStamp(email.sentAt)}</span> }
        </div>
        {isExpendPreview && <EmailExpandPreview email={email} /> }
      </section>
    )
  }
}
