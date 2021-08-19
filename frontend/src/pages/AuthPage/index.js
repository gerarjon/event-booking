import React, { Component, createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/auth-context'
import "./style.css"

class AuthPage extends Component {
  state = {
    isLogin: true
  }

  static contextType = AuthContext

  constructor(props) {
    super(props);
    this.emailEl = createRef();
    this.passwordEl = createRef()
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    }

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!) {
            createUser(userInput: {email: $email, password: $password}) {
              _id
              email
            }
          }
        `,
        variables: {
          email: email,
          password: password
        }
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
      if (resData.data.login.token) {
        this.context.login(
          resData.data.login.token, 
          resData.data.login.userId, 
          resData.data.login.tokenExpiration
        )
      }
    })
    .catch( err => {
      console.log(err)
    })
  };

  render() {
      return(
        <form className="auth-form" onSubmit={ this.submitHandler }>
          {/* Page Title */}
          <div className="title has-text-centered">
            { !this.state.isLogin ? "Sign Up" : "Log In"}
          </div>
    
          {/* Email Form */}
          <div className="field">
            <label className="label" htmlFor="email">Email</label>
            <p className="control has-icons-left">
              <input type="email" id="email" className="input" placeholder="Piyopiyo@example.com" ref={this.emailEl} />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faEnvelope}/>
              </span>
            </p>
          </div>
    
          {/* Password Form */}
          <div className="field">
            <label className="label" htmlFor="password">Password</label>
            <p className="control has-icons-left">
              <input type="password" id="password" className="input" placeholder="***********" ref={this.passwordEl} />
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
              { !this.state.isLogin ? 
              <span>Already have an account? <span className="switch-mode-link" onClick={this.switchModeHandler}>Log in.</span></span> :
              <span>Don't have an account? <span className="switch-mode-link" onClick={this.switchModeHandler}>Sign up.</span></span>
              }
            </p>
          </div>
        </form>
      ) 
  }

}

export default AuthPage;