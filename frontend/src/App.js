import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthPage from './pages/Auth'
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import NavBar from './components/navbar';

import 'bulma/css/bulma.min.css';
import './App.css';



function App() {
  return (
    <BrowserRouter>
      <>
        <NavBar />
        <main>
          <Switch>
            <Redirect from="/" to="/auth" exact />
            <Route path="/auth" component={AuthPage} />
            <Route path="/events" component={EventsPage} />
            <Route path="/booking" component={BookingsPage} />
          </Switch>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
