export function EmailFolderList({ onSetCriteriaStatus }) {
  return (
    <section className="email-folder-list">
      <ul onClick={() => onSetCriteriaStatus(event.target.dataset.value)}>
        <li data-value="all">All</li>
        <li data-value="inbox">Inbox</li>
        <li data-value="sent">Sent</li>
        <li data-value="trash">Trash</li>
        <li data-value="draft">Draft</li>
      </ul>
    </section>
  )
}
