import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as utils from '../../../../utils/helpers';
import './style.scss';

export default class LoginForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func,
    title: PropTypes.string
  };

  state = {
    username: '',
    password: ''
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
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
    if(utils.getToken()) {
      return <Redirect to={'/' + utils.getUserName() + '/palates'} />;
    }
    const { username, password } = this.state;
    return (
      <form className={'login-signup-form'} onSubmit={this.handleSubmit}>
        <h1>{this.props.title}</h1>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={this.handleChange}
          value={username}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={this.handleChange}
          value={password}
        />
        <br />
        <button className={'nice-button'} type="submit">
          Submit
        </button>
      </form>
    );
  }
}
