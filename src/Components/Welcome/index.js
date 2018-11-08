import React, { Component } from 'react';
import gql from 'graphql-tag';
import QueryHOC from '../HOC/QueryHOC';
import './welcome.css';

const query = gql`{
  user(id:"1") {
    firstName lastName email role
  }
}`;

@QueryHOC(query)
export default class Navbar extends Component {
    render() {
        const { loading, error, data: {user} } = this.props.queryResults;
        if (loading) return "Loading graphql query..";
        if (error) return `GraphQL query resulted in error: ${error}`;
        return (
            <div className="welcome">
            <tr>
            <td>
            Voornaam:
    </td>
        <td>
        &nbsp;&nbsp;
    </td>
        <td>
        {user.firstName}
    </td>
        </tr>
        <tr><br/></tr>
        <tr>
        <td>
        Achternaam:
    </td>
        <td>
        &nbsp;&nbsp;
    </td>
        <td>
        {user.lastName}
    </td>
        </tr>
        <tr><br/></tr>
        <tr>
        <td>
        Email:
    </td>
        <td>
        &nbsp;&nbsp;
    </td>
        <td>
        {user.email}
    </td>
        </tr>
        <tr><br/></tr>
        <tr>
        <td>
        Rol:
    </td>
        <td>
        &nbsp;&nbsp;
    </td>
        <td>
        {user.role}
    </td>
        </tr>
        </div>
    );
    }
}