import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Login from '../Login';

@withRouter
export default class AuthRequired extends Component {
    render() {
      const { location: {pathname} } = this.props;
      const loggedIn = localStorage.getItem("loggedIn");
      console.log("Checking if the user is logged in:", loggedIn?true:false);
      if (!loggedIn && pathname != "/login") return <Redirect to="/login" />;

      const { children } = this.props;
      return <div>{children}</div>;
    }
}
