import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import "./style.css"

function AuthPage() {
  return(
    <div className="auth-form">
      <div className="title has-text-centered">Log in</div>
      {/* Email Form */}
      <div className="field">
        <label className="label" htmlFor="email">Email</label>
        <p className="control has-icons-left">
          <input type="email" id="email" className="input" placeholder="Piyopiyo@example.com" />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faEnvelope}/>
          </span>
        </p>
      </div>
      {/* Password Form */}
      <div className="field">
        <label className="label" htmlFor="password">Password</label>
        <p className="control has-icons-left">
          <input type="password" id="password" className="input" placeholder="***********" />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faLock}/>
          </span>
        </p>
      </div>
      {/* Buttons */}
      <div className="field is-grouped">
        <p className="control">
          <button className="button">
            Log in
          </button>
        </p>
        <p className="control">
          <button className="button">
            Sign up
          </button>
        </p>
      </div>
    </div>
  ) 
}

export default AuthPage;