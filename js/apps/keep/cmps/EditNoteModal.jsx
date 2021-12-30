

export class EditNoteModal extends React.Component {

    state = {
        note: null
    }

    componentDidMount() {
        const { note } = this.props
        this.setState({ note })
    }

    formatTodosToTxt = (todos) => {
        let todosTxt = todos.map(todo => todo.txt)
        todosTxt = todosTxt.toString()
        return todosTxt
    }

    formatTodos = (value) => {
        const todosArr = value.split(',')
        return todosArr
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        if(field ==='todos') value = this.formatTodos(value)
        this.setState((prevState) => ({ note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } } }))
    }


    render() {
        const { note } = this.state
        if(!note) return <React.Fragment></React.Fragment>
        const { info } = note
        const todos = note.type === 'note-todos'? this.formatTodosToTxt(info.todos): ''
        const { onToggleEditModal } = this.props
        return (
            <section className="edit-modal-container">
                <section className="edit-modal">
                    <form onSubmit={() => this.props.onSaveEdit(event,note)}>
                        <label htmlFor="title">Edit Note Title </label>
                        <input type="text" id="title" name='title' value={info.title}
                            onChange={this.handleChange} />

                        {note.type === 'note-txt' &&
                            <React.Fragment>
                                <textarea name="txt" id="txt" cols="30" rows="10"
                                    value={info.txt} onChange={this.handleChange}></textarea>
                            </React.Fragment>}

                        {note.type === 'note-img' &&
                            <React.Fragment>
                                <label htmlFor="url">Edit Your Image URL </label>
                                <img src={info.url}/>
                                <input type="text" id="url" name='url' value={info.url} onChange={this.handleChange} />
                            </React.Fragment>}

                        {note.type === 'note-todos' &&
                            <React.Fragment>
                                <label htmlFor="todos">Edit Todos </label>
                                <input type="text" id="todos" name='todos' value={todos}
                                     onChange={this.handleChange} />
                            </React.Fragment>}

                            <button>Save</button>
                    </form>
                    <button className="close-modal-btn" onClick={() => onToggleEditModal()}>x</button>
                </section>
            </section>
        )
    }
}