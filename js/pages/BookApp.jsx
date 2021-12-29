// export function Book() {
//     return(
//         <section>
//             Book App
//         </section>
//     )
// }

import { BookApp } from '../apps/book/pages/BookApp.jsx';
import { BookDetails } from '../apps/book/pages/BookDetails.jsx';

import { AppHeader } from '../apps/book/cmps/AppHeader.jsx';
import { UserMsg } from '../apps/book/cmps/UserMsg.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function Book() {
  return (
    <Router>
      <section className="app">
        {/* <AppHeader /> */}
        <main>
          <Switch>
            <Route component={BookDetails} path="/bookapp/book/:bookId" />
            <Route component={BookApp} path="/bookapp/book" />
          </Switch>
        </main>
      </section>
      <UserMsg />
    </Router>
  );
}