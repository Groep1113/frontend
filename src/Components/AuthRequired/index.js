import React, { Component } from 'react';
import Login from '../Login';

export default class AuthRequired extends Component {
    render() {
        const loggedIn = localStorage.getItem("loggedIn");
        console.log("Checking if the user is logged in:", loggedIn);
        if (!loggedIn) return <Login />;

        const { children } = this.props;
        return <div>{children}</div>;
    }
}