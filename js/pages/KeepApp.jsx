import { notesService } from '../apps/keep/services/note.service.js'
import { DynamicNote } from '../apps/keep/cmps/DynamicNote.jsx'
import { NewNoteModal } from '../apps/keep/cmps/NewNoteModal.jsx'



export class KeepApp extends React.Component {

    state = {
        notes: [],
        isNewNoteModalOn: false
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        console.log('check')
        notesService.query().then(notes => {
            this.setState({ notes })
        })
    }

    toggleNewNoteModal = () => {
        this.setState({ isNewNoteModalOn: !this.state.isNewNoteModalOn })
    }

    render() {
        const { notes, isNewNoteModalOn } = this.state
        return (
            <section className="keep-app">
                <button onClick={this.toggleNewNoteModal}>create new note</button>
                {isNewNoteModalOn && <NewNoteModal toggleNewNoteModal={this.toggleNewNoteModal}
                 loadNotes={this.loadNotes} toggleNewNoteModal={this.toggleNewNoteModal}/>}
                <section className="notes-list">
                    {notes.map(note => (
                        <DynamicNote key={note.id} note={note} />
                    ))}
                </section>
            </section>
        )
    }
}