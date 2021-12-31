

export function PickNoteColor({ noteId, onChangeBgc }) {

    const colors = ['yellow', 'green', 'blue', 'red', 'orange', 'purple']

    return (
        <section className="color-menu-container">
            <section className="color-menu">
                {colors.map(color => {
                    return <div key={color} className="color-input" style={{ backgroundColor: color }}
                        onClick={() => onChangeBgc(noteId, color)}></div>
                })}
            </section>
        </section>
    )

}