

export function TxtNote ({note}){

        
        return(
            <section className="txt-note note" >
                <h1>{note.info.title}</h1>
                <p>{note.info.txt}</p>
            </section>
        )
}