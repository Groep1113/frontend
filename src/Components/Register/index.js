/* eslint-disable guard-for-in,prefer-const */
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import './register.css';
import Table from '../Table';
import QueryHOC from '../HOC/QueryHOC';

const query = gql`{
  items {
    name code locations {code} recommended_stock 
  }
}`;

const columnFormatting = ['name', 'code', ({ locations }) => formattingLocations(locations[0]), 'recommended_stock'];
const firstRowTable = ['Product', 'Type', 'Locatie', 'Aanbevolen voorraad'];

@QueryHOC(query)
@withRouter
export default class Register extends Component {
  render() {
    const { loading, error, data } = this.props.queryResults;
    if (loading) return 'Loading graphql query..';
    if (error) {
      return 'Something went wrong';
    }
    return (
      <div className = "register">
        <div className='header'>
          <h3>
            Huidige producten:
          </h3>
        </div>
        <Table data = {data.items} headers = {firstRowTable} columns = {columnFormatting}/>
      </div>
    );
  }
}

function formattingLocations(locations) {
  return locations.code;
}
