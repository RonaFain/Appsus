import { Home } from './js/pages/Home.jsx'

import { BookApp } from './js/pages/BookApp.jsx'
import { BookDetails } from './js/apps/book/pages/BookDetails.jsx'
import { KeepApp } from './js/pages/KeepApp.jsx'
import { MailApp } from './js/pages/MailApp.jsx'

import { AppHeader } from './js/cmps/AppHeader.jsx'
import { AppFooter } from './js/cmps/AppFooter.jsx'
import { UserMsg } from './js/cmps/UserMsg.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <main>
          <Switch>
            <Route component={KeepApp} path="/keepapp" />
            <Route component={MailApp} path="/mailapp/:emailId" />
            <Route component={MailApp} path="/mailapp" />
            <Route component={BookDetails} path="/bookapp/:bookId" />
            <Route component={BookApp} path="/bookapp" />
            <Route component={Home} path="/" />
          </Switch>
        </main>
        <AppFooter />
      </section>
      <UserMsg />
    </Router>
  )
}
