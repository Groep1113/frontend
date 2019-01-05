import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import './admin.css';
import QueryHOC from '../HOC/QueryHOC';
import Table from '../Table';
import AddLocation from './AddLocation';

const query = gql`{
  locations { id, code }
}`;

const firstRowTable = ['Locatie'];

@QueryHOC(query)
@withRouter
export default class Admin extends Component {
  render() {
    const { loading, error, data } = this.props.queryResults;
    if (loading) return 'Gegevens worden geladen..';
    if (error) {
      return <div>Er ging iets fout.<br />{error.message}</div>;
    }
    const { locations } = data;
    return (
      <div className='location'>
        <AddLocation />
        <Table data = {locations} headers = {firstRowTable} columns = {['code']}/>
      </div>
    );
  }
}
