import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import QueryHOC from '../../HOC/QueryHOC';
import GenericListView from '../../Common/CRUD/GenericListView';

const query = gql`query {
  transactions ( showOrders: true ) {
    id createdDate updateDate deletedDate plannedDate receivedDate description transactionLines { id item { name } }
  }
}`;

const styles = theme => ({
});

@QueryHOC(query)
@withStyles(styles)
@withRouter
export default class OrdersList extends Component {
  componentDidUpdate(prevProps, prevState) {
    // Refetch graphql query when we create or edit a user
    const oldPath = prevProps.location.pathname;
    if (
      (oldPath.includes('/orders/create') || oldPath.includes('/orders/edit/'))
      && this.props.location.pathname === '/orders'
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

    const headers = ['Id', 'Item', 'description', 'Datum aangevraagd', 'Orderdatum', 'Datum aangepast', 'Datum order ontvangen', 'Edit', 'Delete'];
    const columns = ['id', ({ transactionLines }) => transactionLines.reduce((accum, { item }) => `${accum}, ${item.name}`, '').substring(2), 'description', 'createdDate', 'plannedDate', 'updateDate', 'receivedDate'];
    return (
      <GenericListView
        editIcon={true} deleteIcon={true}
        refetchFunc={refetch}
        basePath="/orders/"
        fabLabel="Order toevoegen"
        tblTitle="Orders"
        data={data && data.transactions}
        headers={headers}
        columns={columns}
      />
    );
  }
}
