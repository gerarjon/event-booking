import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import './style.css'

const Navbar = ({isActive, isActiveHandle}) => (

  <AuthContext.Consumer>
    {context => { 
      return (
        <nav className="navbar is-danger is-fixed-top" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              Event Booking
            </Link>
    
            {/* navbar burger */}
            <div role="button" data-target="navMenu" className={`navbar-burger ${isActive ? 'is-active' : ""}`} aria-label="menu" aria-expanded="false" onClick={isActiveHandle}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
          </div>
    
    
    
          <div className={`navbar-menu ${isActive ? 'is-active' : ""}`} id="navMenu" >
            {/* Navbar start */}
            <div className="navbar-start">
              <NavLink className="navbar-item" to="/" exact>
                Home
              </NavLink>
              <NavLink className="navbar-item" to="/events">
                Events
              </NavLink>
              {context.token && (
                <NavLink className="navbar-item" to="/booking">
                  Booking
                </NavLink>
              )}
            </div>
    
            {/* Navbar End */}
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  {!context.token && (
                    <Link className="button " to="/auth">
                      Log in
                    </Link>
                  )}
                  {context.token && (
                    <button className="button is-light" onClick={context.logout}>
                      Sign out
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      )
    }}
  </AuthContext.Consumer>
);

export default Navbar;