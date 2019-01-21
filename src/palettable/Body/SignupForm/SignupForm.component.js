import React, { Component } from 'react';

export default class SignUpForm extends Component {
  state = {
    username: '',
    password: ''
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.signUp(this.state);
    this.clearState();
  };

  clearState = () => {
    this.setState({
      username: '',
      password: ''
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <h1>signup</h1>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={this.handleChange}
          value={this.state.password}
        />
        <br />
        <button className="nice-button" type="submit">
          Submit
        </button>
      </form>
    );
  }
}
