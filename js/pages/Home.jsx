import { NavToApp } from '../cmps/NavToApp.jsx'

export class Home extends React.Component {
  state = {
    apps: {
      book: {
        name: 'book',
        details: `You'll find bestsellers, up-and-coming authors, and more all in Appsus book`,
      },
      keep: {
        name: 'keep',
        details: `Capture what's on your mind. Add notes, lists and photos to Appsus Keep`,
      },
      mail: {
        name: 'mail',
        details: `Appsus mail is email that's intuitive, efficient, and useful`,
      },
    },
  }

  render() {
    const { book, keep, mail } = this.state.apps

    return (
      <section className="home">
        <div className="hero"><img src="assets/imgs/desk.jpg"/></div>
        <div className="nav-apps">
          <NavToApp className="first-child" app={book} />
          <NavToApp app={keep} />
          <NavToApp app={mail} />
        </div>
        <div className="team-details">
          <div className="profile first-profile">
            <div className="profile-img"><img src="assets/imgs/profile2.PNG" /></div>
            <div className="profile-content">
              <h2>Sahar Gar Onne</h2>
              <span>jdjshdjskdhsajhdsajdhjshdjskhdsa</span>
              </div>
          </div>
          <div className="profile second-profile">
            <div className="profile-content">
              <h2>Rona Fainshtein</h2>
              <span>djljspjoaskopsposkpoaskopaskoaks</span>
            </div>
            <div className="profile-img"><img src="assets/imgs/profile2.PNG" /></div>
          </div>
        </div>
      </section>
    )
  }
}
