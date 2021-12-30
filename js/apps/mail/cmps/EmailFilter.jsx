
export class EmailFilter extends React.Component {
    state = {
        filterBy: {
            isRead: 'false',
            isStared: 'false'
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value}}), () => {
            this.props.onSetCriteria(this.state.filterBy)
        })
    }

    render() {
        return (
        <section className="email-filter">
            <select name="isRead" onChange={this.handleChange}>
                <option value="">Read / Unread</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
            </select>
            <select name="isStared" onChange={this.handleChange}>
                <option value="">Starred / Unstarred</option>
                <option value="true">Starred</option>
                <option value="false">Unstarred</option>
            </select>
        </section>)
    }
}