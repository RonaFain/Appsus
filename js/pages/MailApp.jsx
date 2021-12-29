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
      isRead: 'false',
      isStared: 'true',
      lables: [],
    },
  }

  componentDidMount() {
    this.loadEmails()
  }

  loadEmails = () => {
    const { criteria } = this.state
    emailService.query(criteria).then((emails) => this.setState({ emails }))
  }

  onSetCriteriaStatus = (newStatus) => {
    this.setState((prevState) => ({ criteria: {...prevState.criteria, status: newStatus}}), this.loadEmails)
  }

  onSetFilter = (filterBy) => {
    console.log('filterBy' , filterBy);
    this.setState(prevState => ({criteria: {...prevState, isRead: filterBy.isRead, isStared: filterBy.isStared }}), this.loadEmails)
  }

  render() {
    const { emails , criteria } = this.state
    // console.log(criteria);

    return (
      <section className="mail-app">
        <aside>
          <EmailCompose />
          <EmailFolderList onSetCriteriaStatus={this.onSetCriteriaStatus}/>
        </aside>
        <EmailFilter onSetFilter={this.onSetFilter} />
        <EmailList emails={emails} />
      </section>
    )
  }
}
