import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import QueryHOC from '../HOC/QueryHOC';
import Table from '../Table';

const query = gql`{
  transactions {
    createdDate updateDate deletedDate receivedDate transactionRules { item { name } }
  }
}`;

const columnFormatting = [({ transactionRules }) => transactionRules.reduce((accum, { item }) => `${accum}, ${item.name}`, '').substring(2), 'createdDate', 'updateDate', 'receivedDate'];
const firstRowTable = ['Product', 'Datum aangevraagd', 'Datum aangepast', 'Datum ontvangen'];

@QueryHOC(query)
@withRouter
export default class Reservation extends Component {
  render() {
    const { loading, error, data } = this.props.queryResults;
    if (loading) return 'Gegevens worden geladen..';
    if (error) {
      return <div>Er ging iets fout.<br />{error.message}</div>;
    }

    const { transactions } = data;
    return (
      <div className='reservation'>
        <Table data = {transactions} headers = {firstRowTable} columns = {columnFormatting} version={'reservation'}/>
      </div>
    );
  }
}
