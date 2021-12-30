import { eventBusService } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'
import { emailService } from '../apps/mail/services/email.service.js'

import { EmailCompose } from '../apps/mail/cmps/EmailCompose.jsx'
import { EmailFolderList } from '../apps/mail/cmps/EmailFolderList.jsx'
import { EmailFilter } from '../apps/mail/cmps/EmailFilter.jsx'
import { EmailList } from '../apps/mail/cmps/EmailList.jsx'

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
    this.setState((prevState) => ({ criteria: { ...prevState.criteria, ...newCriteria }}), this.loadEmails)
  }

  debbouncedFunc = utilService.debounce(this.onSetCriteria, 100)

  loadEmails = () => {
    const { criteria } = this.state
    emailService.query(criteria).then((emails) => this.setState({ emails }))
  }

  onSetFilter = (filterBy) => {
    console.log('filterBy' , filterBy);
    this.setState(prevState => ({criteria: {...prevState, isRead: filterBy.isRead, isStared: filterBy.isStared }}), this.loadEmails)
  }

  onToggleCompose = () => {
    this.setState({ isShowCompose: !this.state.isShowCompose})
  }

  render() {
    const { emails , criteria , isShowCompose} = this.state
    // console.log(criteria);

    return (
      <section className="mail-app main-layout">
        <aside className="aside-container">
          <button className="compose-btn" onClick={this.onToggleCompose}>
            <img src="assets/imgs/apps/mail/plus.png" />
            <span> Compose</span>
          </button>
          {isShowCompose && <EmailCompose onToggleCompose={this.onToggleCompose} loadEmails={this.loadEmails} />}
          <EmailFolderList onSetCriteria={this.onSetCriteria} activeStatus={criteria.status}/>
        </aside>
        <div className="email-container">
          <EmailFilter onSetCriteria={this.onSetCriteria} />
          <EmailList emails={emails} loadEmails={this.loadEmails} />
        </div>
      </section>
    )
  }
}
