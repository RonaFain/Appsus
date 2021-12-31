

export function NoteFilter({ notesTypes, onSetTypeFilter }) {

    return (
        <section className="filter-by">
            <h2>Filter notes by type:</h2>
            <div className="filter-btns">
                {notesTypes.map(type => {
                    return <button title={type} key={type} onClick={() => onSetTypeFilter(type)} ><img src={`assets/imgs/filter-by-${type}.png`} /></button>
                })}
            </div>
        </section>
    )
}