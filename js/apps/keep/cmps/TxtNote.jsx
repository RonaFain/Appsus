import { utilService } from "../../../services/util.service.js"

export function TxtNote({ note }) {

    const title = utilService.capitalFirstLetter(note.info.title)
    const txt = utilService.capitalFirstLetter(note.info.txt)
    return (
        <section className="txt-note note" >
            <h2>{title}</h2>
            <p>{txt}</p>
        </section>
    )
}