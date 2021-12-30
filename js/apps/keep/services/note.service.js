import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const notesService = {
    query,
    saveNote,
    deleteNote,
    duplicateNote,
    changeBgc,
    togglePin,
    toggleTodo
}


const STORAGE_KEY = 'notesDB'


const gNotes = [
    {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
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
        isPinned: false,
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
        isPinned: false,
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
                    doneAt: null
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

function toggleTodo(noteId, todoId) {
    const notes = _loadNotesFromStorage()
    const note = notes.find(note => {
        return note.id === noteId
    })
    const todo = note.info.todos.find(todo => {
        return todo.id === todoId
    })
    if (!todo.doneAt) todo.doneAt = new Date()
    else todo.doneAt = null
    _saveNotesToStorage(notes)
    return Promise.resolve(note)
}

function togglePin(noteId) {
    let notes = _loadNotesFromStorage()
    const note = notes.find(note => {
        return note.id === noteId
    })
    const noteIdx = notes.findIndex(note => note.id === noteId)
    const noteToMove = notes.splice(noteIdx, 1)[0]
    if (!note.isPinned) notes = [noteToMove, ...notes]
    else notes = [...notes, noteToMove]
    noteToMove.isPinned = !noteToMove.isPinned
    _saveNotesToStorage(notes)
    return Promise.resolve(noteToMove)
}

function changeBgc(noteId, color) {
    const notes = _loadNotesFromStorage()
    const note = notes.find(note => note.id === noteId)
    note.style.backgroundColor = color
    _saveNotesToStorage(notes)
    return Promise.resolve(note)
}

function duplicateNote(noteId) {
    let notes = _loadNotesFromStorage()
    const noteIdx = notes.findIndex(note => noteId === note.id)
    const note = JSON.parse(JSON.stringify(notes[noteIdx]))
    note.id = utilService.makeId()
    notes.splice(noteIdx, 0, note)
    _saveNotesToStorage(notes)
    return Promise.resolve()
}

function deleteNote(noteId) {
    let notes = _loadNotesFromStorage()
    notes = notes.filter(note => noteId !== note.id)
    _saveNotesToStorage(notes)
    return Promise.resolve()
}

function saveNote(note) {
    note.id = utilService.makeId()
    if (note.type === 'note-todos') {
        const todosArr = note.info.todos
        const todos = todosArr.map(todo => {
            return { id: utilService.makeId(), txt: todo }
        })
        note.info.todos = todos
    }
    let notes = _loadNotesFromStorage()
    notes = [note, ...notes]
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