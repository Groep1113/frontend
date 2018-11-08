import React, { Component } from 'react';
import {
  Route, Switch, Redirect, withRouter
} from 'react-router-dom';
import HelloWorld from '../HelloWorld';
import Login from '../Login';
import Navbar from '../Navbar';
import Welcome from '../Welcome';
import AuthRequired from '../AuthRequired';

import './App.css';

export default class App extends Component {
    componentDidMount() {
        localStorage.clear();
    }

  render() {
      let header;
    return (
        <>
            <Navbar />
            <AuthRequired>
                <Switch>
                    <Route component={Welcome} />
                </Switch>
            </AuthRequired>
        </>
    );
  }
}
