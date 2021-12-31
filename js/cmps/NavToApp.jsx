const { Link } = ReactRouterDOM

export function NavToApp({ app }) {
    
  return (
    <section className={`nav-to-app ${app.name}`}>
      <img src={`assets/imgs/${app.name}.png`} />
      <h2>Appsus {app.name}</h2>
      <p>{app.details}</p>
      <Link to={`/${app.name}app`}>Try it</Link>
    </section>
  )
}
