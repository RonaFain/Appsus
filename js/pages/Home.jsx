import { NavToApp } from '../cmps/NavToApp.jsx'

export class Home extends React.Component {
  state = {
    apps: {
      book: {
        name: 'book',
        details: 'bbbbbbbb',
      },
      keep: {
        name: 'keep',
        details: 'kkkkkkkkk',
      },
      mail: {
        name: 'mail',
        details: 'mmmmmmmm',
      },
    },
  }

  render() {
    const { book, keep, mail } = this.state.apps

    return (
      <section className="home">
        <div className="hero">hello</div>
        <div className="nav-apps">
          <NavToApp className="first-child" app={book} />
          <NavToApp app={keep} />
          <NavToApp app={mail} />
        </div>
      </section>
    )
  }
}
