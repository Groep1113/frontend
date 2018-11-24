import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

@withRouter
export default class AuthRequired extends Component {
  render() {
    const { location: { pathname } } = this.props;
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn && pathname !== '/login') return <Redirect to="/login" />;

    const { children } = this.props;
    return <div>{children}</div>;
  }
}
