import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AuthPage from './pages/AuthPage'
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import NavBar from './components/Navbar';
import Container from './components/Container';
import AuthContext from './context/auth-context';

import 'bulma/css/bulma.min.css';
import './App.css';


class App extends Component {
  state = {
    token: null,
    userId: null,
    isActive: false
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId })
  }

  logout = () => { 
    this.setState({ token: null, userId: null} );
  }
  
  isActiveHandle = () => {
    this.setState(prevState => {
      return { isActive: !prevState.isActive }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider 
            value={{
              token: this.state.token, 
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <NavBar 
              isActive={this.state.isActive}
              isActiveHandle={this.isActiveHandle}
            />
            <main>
              <Container>
                <Switch>
                  {/* If no token, redirect to auth */}
                  {!this.state.token && <Redirect from="/booking" to="/auth" exact />}
                  {this.state.token && <Redirect from="/auth" to="/events" exact />}
                  <Route path="/auth" component={AuthPage} />
                  <Route path="/events" component={EventsPage} />
                  {this.state.token && (
                    <Route path="/booking" component={BookingsPage} />
                  )}
                </Switch>
              </Container>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
