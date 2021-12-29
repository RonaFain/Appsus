import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const emailService = {
  query,
}

const STORAGE_KEY = 'mailDB'
const gEmails = [
  {
    id: utilService.makeId(),
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    status: 'inbox',
    isRead: 'true',
    isStared: 'true',
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
    isStared: 'true',
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
    isStared: 'true',
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
    isStared: 'true',
    lables: ['romantic'],
    sentAt: 1551133930594,
    from: 'user@appsus.com',
    to: 'jojo@jojo.com',
  },
  {
    id: utilService.makeId(),
    subject: 'Hellooooo!',
    body: 'Would love to catch up sometimes',
    status: 'inbox',
    isRead: 'false',
    isStared: 'true',
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
  if(!criteria) return Promise.resolve(emails)
  const filteredEmails = _getFilteredEmails(emails, criteria)
  return Promise.resolve(filteredEmails)
}

function _createEmails() {
  let emails = _loadEmailsFromStorage()
  if (!emails || !emails.length) {
    emails = gEmails
  }
  _saveEmailsToStorage(emails)
}

function _getUserEmails(emails) {
  return emails.filter(email => {
    return email.from !== loggedinUser.email
  })
}

function _getFilteredEmails(emails, criteria) {
  let { status, txt, isRead, isStared, lables } = criteria
  if(status === 'all') return emails
  const userEmails = _getUserEmails(emails)
  
  return userEmails.filter(email => {
    return email.status === status && 
           email.body.includes(txt) &&
           email.isRead === isRead &&
           email.isStared === isStared 
  })
}

function _loadEmailsFromStorage() {
  return storageService.loadFromStorage(STORAGE_KEY)
}

function _saveEmailsToStorage(emails) {
  storageService.saveToStorage(STORAGE_KEY, emails)
}
