import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const emailService = {
  query,
  saveEmail,
  removeEmail,
  getEmailById,
  updateEmail,
  getAmoutEmailsByFilter,
  updateEmailToRead
}

const STORAGE_KEY = 'mailDB'
const gEmails = [
  {
    id: utilService.makeId(),
    subject: 'Hello my dear friend',
    body: 'Would love to catch up sometimes',
    status: 'inbox',
    isRead: true,
    isStarred: false,
    sentAt: 1551133930594,
    from: 'Koko@koko.com',
    to: 'momo@momo.com',
  },
  {
    id: utilService.makeId(),
    subject: 'Hi you!',
    body: 'My friend it is so good to see you again',
    status: 'inbox',
    isRead: false,
    isStarred: true,
    sentAt: 1551133930594,
    from: 'Asaf@momo.com',
    to: 'user@appsus.com',
  },
  {
    id: utilService.makeId(),
    subject: 'Invitation Meme Gen',
    body: 'Hola, alondai1 invited you as a teammate on Meme Gen in Zeplin.',
    status: 'inbox',
    isRead: false,
    isStarred: true,
    sentAt: 1551133930594,
    from: 'Alon@alon.com',
    to: 'user@appsus.com',
  },
  {
    id: utilService.makeId(),
    subject: 'Story Online',
    body: 'Thanks for shopping at Story. Your order will be processed by Global-e, our global fulfillment partner as Merchant of Record. We are happy to inform you that this order is now confirmed and we will begin processing your purchase for dispatch. Questions?',
    status: 'inbox',
    isRead: false,
    isStarred: true,
    sentAt: 1551133930594,
    from: 'Story@story.com',
    to: 'user@appsus.com',
  },
  {
    id: utilService.makeId(),
    subject: "2 new jobs for 'back end developer",
    body: '2 new jobs in Israel match your preferences.',
    status: 'inbox',
    isRead: false,
    isStarred: true,
    sentAt: 1551133930594,
    from: 'Linked@linkedin.com',
    to: 'user@appsus.com',
  },
  {
    id: utilService.makeId(),
    subject: 'Good morning',
    body: 'Would love to catch up sometimes',
    status: 'sent',
    isRead: false,
    isStarred: true,
    sentAt: 1551133930594,
    from: 'user@appsus.com',
    to: 'jojo@jojo.com',
  },
  {
    id: utilService.makeId(),
    subject: 'Welcome to Appsus',
    body: "You can connect to the app easily and quickly via phone verification by SMS.",
    status: 'sent',
    isRead: false,
    isStarred: true,
    sentAt: 1551133930594,
    from: 'user@appsus.com',
    to: 'bobo@bobo.com',
  },
  {
    id: utilService.makeId(),
    subject: 'Hello!',
    body: 'Do you rememver me?',
    status: 'trash',
    isRead: false,
    isStarred: true,
    sentAt: 1551133930594,
    from: 'bobo@bobo.com',
    to: 'user@appsus.com',
  },
  {
    id: utilService.makeId(),
    subject: 'Comfirm',
    body: 'Yes I agree',
    status: 'trash',
    isRead: false,
    isStarred: true,
    sentAt: 1551133930594,
    from: 'jojo@jojo.com',
    to: 'user@appsus.com',
  },
  {
    id: utilService.makeId(),
    subject: 'Meeting',
    body: 'Could you call me back?',
    status: 'draft',
    isRead: false,
    isStarred: true,
    sentAt: 1551133930594,
    from: 'user@appsus.com',
    to: 'koko@koko.com',
  },
]

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
}

_createEmails()

function query(criteria = null, sort = null) {
  const emails = _loadEmailsFromStorage()
  const allUserEmails = _getAllUserEmails(emails)
  if (!criteria) return Promise.resolve(allUserEmails)
  const filteredEmails = _getFilteredEmails(allUserEmails, criteria)
  if(sort) {
    const mapSort = { byDate: 'sentAt' , bySubject: 'subject' }
    filteredEmails.sort((e1, e2) => (e1[mapSort[sort.type]] < e2[mapSort[sort.type]] ? sort.order : sort.order * -1))
  }
  return Promise.resolve(filteredEmails)
}

function saveEmail(emailToSave, status) {
  return emailToSave.id
    ? _updateEmail(emailToSave)
    : _addEmail(emailToSave, status)
}

function removeEmail(emailId) {
  let emails = _loadEmailsFromStorage()
  const email = emails.find((email) => email.id === emailId)
  if(email.status === 'draft' || email.status === 'trash') emails = emails.filter((email) => email.id !== emailId)
  else email.status = 'trash'
  _saveEmailsToStorage(emails)
  return Promise.resolve(email)
}

function getEmailById(emailId) {
  let emails = _loadEmailsFromStorage()
  const email = emails.find((email) => email.id === emailId)
  return Promise.resolve(email)
}

function updateEmail(emailId, field) {
  let emails = _loadEmailsFromStorage()
  const email = emails.find((email) => email.id === emailId)
  const value = email[field]
  email[field] = !value
  _saveEmailsToStorage(emails)
  return Promise.resolve(email)
}

function updateEmailToRead(emailId) {
  let emails = _loadEmailsFromStorage()
  const email = emails.find((email) => email.id === emailId)
  email['isRead'] = true
  _saveEmailsToStorage(emails)
  return Promise.resolve(email)
}

function getAmoutEmailsByFilter(field, value, isRead = undefined) {
  const emails = _loadEmailsFromStorage()
  const userEmails = _getAllUserEmails(emails)
  const amountEmail = userEmails.filter((email) => {
    const isReadFilter = (isRead === undefined || email.isRead === isRead)
    return email[field] === value && isReadFilter
  }).length
  return amountEmail
}

function _addEmail(emailToSave, status) {
  let emails = _loadEmailsFromStorage()
  let email = _createEmail(emailToSave, status)
  emails = [email, ...emails]
  _saveEmailsToStorage(emails)
  return Promise.resolve(email)
}

function _updateEmail(emailToSave) {
  const emails = _loadEmailsFromStorage()
  const emailIdx = emails.findIndex((email) => email.id === emailToSave.id)
  emails[emailIdx] = _createEmail(emailToSave, 'sent', emailToSave.id)
  _saveEmailsToStorage(emails)
  return Promise.resolve()
}

function _createEmail(emailToSave, status = 'sent', id = utilService.makeId()) {
  return {
    id: id,
    subject: emailToSave.subject,
    body: emailToSave.body,
    status: status,
    isRead: false,
    isStarred: false,
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
  const toUserEmails = _getUserEmails(emails, 'to')
  const fromUserEmails = _getUserEmails(emails, 'from')
  if(status === 'trash') return _getCorrectEmails(emails, criteria)
  else if(status === 'inbox')
    return _getCorrectEmails(toUserEmails, criteria)
  else if (status === 'sent' || status === 'draft')
    return _getCorrectEmails(fromUserEmails, criteria)
  else return _getCorrectEmails(emails, criteria)
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
  let { status, txt, isRead, isStarred } = criteria
  status = status === 'all' ? '' : status
  const filter = emails.filter((email) => {
    const isReadFilter =
      isRead === undefined || email.isRead === criteria.isRead
    const isStarredFilter =
      isStarred === undefined || email.isStarred === criteria.isStarred
    return (
      email.status.includes(status) &&
      email.subject.toUpperCase().includes(txt.toUpperCase()) &&
      isReadFilter &&
      isStarredFilter
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
