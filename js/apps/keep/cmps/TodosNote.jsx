import { notesService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"

export function TodosNote({ note, onToggleTodo }) {

    const title = utilService.capitalFirstLetter(note.info.title)
    return (
        <section className="todos-note note" >
            <h2>{title}</h2>
            <ul>
                {note.info.todos.map(todo => (
                    <div className="todo" key={todo.id}>
                        <li className={todo.doneAt ? 'read' : ''} >{todo.txt.charAt(0).toUpperCase() + todo.txt.slice(1)}</li>
                        <button onClick={() => onToggleTodo(note.id, todo.id)}>x</button>
                    </div>
                ))}
            </ul>
        </section>
    )
}