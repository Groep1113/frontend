import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import './productregistration.css';
import QueryHOC from '../HOC/QueryHOC';
import Table from '../Table';
import FormProduct from './FormProduct';

const query = gql`{
  items {
    name code locations {code} recommendedStock
  }
  locations { id, code }
}`;

const columnFormatting = ['name', 'code', ({ locations }) => locations.reduce((accum, { code }) => `${accum}, ${code}`, '').substring(2), 'recommendedStock'];
const firstRowTable = ['Product', 'Type', 'Locatie', 'Aanbevolen voorraad'];

@QueryHOC(query)
@withRouter
export default class ProductRegistration extends Component {
  render() {
    const { loading, error, data } = this.props.queryResults;
    if (loading) return 'Gegevens worden geladen..';
    if (error) {
      return <div>Er ging iets fout.<br />{error.message}</div>;
    }
    return (
      <div className='register'>
        <FormProduct locations = {data.locations} />
        <Table data = {data.items} headers = {firstRowTable} columns = {columnFormatting}/>
      </div>
    );
  }
}
