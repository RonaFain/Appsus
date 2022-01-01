import { NewTxtNote } from "./NewTxtNote.jsx"
import { NewImgNote } from "./NewImgNote.jsx"
import { NewTodosNote } from "./NewTodosNote.jsx"
import { NewVideoNote } from "./NewVideoNote.jsx"

import { notesService } from "../services/note.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"

export class NewNoteModal extends React.Component {

    state = {
        newNoteType: 'note-txt'

    }

    onSetNoteType = ({ target }) => {
        const value = target.value
        this.setState({ newNoteType: value })
    }

    onSaveNote = (ev, note) => {
        ev.preventDefault()
        notesService.saveNote(note).then(
            this.props.loadNotes(),
            this.props.toggleNewNoteModal(),
            eventBusService.emit('user-msg', {txt:'Note Added', type: 'success'})
        )

    }


    render() {
        const {exportedMail} = this.props
        const { newNoteType } = this.state
        return (
            <section className="new-note-modal-container">
                <section className="new-note-modal">
                    <h2>Add Your Note</h2>
                    <section className="type-choosing">
                        <select name="type" value={newNoteType} onChange={this.onSetNoteType}>
                            <option value="note-txt">Text Note</option>
                            <option value="note-img">Image Note</option>
                            <option value="note-video">Video Note</option>
                            <option value="note-todos">Todos Note</option>
                        </select>
                    </section>
                    <section className="modal-by-type">
                        {newNoteType === 'note-txt' && <NewTxtNote type={newNoteType} onSaveNote={this.onSaveNote} exportedMail={exportedMail}/>}
                        {newNoteType === 'note-video' && <NewVideoNote type={newNoteType} onSaveNote={this.onSaveNote} />}
                        {newNoteType === 'note-img' && <NewImgNote type={newNoteType} onSaveNote={this.onSaveNote} />}
                        {newNoteType === 'note-todos' && <NewTodosNote type={newNoteType} onSaveNote={this.onSaveNote} />}
                    </section>
                    <button className="close-modal-btn" onClick={this.props.toggleNewNoteModal}>x</button>
                </section>
            </section>
        )
    }
}