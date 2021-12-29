

export function TodosNote ({note}){

        return(
            <section className="todos-note note" >
                <h1>{note.info.label}</h1>
                <ul>
                    {note.info.todos.map(todo => (
                        <li key={todo.id}>{todo.txt}</li>
                    ))}
                </ul>
            </section>
        )
}