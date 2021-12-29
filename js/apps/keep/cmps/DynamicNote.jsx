import { TxtNote } from "./TxtNote.jsx"
import { ImgNote } from "./ImgNote.jsx"
import { TodosNote } from "./TodosNote.jsx"


export class DynamicNote extends React.Component {
    
    state = {
        note: null
    }

    componentDidMount(){
        this.loadNote()
    }

    loadNote = () => {
        const {note} = this.props
        this.setState({note})
    }

    
    
    
    render(){
        const {note} = this.state
        if(!note) return <React.Fragment></React.Fragment>
        return(
            <section className="dynamic-note" style={{backgroundColor: note.style.backgroundColor}}>
                {note.type === 'note-txt' && <TxtNote note={note}/>}
                {note.type === 'note-img' && <ImgNote note={note}/>}
                {note.type === 'note-todos' && <TodosNote note={note}/>}
                <section className="note-btns">
                <button>delete</button>
                <button>duplicate</button>
                <button>send as mail</button>
                <button>bgc</button>
                <button>pin</button>
                </section>
            </section>
        )
    }

}