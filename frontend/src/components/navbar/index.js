import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import './style.css'

const Navbar = props => {
  const [isActive, setIsActive] = useState(false);

  return(
    <nav className="navbar is-danger" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          Event Booking
        </Link>

        {/* navbar burger */}
        <div role="button" data-target="navMenu" className={`navbar-burger ${isActive ? 'is-active' : ""}`} aria-label="menu" aria-expanded="false" onClick={()=>{setIsActive(!isActive)}}>
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
          <NavLink className="navbar-item" to="/booking">
            Booking
          </NavLink>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link className="button is-primary" to="/auth">
                Log in
              </Link>
              <Link className="button is-light" to="/auth">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;