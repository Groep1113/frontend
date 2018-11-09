import React, { Component } from 'react';
import './navbar.css';
import gql from 'graphql-tag';
import QueryHOC from '../HOC/QueryHOC';
import { Route, Switch } from 'react-router-dom';

const query = gql`{
  user(id:1) {
    firstName lastName email roles { name   }
  }
}`;

@QueryHOC(query)
class UserMessage extends Component {
  render() {
    const { loading, error, data} = this.props.queryResults;
    if (loading) return "Gegevens worden geladen..";
    if (error) return "";
    const { user } = data;
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
            <Route path="/login" render={() => "Login"} />
            <Route path="/" component={UserMessage} />
          </Switch>
        </div>
      );
    }
}
