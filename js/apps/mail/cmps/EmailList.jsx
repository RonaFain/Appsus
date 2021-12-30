import { EmailPreview } from '../cmps/EmailPreview.jsx'

export function EmailList({
  emails,
  loadEmails,
  onExpandEmail,
  onRemoveEmail,
  onReplyEmail,
  onToggleField,
}) {
  if (!emails || !emails.length) return <h1>There are no emails</h1>
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
        />
      ))}
    </section>
  )
}
