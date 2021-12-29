import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const notesService = {
    query,
    saveNote
}


const STORAGE_KEY = 'notesDB'


const gNotes = [
    {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: true,
        info: {
            title: 'My Text',
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: "yellow"
        }
    },
    {
        id: utilService.makeId(),
        type: "note-img",
        info: {
            url: "assets/imgs/sahar.jpg",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: utilService.makeId(),
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                {
                    id: utilService.makeId(),
                    txt: "Driving liscence",
                    doneAt: null
                },
                {
                    id: utilService.makeId(),
                    txt: "Coding power",
                    doneAt: 187111111
                }
            ]
        },
        style: {
            backgroundColor: "green"
        }
    }
]

_createNotes()

function query(filterBy = null) {
    const notes = _loadNotesFromStorage()
    if (!filterBy) return Promise.resolve(notes)
    const filteredNotes = _getFilteredCars(notes, filterBy)
    return Promise.resolve(filteredNotes)
}


function saveNote(note){
    note.id = utilService.makeId()
    let notes = _loadNotesFromStorage()
    notes = [note,...notes]
    _saveNotesToStorage(notes)
    return Promise.resolve()
}


function _createNotes() {
    var notes = _loadNotesFromStorage()
    if (!notes || !notes.length) {
        _saveNotesToStorage(gNotes)
    }
}





















function _saveNotesToStorage(notes) {
    storageService.saveToStorage(STORAGE_KEY, notes)
}

function _loadNotesFromStorage() {
    return storageService.loadFromStorage(STORAGE_KEY)
}