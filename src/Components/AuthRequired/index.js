import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

@withRouter
export default class AuthRequired extends Component {
  render() {
    const { location: { pathname } } = this.props;
    const token = localStorage.getItem('authToken');
    if (token === null && pathname !== '/login') return <Redirect to="/login" />;
    if (pathname === '/login') return <Redirect to="/" />;

    const { children } = this.props;
    return <div>{children}</div>;
  }
}
