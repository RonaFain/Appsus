

export class NewTxtNote extends React.Component {

    state = {
        note: {
            type: this.props.type,
            isPinned: false,
            info: {
                title: '',
                txt: ''
            },
            style: {
                backgroundColor: 'yellow'
            }
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ note: { ...prevState.note, info: { ...prevState.note.info, [field]: value }}}))
    }

    render() {
        const {note} = this.state
        const { title, txt } = this.state.note.info
        const {onSaveNote} = this.props
        return (
            <section className="new-txt-note-info">
                <form className="new-txtnote-form" onSubmit={() => onSaveNote(event,note)}>
                    <label htmlFor="title">Enter Note Title </label>
                    <input type="text" id="title" name='title' value={title}
                        placeholder="Enter title here" onChange={this.handleChange} />

                    <textarea name="txt" id="txt" cols="30" rows="10"
                        value={txt} onChange={this.handleChange}></textarea>
                    <button>Save Note</button>
                </form>
            </section>

        )
    }
}