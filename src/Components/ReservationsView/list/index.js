import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import QueryHOC from '../../HOC/QueryHOC';
import GenericListView from '../../Common/CRUD/GenericListView';

const query = gql`query {
  transactions ( showReservations: true ) {
    id createdDate updateDate deletedDate plannedDate receivedDate description transactionLines { id item { name } amount }
  }
}`;

const styles = theme => ({
});

@QueryHOC(query)
@withStyles(styles)
@withRouter
export default class ReservationsList extends Component {
  componentDidUpdate(prevProps, prevState) {
    // Refetch graphql query when we create or edit a user
    const oldPath = prevProps.location.pathname;
    if (
      (oldPath.includes('/reservations/create') || oldPath.includes('/reservations/edit/'))
      && this.props.location.pathname === '/reservations'
    ) {
      this.props.queryResults.refetch();
    }
  }

  render() {
    const {
      loading, data, error, refetch,
    } = this.props.queryResults;

    if (loading) return 'Loading data..';
    if (error) return `Foutmelding bij data ophaling: ${error.message}`;

    const headers = ['Id', 'Producten', 'description', 'Datum aangevraagd', 'Reserveringsdatum', 'Datum uitgeleverd', 'Edit', 'Uitvoeren', 'Delete'];
    const columns = [
      'id',
      ({ transactionLines }) => transactionLines.reduce((accum, { item }) => `${accum}, ${item.name}`, '').substring(2), // Item
      // ({ transactionLines }) => transactionLines
      // .reduce((accum, { amount }) => `${accum}, ${amount}`, '').substring(2), // Aantal
      'description',
      'createdDate',
      'plannedDate',
      'receivedDate',
    ];
    return (
      <GenericListView
        editIcon={true} executeIcon={true} deleteIcon={true}
        refetchFunc={refetch}
        basePath="/reservations/"
        fabLabel="Reservering toevoegen"
        tblTitle="Reserveringen"
        data={data && data.transactions}
        headers={headers}
        columns={columns}
      />
    );
  }
}
