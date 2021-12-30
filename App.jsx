import { Home } from './js/pages/Home.jsx';
import { About } from './js/pages/About.jsx';
// import { Book } from './js/apps/book/Book.jsx';
import { BookApp } from './js/pages/BookApp.jsx';
import { KeepApp } from './js/pages/KeepApp.jsx';
import { MailApp } from './js/pages/MailApp.jsx';

import { AppHeader } from './js/cmps/AppHeader.jsx';
import { AppFooter } from './js/cmps/AppFooter.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

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
            <Route component={BookApp} path="/bookapp" />
            <Route component={About} path="/about" />
            <Route component={Home} path="/" />
          </Switch>
        </main>
        <AppFooter />
      </section>
    </Router>
  );
}
