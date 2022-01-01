import { eventBusService } from '../services/event-bus.service.js'

const { NavLink, Link, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {
  state = {
    isShowMenu: false,
    filterText: '',
    nameApp: ''
  }

  componentDidMount() {
    this.getNameApp()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.getNameApp()
    }
  }

  getNameApp = () => {
    const path = this.props.location.pathname
    const removeAfterIdx = path.indexOf('app')
    this.setState({ nameApp: path.substring(1, removeAfterIdx) })
  }

  onToggleAppsMenu = () => {
    this.setState({ isShowMenu: !this.state.isShowMenu })
  }

  handleChange = ({ target }) => {
    const value = target.value
    this.setState({ filterText: value })
    eventBusService.emit('search', value)
  }

  render() {
    const { isShowMenu, filterText, nameApp } = this.state

    return (
      <header className="app-header">
        <Link to="/" className="logo">
          <h1>Appsus</h1>
        </Link>
        {(nameApp === 'book' || nameApp === '/') ? '' :
          <div className="search-container">
            <input
              type="text"
              name="search"
              value={filterText}
              placeholder= {`Search ${nameApp}`}
              onChange={this.handleChange}
              autoComplete="off"
            />
          </div>
        }
        <button>
          <img
            className="btn-apps"
            src="assets/imgs/svgs/apps-menu.svg"
            onClick={this.onToggleAppsMenu}
          />
        </button>
        {isShowMenu && (
          <nav className="main-nav">
            <NavLink to="/bookapp" onClick={this.onToggleAppsMenu}>
              <div className="link-container">
                <img src="assets/imgs/book.png" />
                <span>Book</span>
              </div>
            </NavLink>
            <NavLink to="/keepapp" onClick={this.onToggleAppsMenu}>
              <div className="link-container">
                <img src="assets/imgs/keep.png" />
                <span>Keep</span>
              </div>
            </NavLink>
            <NavLink to="/mailapp" onClick={this.onToggleAppsMenu}>
              <div className="link-container">
                <img src="assets/imgs/mail.png" />
                <span>Mail</span>
              </div>
            </NavLink>
          </nav>
        )}
      </header>
    )
  }
}

export const AppHeader = withRouter(_AppHeader)
