import React, { Component } from 'react';
import {
  Route, Switch, Redirect, withRouter
} from 'react-router-dom';
import HelloWorld from '../HelloWorld';

import './App.css';

export default class App extends Component {
  state = { hello: '' }

  render() {
    return (
      <div>
        <Switch>
          <Route component={HelloWorld} /> {/* Index page (/) */}
        </Switch>
      </div>
    );
  }
}
