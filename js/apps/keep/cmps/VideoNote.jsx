

export function VideoNote({note}){

    return (
        <section className="video-note note">
            <h2>{note.info.title}</h2>
            <iframe width="100%" heigth="200" src={note.info.url} allowFullScreen/>
        </section>
    )
}