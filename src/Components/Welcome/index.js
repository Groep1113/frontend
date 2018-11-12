import React, { Component } from 'react';
import gql from 'graphql-tag';
import { withRouter, Redirect } from 'react-router-dom';
import QueryHOC from '../HOC/QueryHOC';
import './welcome.css';

const query = gql`{
  user(id: 1) {
    firstName lastName email roles { name }
  }
}`;

@QueryHOC(query)
@withRouter
export default class Welcome extends Component {
  logout = this.logout.bind(this);

  logout() {
    localStorage.clear();
    this.props.history.push("/login");
  }

  render() {
    const { loading, error, data } = this.props.queryResults;
    if (loading) return "Loading graphql query..";
    if (error) {
      console.error("" + error);
      localStorage.clear();
      return <Redirect to="/login" />;
    }

    const { user } = data;
    return (
      <div className="welcome">
        <table>
          <tbody>
            <tr>
              <td> Voornaam: </td>
              <td> {user.firstName} </td>
            </tr>
            <tr>
              <td> Achternaam: </td>
              <td> {user.lastName} </td>
            </tr>
            <tr>
              <td> Email: </td>
              <td> {user.email} </td>
            </tr>
            <tr>
              <td> Rollen: </td>
              <td><ul>{user.roles.map(userToJSX)}</ul></td>
            </tr>
            <tr>
              <td></td>
              <td className="lastcell"><input type="submit" className="logout" value="Logout" onClick={this.logout} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const userToJSX = (role, i) => <li key={role.id + i}>
    {role.name}
  </li>;
