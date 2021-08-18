import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import AuthContext from '../../context/auth-context'
import './style.css'

const Navbar = ({ isActive, isActiveHandle }) => (

  <AuthContext.Consumer>
    {context => { 
      return (
        <nav className="navbar is-danger" role="navigation" aria-label="main navigation">
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
                    <Link className="button is-primary" to="/auth">
                      Log in
                    </Link>
                  )}
                  {context.token && (
                    <Link className="button is-light" to="/auth">
                      Sign out
                    </Link>
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