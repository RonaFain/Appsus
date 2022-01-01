import { utilService } from "../../../services/util.service.js"

export function VideoNote({note}){
    
    const title = utilService.capitalFirstLetter(note.info.title)
    return (
        <section className="video-note note">
            <h2>{title}</h2>
            <iframe width="250px" heigth="200" src={note.info.url}>
            </iframe>
        </section>
    )
}