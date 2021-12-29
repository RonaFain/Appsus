const { NavLink, Link, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {
  state = {
    isShowMenu: false,
  }

  onToggleAppsMenu = () => {
    this.setState({ isShowMenu: !this.state.isShowMenu })
  }

  render() {
    const { isShowMenu } = this.state

    return (
      <header className="app-header">
        <Link to="/" className="logo">
          <h1>Appsus</h1>
        </Link>
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
