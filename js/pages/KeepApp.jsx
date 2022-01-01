import { notesService } from '../apps/keep/services/note.service.js'
import { eventBusService } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'

import { DynamicNote } from '../apps/keep/cmps/DynamicNote.jsx'
import { NewNoteModal } from '../apps/keep/cmps/NewNoteModal.jsx'
import { NoteFilter } from '../apps/keep/cmps/NoteFilter.jsx'



export class KeepApp extends React.Component {

    state = {
        notes: [],
        pinnedNotes: [],
        isNewNoteModalOn: false,
        filterBy: {
            title: '',
            type: 'all'
        },
        exportedMail: null
    }


    componentDidMount() {
        this.loadNotes()
        this.searchParams()
        if(!this.state.exportedMail) this.props.history.push('/keepapp')
        this.removeEventBus = eventBusService.on('search', (txt) => this.debbouncedFunc({ txt }))
    }

    componentWillUnmount() {
        this.removeEventBus();
    }

    onSetTxtFilter = (title) => {
        const titleTxt = title
        this.setState((prevState) => ({filterBy: {...prevState.filterBy, title: titleTxt}}),this.loadNotes)
    }

    debbouncedFunc = utilService.debounce(this.onSetTxtFilter, 100)
    

    onSetTypeFilter = (type) => {
        const filterType = type
        this.setState((prevState) => ({filterBy: {...prevState.filterBy, type: filterType}}),this.loadNotes)
    }
    

    searchParams = () => {
        const query = new URLSearchParams(this.props.location.search)
        const title = query.get('title')
        const txt = query.get('txt')
        if (title || txt) {
            const exportedMail = {
                title,
                txt
            }
            this.setState({ exportedMail })
            this.setState({ isNewNoteModalOn: true })
        }
    }

    loadNotes = () => {
        const { filterBy } = this.state
        notesService.query(filterBy).then(notes => {
            this.setState({ notes })
        })

        notesService.getPinnedNotes().then(pinnedNotes => {
            this.setState({ pinnedNotes })
        })
    }

    toggleNewNoteModal = () => {
        this.setState({ isNewNoteModalOn: !this.state.isNewNoteModalOn })
    }

    render() {
        const { notes, pinnedNotes, isNewNoteModalOn, exportedMail } = this.state
        if (!notes) return <React.Fragment></React.Fragment>
        const notesTypes = ['all', 'txt', 'todos', 'img', 'video']
        return (
            <section className="keep-app">
                <NoteFilter notesTypes={notesTypes} onSetTypeFilter={this.onSetTypeFilter} />
                <button className="new-note-btn" onClick={this.toggleNewNoteModal}>Create New Note</button>
                {isNewNoteModalOn && <NewNoteModal loadNotes={this.loadNotes}
                    toggleNewNoteModal={this.toggleNewNoteModal} exportedMail={exportedMail} />}
                {(pinnedNotes && pinnedNotes.length > 0) &&
                    <section className="pinned-notes-container">
                        <h2>Pinned Notes</h2>
                        <section className="pinned-notes ">
                            {pinnedNotes.map(note => {
                                return <DynamicNote key={note.id} note={note} loadNotes={this.loadNotes} />
                            })}
                        </section>
                    </section>}
                <section className="notes-list">
                    {notes.map(note => {
                        return <DynamicNote key={note.id} note={note} loadNotes={this.loadNotes} />
                    })}
                </section>

            </section>
        )
    }
}