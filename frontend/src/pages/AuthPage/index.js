import React, { useRef, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/auth-context'
import "./style.css"

function AuthPage() {
  const emailEl = useRef();
  const passwordEl = useRef();
  const [isLogIn, setIsLogIn] = useState(true);

  const context = useContext(AuthContext);

  const switchModeHandler = () => {
    setIsLogIn(!isLogIn);
  };

  const submitHandler = event => {
    event.preventDefault();
    const email = emailEl.current.value;
    const password = passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    }

    if (!isLogIn) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    }

    fetch('http://localhost:3001/api', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed');
      }
      return res.json();
    })
    .then(resData => {
      if(resData.data.login.token) {
        context.login(
          resData.data.login.token, 
          resData.data.login.userId, 
          resData.data.login.tokenExpiration
        )
      }
    })
    .catch( err => {
      console.log(err)
    })
  }

  return(
    <form className="auth-form" onSubmit={ submitHandler }>
      {/* Page Title */}
      <div className="title has-text-centered">
        { !isLogIn ? "Sign Up" : "Log In"}
      </div>

      {/* Email Form */}
      <div className="field">
        <label className="label" htmlFor="email">Email</label>
        <p className="control has-icons-left">
          <input type="email" id="email" className="input" placeholder="Piyopiyo@example.com" ref={emailEl} />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faEnvelope}/>
          </span>
        </p>
      </div>

      {/* Password Form */}
      <div className="field">
        <label className="label" htmlFor="password">Password</label>
        <p className="control has-icons-left">
          <input type="password" id="password" className="input" placeholder="***********" ref={passwordEl} />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faLock}/>
          </span>
        </p>
      </div>

      {/* Buttons */}
      <div className="field is-grouped">
        <p className="control">
          <button type="submit" className="button is-primary">
            Submit
          </button>
        </p>
        <p className="control switch-mode-text">
          { !isLogIn ? 
          <span>Already have an account? <span className="switch-mode-link" onClick={switchModeHandler}>Log in.</span></span> :
          <span>Don't have an account? <span className="switch-mode-link" onClick={switchModeHandler}>Sign up.</span></span>
          }
        </p>
      </div>
    </form>
  ) 
}

export default AuthPage;