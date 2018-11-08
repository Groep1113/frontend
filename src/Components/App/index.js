import React, { Component } from 'react';
import gql from 'graphql-tag';
import QueryHOC from '../HOC/QueryHOC';
import {
  Route, Switch, Redirect, withRouter
} from 'react-router-dom';
import HelloWorld from '../HelloWorld';
import Login from '../Login';
import Navbar from '../Navbar';
import Welcome from '../Welcome';

import './App.css';

const query = gql`{
  users {
    id firstName lastName role email
  }
}`;

@QueryHOC(query)
export default class App extends Component {
  render() {
    const { loading, error, data: {users} } = this.props.queryResults;
    if (loading) return "Loading graphql query..";
    if (error) return `GraphQL query resulted in error: ${error}`;
    return (
      <div>
          <Navbar />
          <h2>Alle users van de backend gehaald;</h2>
          <ul>{users.map(userToJSX)}</ul>
        <Switch>
          {/*<Route component={Login} /> /!* Index page (/) *!/*/}
          <Route component={Welcome} /> {/* Index page (/) */}
        </Switch>
      </div>
    );
  }
}

const userToJSX = (u, i) => <li key={u.id + i}>
  id: {u.id}, firstName: {u.firstName}, lastName: {u.lastName},
  email: {u.email}, role: {u.role}
</li>;
