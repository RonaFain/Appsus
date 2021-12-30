import { notesService } from "../services/note.service.js"

export function TodosNote ({note,onToggleTodo}){

        return(
            <section className="todos-note note" >
                <h1>{note.info.label}</h1>
                <ul>
                    {note.info.todos.map(todo => (
                        console.log(todo),
                        <li className={todo.doneAt ? 'read' : ''} key={todo.id}>{todo.txt} <button onClick={() => onToggleTodo(note.id,todo.id)}>x</button></li>
                    ))}
                </ul>
            </section>
        )
}