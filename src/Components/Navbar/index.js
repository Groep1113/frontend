import React, { Component } from 'react';
import './navbar.css';
import gql from 'graphql-tag';
import QueryHOC from '../HOC/QueryHOC';
import { Route } from 'react-router-dom';

const query = gql`{
  user(id:1) {
    firstName lastName email roles { name   }
  }
}`;

@QueryHOC(query)
export default class Navbar extends Component {
    render() {
        const { loading, error, data} = this.props.queryResults;
        if (loading) return "Loading graphql query..";
        if (error) return `GraphQL query resulted in error: ${error}`;
        const { user } = data;
        return (
            <div className="navbar">
                <b>
                    Welkom, <Route path='/' exact render={ () => <span> { user.firstName } </span>} />
                </b>
            </div>
        );
    }
}