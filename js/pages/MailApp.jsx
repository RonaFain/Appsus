import { eventBusService } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'
import { emailService } from '../apps/mail/services/email.service.js'

import { EmailCompose } from '../apps/mail/cmps/EmailCompose.jsx'
import { EmailFolderList } from '../apps/mail/cmps/EmailFolderList.jsx'
import { EmailFilter } from '../apps/mail/cmps/EmailFilter.jsx'
import { EmailList } from '../apps/mail/cmps/EmailList.jsx'
import { EmailDetails } from '../apps/mail/pages/EmailDetails.jsx';

export class MailApp extends React.Component {
  state = {
    emails: [],
    criteria: {
      status: 'inbox',
      txt: '',
      isRead: '',
      isStared: '',
      lables: [],
    },
    isShowCompose: false
  }

  componentDidMount() {
    this.loadEmails()
    this.removeEventBus = eventBusService.on('search', (txt) => this.debbouncedFunc({ txt }))
  }

  componentWillUnmount() {
    this.removeEventBus();
  }

  onSetCriteria = (newCriteria) => {
    // console.log('newCriteria' , newCriteria);
    this.setState((prevState) => ({ criteria: { ...prevState.criteria, ...newCriteria }}), console.log(this.state))
  }

  debbouncedFunc = utilService.debounce(this.onSetCriteria, 100)

  loadEmails = () => {
    const { criteria } = this.state
    emailService.query(criteria).then((emails) => {
      this.setState({ emails })
      this.props.history.push('/mailapp')})
  }

  onSetFilter = (filterBy) => {
    this.setState(prevState => ({criteria: {...prevState, isRead: filterBy.isRead, isStared: filterBy.isStared }}), this.loadEmails)
  }

  onToggleCompose = () => {
    this.setState({ isShowCompose: !this.state.isShowCompose})
  }

  onExpandEmail = (emailId) => {
    this.props.history.push(this.props.location.pathname + '/' + emailId);
  }

  onReplyEmail = (emailId) => {
    this.onExpandEmail(emailId)
    this.setState({ isShowCompose: true })
  }

  onRemoveEmail = (emailId) => {
    emailService.removeEmail(emailId).then(() => {
      this.loadEmails()
      this.props.history.push('/mailapp')
    })
  }

  onToggleField = (emailId, field) => {
    emailService.updateEmail(emailId, field).then((email) => {
      console.log(email);
      this.loadEmails()
    })
  }

  render() {
    const { emails , criteria , isShowCompose} = this.state
    const { emailId } = this.props.match.params
    // console.log(criteria);

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
          <EmailFilter onSetCriteria={this.onSetCriteria} />
          {!emailId ? <EmailList emails={emails} 
                                 loadEmails={this.loadEmails} 
                                 onExpandEmail={this.onExpandEmail} 
                                 onRemoveEmail={this.onRemoveEmail} 
                                 onReplyEmail={this.onReplyEmail}
                                 onToggleField={this.onToggleField}
                                 /> :
           <EmailDetails emailId={emailId} onReplyEmail={this.onReplyEmail} onRemoveEmail={this.onRemoveEmail} onToggleField={this.onToggleField} />}
        </div>
      </section>
    )
  }
}
