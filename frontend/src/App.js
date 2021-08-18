import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthPage from './pages/AuthPage'
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import NavBar from './components/navbar';
import Container from './components/Container';

import 'bulma/css/bulma.min.css';
import './App.css';



function App() {
  return (
    <BrowserRouter>
      <>
        <NavBar />
        <main>
          <Container>
            <Switch>
              <Redirect from="/" to="/auth" exact />
              <Route path="/auth" component={AuthPage} />
              <Route path="/events" component={EventsPage} />
              <Route path="/booking" component={BookingsPage} />
            </Switch>
          </Container>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
