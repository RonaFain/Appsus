import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const notesService = {
    query,
    saveNote,
    deleteNote,
    duplicateNote,
    changeBgc,
    togglePin,
    toggleTodo,
    saveEdit,
    _saveNotesToStorage,
    _loadNotesFromStorage
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
            title: "Get my stuff together",
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
    const filteredNotes = _getFilteredNotes(notes, filterBy)
    // console.log(filteredNotes)
    return Promise.resolve(filteredNotes)
}

function _getFilteredNotes(notes,filterBy) {
    const {type} = filterBy
    if (type === 'all') return notes
    const filteredNotes = notes.filter(note => { 
        return note.type === `note-${type}`
    })
    // console.log(filteredNotes)
    return filteredNotes
}

function toggleTodo(noteId, todoId) {
    const notes = _loadNotesFromStorage()
    const note = notes.find(note => noteId === note.id)
    const todo = note.info.todos.find(todo => todo.id === todoId)
    if (!todo.doneAt) todo.doneAt = new Date()
    else todo.doneAt = null
    _saveNotesToStorage(notes)
    return Promise.resolve(note)
}

function togglePin(noteId) {
    let notes = _loadNotesFromStorage()
    const note = notes.find(note => note.id === noteId)
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

function saveEdit(note){
    // if(note.type === 'note-todos') return Promise.resolve(note)
    let notes = _loadNotesFromStorage()
    const noteId = note.id
    const noteIdx = notes.findIndex(note => note.id === noteId)
    notes[noteIdx] = note
    _saveNotesToStorage(notes)
    return Promise.resolve(note)
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
    if(note.type === 'note-video') {
        const youtubeId = utilService.getYoutubeId(note.info.url)
        note.info.url = `https://www.youtube.com/embed/${youtubeId}`
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