

export function PickNoteColor({ noteId, onChangeBgc }) {

    const colors = ['#B5EAEA','#B983FF','#FF7878','#CDF2CA','#FCFFA6','#70AF85','#CC7351','#32AFA9' ]

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