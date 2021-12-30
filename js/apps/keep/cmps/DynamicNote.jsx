import { notesService } from "../services/note.service.js"

import { TxtNote } from "./TxtNote.jsx"
import { ImgNote } from "./ImgNote.jsx"
import { TodosNote } from "./TodosNote.jsx"
import { PickNoteColor } from "./PickNoteColor.jsx"


export class DynamicNote extends React.Component {

    state = {
        note: null,
        isColorMenuOn: false
    }

    componentDidMount() {
        this.loadNote()
    }

    loadNote = () => {
        const { note } = this.props
        this.setState({ note })
    }

    onToggleTodo = (noteId,todoId) => {
     notesService.toggleTodo(noteId,todoId).then((note) =>{
         this.setState({note})
     })
    }

    onDeleteNote = (noteId) => {
        notesService.deleteNote(noteId).then(
            this.props.loadNotes()
        )
    }

    onDuplicateNote = (noteId) => {
        notesService.duplicateNote(noteId).then(
            this.props.loadNotes()
        )
    }

    onChangeBgc = (noteId, color) => {
        notesService.changeBgc(noteId, color).then((note) => {
            this.setState({ note })
            this.onToggleColorMenu()
        }
        )
    }

    onTogglePin = (noteId) => {
        notesService.togglePin(noteId).then((note) => {
            this.setState({ note },
            this.props.loadNotes()
            )
        })
    }

    onToggleColorMenu = () => {
        this.setState({ isColorMenuOn: !this.state.isColorMenuOn })
    }


    render() {
        const { note, isColorMenuOn } = this.state
        if (!note) return <React.Fragment></React.Fragment>
        const { isPinned } = note
        return (
            <section className="dynamic-note" style={{ backgroundColor: note.style.backgroundColor }}>
                {note.type === 'note-txt' && <TxtNote note={note} />}
                {note.type === 'note-img' && <ImgNote note={note} />}
                {note.type === 'note-todos' && <TodosNote note={note} onToggleTodo={this.onToggleTodo} />}
                <section className="note-btns">
                    <button title="Delete" onClick={() => this.onDeleteNote(note.id)}><img src="assets/imgs/svgs/delete.svg" /></button>
                    <button title="Duplicate" onClick={() => this.onDuplicateNote(note.id)}><img src="assets/imgs/duplicate.png" /></button>
                    <button title="Send as mail"><img src="assets/imgs/mail-close.png" /></button>
                    <button title={isPinned ? "Unpin" : "Pin"} onClick={() => this.onTogglePin(note.id)}><img src={isPinned ? "assets/imgs/pinned.png" : "assets/imgs/unpinned.png"} /></button>
                    <button title="Change color" onClick={() => this.onToggleColorMenu(note.id)}><img src="assets/imgs/change-color.png" /></button>
                    {isColorMenuOn && <PickNoteColor noteId={note.id} onChangeBgc={this.onChangeBgc} />}
                </section>
            </section>
        )
    }

}