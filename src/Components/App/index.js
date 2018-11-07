import React, { Component } from 'react';
import {
  Route, Switch, Redirect, withRouter
} from 'react-router-dom';
import HelloWorld from '../HelloWorld';
import Login from '../Login';
import Navbar from '../Navbar';
import Welcome from '../Welcome';

import './App.css';

export default class App extends Component {
  state = { hello: '' }

  render() {
    return (
      <div>
          <Navbar />
        <Switch>
          {/*<Route component={Login} /> /!* Index page (/) *!/*/}
          <Route component={Welcome} /> {/* Index page (/) */}
        </Switch>
      </div>
    );
  }
}
