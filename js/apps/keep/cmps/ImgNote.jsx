import { utilService } from "../../../services/util.service.js"

export function ImgNote({ note }) {

    const title = utilService.capitalFirstLetter(note.info.title)
    return (
        <section className="img-note note">
            <h2>{title}</h2>
            <img src={note.info.url} />
        </section>
    )

}