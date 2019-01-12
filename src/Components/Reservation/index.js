import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import QueryHOC from '../HOC/QueryHOC';
import Table from '../Table';
import AddReservation from './AddReservation';

const query = gql`{
  transactions(showReservations: true) {
    id createdDate updateDate deletedDate receivedDate transactionRules { plannedDate item { name } }
  }
  items { id name }
}`;

const columnFormatting = [({ transactionRules }) => transactionRules.reduce((accum, { item }) => `${accum}, ${item.name}`, '').substring(2), 'createdDate', ({ transactionRules }) => transactionRules.reduce((accum, { plannedDate }) => `${accum}, ${plannedDate}`, '').substring(2), 'updateDate', 'receivedDate'];
const firstRowTable = ['Product', 'Datum aangevraagd', 'Reserveringsdatum', 'Datum aangepast', 'Datum uitgeleverd'];

@QueryHOC(query)
@withRouter
export default class Reservation extends Component {
  render() {
    const { loading, error, data } = this.props.queryResults;
    if (loading) return 'Gegevens worden geladen..';
    if (error) {
      return <div>Er ging iets fout.<br />{error.message}</div>;
    }

    return (
      <div className='reservation'>
        <AddReservation items = {data.items} />
        <Table data = {data.transactions} headers = {firstRowTable} columns = {columnFormatting} version={'reservation'}/>
      </div>
    );
  }
}
