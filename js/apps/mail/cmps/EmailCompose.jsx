export class EmailCompose extends React.Component {
  state = {
    email: {
      toUser: '',
      subject: '',
      body: '',
    },
  }

  inputRef = React.createRef()

  componentDidMount() {
    this.inputRef.current.focus()
  }

  handleChange = ({ target }) => {
    const field = target.name
    const value = target.value
    this.setState((prevState) => ({
      email: { ...prevState.email, [field]: value },
    }))
  }

  render() {
    const { toUser, subject, body } = this.state.email
    console.log('state compose ' , toUser, subject, body);
    return (
      <section className="email-compose">
        <form>
          <label htmlFor="to-user">To:</label>
          <input
            ref={this.inputRef}
            name="toUser"
            type="text"
            id="to-user"
            value={toUser}
            onChange={this.handleChange}
          />
          <label htmlFor="subject">Subject:</label>
          <input
            name="subject"
            type="text"
            id="subject"
            value={subject}
            onChange={this.handleChange}
          />
          <textarea
            name="body"
            rows="18"
            value={body}
            onChange={this.handleChange}
          />
        </form>
      </section>
    )
  }
}
