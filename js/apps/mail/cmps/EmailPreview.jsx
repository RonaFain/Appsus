import { utilService } from '../../../services/util.service.js'

const { Link } = ReactRouterDOM

function getUserName(emailAddress) {
  const userName = emailAddress.substring(0, emailAddress.indexOf('@'))
  return utilService.capitalFirstLetter(userName)
}

export function EmailPreview({ email }) {
  return (
    <section className="email-preview">
      <div className="email-details">
        <h3>{getUserName(email.from)}</h3>
        <span>{email.subject}</span>
        <span className="email-body">{email.body}</span>
      </div>
      <span>{utilService.getTimeFromStamp(email.sentAt)}</span>
    </section>
  )
}
