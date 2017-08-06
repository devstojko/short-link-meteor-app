import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class Singup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    const email = this.email.value.trim();
    const password = this.password.value.trim();


    if (password.length < 9) {
      return this.setState({ error: 'Password must be more than 8 characters long!' });
    }

    // createUser({email: let email, password: let password })
    return Accounts.createUser({ email, password }, error => (error ?
      this.setState({ error: error.reason })
      :
      this.setState({ error: '' })));
  }

  focus() {
    this.email.focus();
    this.password.focus();
  }

  render() {
    return (
      <div className="boxed-view" >
        <div className="boxed-view__box">
          <h1>Singup component</h1>

          {this.state.error && <p>{this.state.error}</p>}

          <form className="boxed-view__form" onSubmit={this.onSubmit} noValidate>
            <input
              ref={(el) => { this.email = el; }}
              type="email"
              name="email"
              placeholder="Email"
              className="input"
            />
            <input
              ref={(el) => { this.password = el; }}
              type="password"
              name="password"
              placeholder="Password"
              className="input"
            />
            <button className="button button--primary" >Create Account</button>
          </form>
        </div>
      </div>
    );
  }
}
