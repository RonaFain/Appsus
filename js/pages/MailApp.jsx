import { eventBusService } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'
import { emailService } from '../apps/mail/services/email.service.js'

import { EmailCompose } from '../apps/mail/cmps/EmailCompose.jsx'
import { EmailFolderList } from '../apps/mail/cmps/EmailFolderList.jsx'
import { EmailFilter } from '../apps/mail/cmps/EmailFilter.jsx'
import { EmailList } from '../apps/mail/cmps/EmailList.jsx'
import { EmailDetails } from '../apps/mail/pages/EmailDetails.jsx'
import { Loader } from '../cmps/Loader.jsx'

export class MailApp extends React.Component {
  state = {
    emails: [],
    criteria: {
      status: 'inbox',
      txt: '',
      isRead: undefined,
      isStarred: undefined,
    },
    isShowCompose: false,
    sort: {
      type: 'byDate',
      order: 1
    }
  }

  componentDidMount() {
    this.loadEmails()
    this.removeEventBus = eventBusService.on('search', (txt) => this.debbouncedFunc({ txt }))
  }

  componentWillUnmount() {
    this.removeEventBus();
  }

  onSetCriteria = (newCriteria) => {
    this.setState((prevState) => ({ criteria: { ...prevState.criteria, ...newCriteria }}), this.loadEmails)
  }

  debbouncedFunc = utilService.debounce(this.onSetCriteria, 50)

  loadEmails = () => {
    const { criteria , sort } = this.state
    emailService.query(criteria, sort).then((emails) => {
      this.setState({ emails })
      this.props.history.push('/mailapp')
    })
  }

  onToggleCompose = () => {
    this.setState({ isShowCompose: !this.state.isShowCompose})
  }

  onExpandEmail = (ev, emailId) => {
    if(ev) ev.stopPropagation()
    this.props.history.push(this.props.location.pathname + '/' + emailId);
  }

  onReplyEmail = (ev, emailId) => {
    if(ev) ev.stopPropagation();
    this.onExpandEmail(ev, emailId)
    this.setState({ isShowCompose: true })
  }

  onRemoveEmail = (ev, emailId) => {
    if(ev) ev.stopPropagation()
    emailService.removeEmail(emailId).then((email) => {
      this.loadEmails()
      eventBusService.emit('user-msg', { txt: 'The mail moved to trash' , type: 'danger' })
      this.props.history.push('/mailapp')
    })
  }

  onToggleField = (ev, emailId, field) => {
    if(ev) ev.stopPropagation();
    emailService.updateEmail(emailId, field).then((email) => {
      const message = this.getUserMessage(field , email[field])
      eventBusService.emit('user-msg', { txt: message, type: 'success' })
      this.loadEmails()
    })
  }

  getUserMessage = (field , value) => {
    if(field === 'isRead') return 'Mark as unread/read'
    else return 'Mark as unstarred/starred'
  }

  onSetSort = ({ target }) => {
    const sortBy = target.name
    const sort = { type: sortBy , order: 1}
    this.setState((prevState) => {
      if(prevState.sort.type === sortBy) sort.order = prevState.sort.order * -1
      return { sort }
    }, this.loadEmails)
  }

  onSetReadEmail = (email) => {
    emailService.updateEmailToRead(email.id).then((email) => {
      eventBusService.emit('user-msg', { txt: 'Mark as read', type: 'success' })
      this.loadEmails()
    })
  }

  render() {
    const { emails , criteria , isShowCompose} = this.state
    const { emailId } = this.props.match.params
    
    if(!emails) return <Loader />

    return (
      <section className="mail-app main-layout">
        <aside className="aside-container">
          <button className="compose-btn" onClick={this.onToggleCompose}>
            <img src="assets/imgs/apps/mail/plus.png" />
            <span> Compose</span>
          </button>
          {isShowCompose && <EmailCompose onToggleCompose={this.onToggleCompose} loadEmails={this.loadEmails} emailId={emailId} />}
          <EmailFolderList onSetCriteria={this.onSetCriteria} activeStatus={criteria.status}/>
        </aside>
        <div className="email-container">
          <EmailFilter onSetCriteria={this.onSetCriteria} onSetSort={this.onSetSort} />
          {!emailId ? <EmailList emails={emails} 
                                 loadEmails={this.loadEmails} 
                                 onExpandEmail={this.onExpandEmail} 
                                 onRemoveEmail={this.onRemoveEmail} 
                                 onReplyEmail={this.onReplyEmail}
                                 onToggleField={this.onToggleField}
                                 onSetReadEmail={this.onSetReadEmail}
                                 /> :
           <EmailDetails emailId={emailId} onReplyEmail={this.onReplyEmail} onRemoveEmail={this.onRemoveEmail} onToggleField={this.onToggleField} />}
        </div>
      </section>
    )
  }
}
