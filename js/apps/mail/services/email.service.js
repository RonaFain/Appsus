import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const emailService = {
  query,
  saveEmail,
  removeEmail,
  getEmailById,
  updateEmail
}

const STORAGE_KEY = 'mailDB'
const gEmails = [
  {
    id: utilService.makeId(),
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    status: 'inbox',
    isRead: 'true',
    isStared: 'false',
    lables: ['important', 'romantic'],
    sentAt: 1551133930594,
    from: 'jojo@jojo.com',
    to: 'momo@momo.com',
  },
  {
    id: utilService.makeId(),
    subject: 'Hi you!',
    body: 'Would love to catch up sometimes',
    status: 'inbox',
    isRead: 'false',
    isStared: 'false',
    lables: ['important', 'romantic'],
    sentAt: 1551133930594,
    from: 'momo@momo.com',
    to: 'jojo@jojo.com',
  },
  {
    id: utilService.makeId(),
    subject: 'Hellooooo!',
    body: 'Would love to catch up sometimes',
    status: 'sent',
    isRead: 'false',
    isStared: 'false',
    lables: ['romantic'],
    sentAt: 1551133930594,
    from: 'momo@momo.com',
    to: 'jojo@jojo.com',
  },
  {
    id: utilService.makeId(),
    subject: 'Hellooooo!',
    body: 'Would love to catch up sometimes',
    status: 'inbox',
    isRead: 'false',
    isStared: 'false',
    lables: ['romantic'],
    sentAt: 1551133930594,
    from: 'user@appsus.com',
    to: 'jojo@jojo.com',
  },
  {
    id: utilService.makeId(),
    subject: 'Hellooooo!',
    body: 'Would love to catch up sometimes',
    status: 'trash',
    isRead: 'false',
    isStared: 'false',
    lables: ['romantic'],
    sentAt: 1551133930594,
    from: 'bobo@bobo.com',
    to: 'user@appsus.com',
  },
]

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
}

_createEmails()

function query(criteria = null) {
  const emails = _loadEmailsFromStorage()
  if (!criteria) return Promise.resolve(emails)
  const filteredEmails = _getFilteredEmails(emails, criteria)
  return Promise.resolve(filteredEmails)
}

function saveEmail(emailToSave) {
  return emailService.id ? _updateEmail(emailToSave) : _addEmail(emailToSave)
}

function removeEmail(emailId) {
  let emails = _loadEmailsFromStorage()
  emails = emails.filter((email) => email.id !== emailId)
  _saveEmailsToStorage(emails)
  return Promise.resolve()
}

function getEmailById(emailId) {
  let emails = _loadEmailsFromStorage()
  const email = emails.find(email => email.id === emailId)
  return Promise.resolve(email)
}

function updateEmail(emailId, field) {
  let emails = _loadEmailsFromStorage()
  const email = emails.find(email => email.id === emailId)
  const value = (email[field] === 'true') ? 'false' : 'true'
  email[field] = value
  _saveEmailsToStorage(emails)
  return Promise.resolve(email)
}

function _addEmail(emailToSave) {
  console.log('adddd', emailToSave)
  let emails = _loadEmailsFromStorage()
  let email = _createEmail(emailToSave)
  emails = [email, ...emails]
  _saveEmailsToStorage(emails)
  return Promise.resolve()
}

function _updateEmail(emailToSave) {
  console.log('updateeeeeee', emailToSave)
}

function _createEmail(emailToSave) {
  return {
    id: utilService.makeId(),
    subject: emailToSave.subject,
    body: emailToSave.body,
    status: 'sent',
    isRead: 'true',
    isStared: 'false',
    lables: [],
    sentAt: Date.now(),
    from: loggedinUser.email,
    to: emailToSave.toUser,
  }
}

function _createEmails() {
  let emails = _loadEmailsFromStorage()
  if (!emails || !emails.length) {
    emails = gEmails
  }
  _saveEmailsToStorage(emails)
}

function _getFilteredEmails(emails, criteria) {
  let { status } = criteria
  const allUserEmails = _getAllUserEmails(emails)
  const toUserEmails = _getUserEmails(emails, 'to')
  const fromUserEmails = _getUserEmails(emails, 'from')
  if(status === 'inbox' || status === 'trash')  return _getCorrectEmails(toUserEmails, criteria)
  else if(status === 'sent' || status === 'draft') return _getCorrectEmails(fromUserEmails, criteria)
  else return _getCorrectEmails(allUserEmails, criteria)
}

function _getAllUserEmails(emails) {
  return emails.filter((email) => {
    return email.from === loggedinUser.email || email.to === loggedinUser.email
  })
}

function _getUserEmails(emails, type) {
  return emails.filter((email) => {
    return email[type] === loggedinUser.email
  })
}

function _getCorrectEmails(emails, criteria) {
  let { status, txt, isRead, isStared, lables } = criteria
  status = (status === 'all') ? '' : status
  const filter = emails.filter((email) => {
    return (
      email.status.includes(status) &&
      email.body.includes(txt) &&
      email.isRead.includes(isRead) &&
      email.isStared.includes(isStared)
    )
  })
  return filter
}

function _loadEmailsFromStorage() {
  return storageService.loadFromStorage(STORAGE_KEY)
}

function _saveEmailsToStorage(emails) {
  storageService.saveToStorage(STORAGE_KEY, emails)
}
