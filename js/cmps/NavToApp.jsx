const { Link } = ReactRouterDOM

export function NavToApp({ app }) {
    
  return (
    <section className="nav-to-app">
      <img src={`assets/imgs/${app.name}.png`} />
      <h2>{app.name}</h2>
      <p>{app.details}</p>
      <Link to={`/${app.name}app`}>Try it</Link>
    </section>
  )
}
