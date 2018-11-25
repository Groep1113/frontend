import React, { Component } from 'react';
import './navbar.css';
import gql from 'graphql-tag';
import { Route, Switch } from 'react-router-dom';
import QueryHOC from '../HOC/QueryHOC';

const query = gql`{
  users {
    firstName
  }
}`;

@QueryHOC(query)
class UserMessage extends Component {
  render() {
    const { loading, error, data } = this.props.queryResults;
    if (loading) return 'Gegevens worden geladen..';
    if (error) return '';
    const user = data.users[0];
    return (
      <div>
        Welkom, {user.firstName}
      </div>
    );
  }
}

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <Switch>
          <Route path="/login" render={() => 'Login'} />
          <Route path="/" component={UserMessage} />
        </Switch>
      </div>
    );
  }
}
