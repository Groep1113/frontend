import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthRequired from '../AuthRequired';
import Login from '../Login';
import Navbar from '../Navbar';
import Welcome from '../Welcome';
import Register from '../Register';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <AuthRequired>
          <Switch>
            <Route path="/login" component={ Login } />
            <Route component={ Register } />
            <Route component={ Welcome } />
          </Switch>
        </AuthRequired>
      </>
    );
  }
}
