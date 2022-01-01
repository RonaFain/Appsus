import { notesService } from "../services/note.service.js"

import { TxtNote } from "./TxtNote.jsx"
import { ImgNote } from "./ImgNote.jsx"
import { TodosNote } from "./TodosNote.jsx"
import { VideoNote } from "./VideoNote.jsx"
import { PickNoteColor } from "./PickNoteColor.jsx"
import { EditNoteModal } from "./EditNoteModal.jsx"

const {Link} = ReactRouterDOM

export class DynamicNote extends React.Component {

    state = {
        note: null,
        isColorMenuOn: false,
        isEditModalOn: false
    }

    componentDidMount() {
        this.loadNote()
    }

    loadNote = () => {
        const { note } = this.props

        this.setState({ note })
    }

    onToggleTodo = (noteId, todoId) => {
        notesService.toggleTodo(noteId, todoId).then((note) => {
            this.setState({ note })
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
            // this.setState({ note },
                this.props.loadNotes()
            // )
        })
    }

    onToggleColorMenu = () => {
        this.setState({ isColorMenuOn: !this.state.isColorMenuOn })
    }

    onToggleEditModal = () => {
        this.setState({ isEditModalOn: !this.state.isEditModalOn })
    }

    onSaveEdit = (ev, note) => {
        ev.preventDefault()
        notesService.saveEdit(note).then(
            this.setState({ note }),
            this.onToggleEditModal()
        )
    }

    onExportNoteToEmail = (note) => {
        const subject = (note.info.title) ? note.info.title : 'No subject'
        let body = 'No body'
        switch (note.type) {
          case 'note-txt':
            body = note.info.txt
            break;
          case 'note-video':
            body = note.info.url
            break;
          case 'note-img':
            body = note.info.url
            break;
          case 'note-todos':
            const todosTxts = note.info.todos.map((todo) => todo.txt);
            body = 'Todos: \n• ' + todosTxts.join('\n* ');
            break;
        }
        
         return `/mailapp?subject=${subject}&body=${body}`
        
      }
    


    render() {
        const { note, isColorMenuOn, isEditModalOn } = this.state
        if (!note) return <React.Fragment></React.Fragment>
        const exportTo = this.onExportNoteToEmail(note)
        // console.log(exportTo)
        const { isPinned } = note
        return (
            <section className="notes-container">
                <section className="dynamic-note" style={{ backgroundColor: note.style.backgroundColor }}>
                    {note.type === 'note-txt' && <TxtNote note={note} />}
                    {note.type === 'note-video' && <VideoNote note={note} />}
                    {note.type === 'note-img' && <ImgNote note={note} />}
                    {note.type === 'note-todos' && <TodosNote note={note} onToggleTodo={this.onToggleTodo} />}
                    <section className="note-btns">
                        <button title="Delete" onClick={() => this.onDeleteNote(note.id)}><img src="assets/imgs/svgs/delete.svg" /></button>
                        <button title="Duplicate" onClick={() => this.onDuplicateNote(note.id)}><img src="assets/imgs/duplicate.png" /></button>
                        <button title="Edit" onClick={this.onToggleEditModal}><img src="assets/imgs/edit1.png" /></button>
                        <Link to={exportTo}><button title="Send as mail" ><img src="assets/imgs/mail-close.png" /></button></Link>
                        <button title={isPinned ? "Unpin" : "Pin"} onClick={() => this.onTogglePin(note)}><img src={isPinned ? "assets/imgs/pinned.png" : "assets/imgs/unpinned.png"} /></button>
                        <button title="Change color" onClick={() => this.onToggleColorMenu(note.id)}><img src="assets/imgs/change-color.png" /></button>
                        {isColorMenuOn && <PickNoteColor noteId={note.id} onChangeBgc={this.onChangeBgc} />}
                    </section>
                    {isEditModalOn && <EditNoteModal note={note} onToggleEditModal={this.onToggleEditModal} onSaveEdit={this.onSaveEdit} />}
                </section>
            </section>

        )
    }

}