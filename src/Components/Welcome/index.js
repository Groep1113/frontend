import React, { Component } from 'react';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import QueryHOC from '../HOC/QueryHOC';
import './welcome.css';

const query = gql`{
  user(id: 1) {
    firstName lastName email roles { name }
  }
}`;

@QueryHOC(query)
@withRouter
export default class Navbar extends Component {
  logout = this.logout.bind(this);

  logout() {
    localStorage.clear();
    this.props.history.push("/login");
  }

  render() {
    const { loading, error, data} = this.props.queryResults;
    if (loading) return "Loading graphql query..";
    if (error) return `GraphQL query resulted in ${error}`;
    const { user } = data;

    console.log("BasicAuth = ", atob(localStorage.getItem("BasicAuth")), localStorage.getItem("BasicAuth"));
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
              <td> Rol: </td>
              <td><ul>{user.roles.map(userToJSX)}</ul></td>
            </tr>
          </tbody>
        </table>
          <input type="submit" className="logout" value="Logout" onClick={this.logout} />
      </div>
    );
  }
}

const userToJSX = (role, i) => <li key={role.id + i}>
    {role.name}
  </li>;
