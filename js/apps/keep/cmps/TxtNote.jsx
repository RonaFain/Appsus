

export function TxtNote ({note}){
  
        return(
            <section className="txt-note note" >
                <h2>{note.info.title}</h2>
                <p>{note.info.txt}</p>
            </section>
        )
}