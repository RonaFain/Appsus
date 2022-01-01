import { EmailPreview } from '../cmps/EmailPreview.jsx'

export function EmailList({
  emails,
  loadEmails,
  onExpandEmail,
  onRemoveEmail,
  onReplyEmail,
  onToggleField,
  onSetReadEmail
}) {
  if (!emails || !emails.length) return <React.Fragment><h1 className="empty-list">There are no emails</h1></React.Fragment>
  return (
    <section className="email-list">
      {emails.map((email) => (
        <EmailPreview
          key={email.id}
          email={email}
          loadEmails={loadEmails}
          onExpandEmail={onExpandEmail}
          onRemoveEmail={onRemoveEmail}
          onReplyEmail={onReplyEmail}
          onToggleField={onToggleField}
          onSetReadEmail={onSetReadEmail}
        />
      ))}
    </section>
  )
}
