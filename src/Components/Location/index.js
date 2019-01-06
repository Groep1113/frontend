import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import QueryHOC from '../HOC/QueryHOC';
import Table from '../Table';
import AddLocation from './AddLocation';

const query = gql`{
  locations { id, code, depth, height, width }
}`;

const columnFormatting = ['code', 'depth', 'height', 'width'];
const firstRowTable = ['Code', 'Diepte (in cm\'s)', 'Hoogte (in cm\'s)', 'Breedte (in cm\'s)'];

@QueryHOC(query)
@withRouter
export default class Location extends Component {
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
        <Table data = {locations} headers = {firstRowTable} columns = {columnFormatting} deleteVersion={'location'}/>
      </div>
    );
  }
}
