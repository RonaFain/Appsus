import { notesService } from "../services/note.service.js"

export function TodosNote({ note, onToggleTodo }) {

    return (
        <section className="todos-note note" >
            <h2>{note.info.title}</h2>
            <ul>
                {note.info.todos.map(todo => (
                    <div className="todo" key={todo.id}>
                        <li className={todo.doneAt ? 'read' : ''} >{todo.txt}</li>
                        <button onClick={() => onToggleTodo(note.id, todo.id)}>x</button>
                    </div>
                ))}
            </ul>
        </section>
    )
}