const { NavLink, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {
  render() {
    return (
      <header className="app-header">
        <div className="header-container">
          <h1 onClick={() => this.props.history.push('/')}>Books</h1>
          <nav className="app-nav">
            <NavLink activeClassName="my-active" exact to="/">
              Home
            </NavLink> |
            <NavLink activeClassName="my-active" to="/about">About</NavLink> |
            <NavLink activeClassName="my-active" to="/bookapp/book">Our books</NavLink>
          </nav>
        </div>
      </header>
    );
  }
}

export const AppHeader = withRouter(_AppHeader);
