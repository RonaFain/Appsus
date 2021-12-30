

export class NewTodosNote extends React.Component {

    state = {
        note: {
            type: this.props.type,
            isPinned: false,
            info: {
                label: '',
                todos: ''
            },
            style: {
                backgroundColor: 'green'
            }
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        if(field ==='todos') value = this.formatTodos(value)
        this.setState((prevState) => ({ note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } } }))
    }

    formatTodos = (value) => {
        const todosArr = value.split(',')
        return todosArr
    }

    render() {
        const { note } = this.state
        const { label, todos } = this.state.note.info
        const { onSaveNote } = this.props
        return (
            <section className="new-todos-note-info">
                <form className="new-todosnote-form" onSubmit={() => onSaveNote(event, note)}>
                    <label htmlFor="label">Enter Note Label </label>
                    <input type="text" id="label" name='label' value={label}
                        placeholder="Enter title here" onChange={this.handleChange} />
                    
                    <label htmlFor="todos">Enter Todos </label>
                    <input type="text" id="todos" name='todos' value={todos}
                        placeholder="Enter comma separated todos" onChange={this.handleChange} />
                    <button>Save Note</button>
                </form>
            </section>
        )
    }
}