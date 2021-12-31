import { notesService } from '../apps/keep/services/note.service.js'
import { eventBusService } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'

import { DynamicNote } from '../apps/keep/cmps/DynamicNote.jsx'
import { NewNoteModal } from '../apps/keep/cmps/NewNoteModal.jsx'
import { NoteFilter } from '../apps/keep/cmps/NoteFilter.jsx'



export class KeepApp extends React.Component {

    state = {
        notes: [],
        isNewNoteModalOn: false,
        filterBy: {
            // title: '',
            type: 'all'
        }
    }


    componentDidMount() {
        this.loadNotes()
        // this.removeEventBus = eventBusService.on('search', (txt) => this.debbouncedFunc({ txt }))
    }

    // componentWillUnmount() {
    //     this.removeEventBus();
    // }

    onSetTxtFilter = (titleTxt) => {
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, title: titleTxt } }), this.loadNotes)
    }

    onSetTypeFilter(type) {
        console.log(type)
        // this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, type } }), this.loadNotes)
    }

    // debbouncedFunc = utilService.debounce(this.onSetTxtFilter, 100)

    loadNotes = () => {
        const { filterBy } = this.state
        notesService.query(filterBy).then(notes => {
            this.setState({ notes })
        })
    }

    toggleNewNoteModal = () => {
        this.setState({ isNewNoteModalOn: !this.state.isNewNoteModalOn })
    }

    render() {
        const { notes, isNewNoteModalOn } = this.state
        if(!notes) return <React.Fragment></React.Fragment>
        const notesTypes = ['all', 'txt', 'todos', 'img', 'video']
        return (
            <section className="keep-app">
                 {/* <section className="filter-by">
                    <h2>Filter notes by type:</h2>
                    {notesTypes.map(type => {
                        return <button title={type} key={type} onClick={() => this.onSetTypeFilter(type)} ><img src={`assets/imgs/filter-by-${type}.png`} /></button>
                    })}
                </section> */}
                <NoteFilter notesTypes={notesTypes} onSetTypeFilter={this.onSetTypeFilter}/>
                <button className="new-note-btn" onClick={this.toggleNewNoteModal}>Create New Note</button>
                {isNewNoteModalOn && <NewNoteModal toggleNewNoteModal={this.toggleNewNoteModal}
                    loadNotes={this.loadNotes} toggleNewNoteModal={this.toggleNewNoteModal} />}
                <section className="notes-list">
                    {notes.map(note => {
                        return <DynamicNote key={note.id} note={note} loadNotes={this.loadNotes} />
                    })}
                </section>
            </section>
        )
    }
}