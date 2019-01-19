import React, { Component } from 'react';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import GenericListView from '../../Common/CRUD/GenericListView';
import QueryHOC from '../../HOC/QueryHOC';

const query = gql` query {
  balances {
    id amount item { id name recommendedStock } account { id name location { id code } }
  }
}`;

const styles = theme => ({
  root: {
    minWidth: '80%',
  },
});

@withStyles(styles)
@QueryHOC(query)
export default class SupplyList extends Component {
  render() {
    const {
      data, loading, error, refetch,
    } = this.props.queryResults;
    if (loading) return 'Loading data..';
    if (error) return `Foutmelding bij data ophaling: ${error.message}`;

    const headers = ['Naam', 'Minimum voorraad', 'Locatie(s)', 'Voorraad', 'Edit', 'Delete'];
    const columns = [({ item }) => item.name, ({ item }) => item.recommendedStock, ({ account }) => account.location.code, 'amount'];
    return (
      <div className={this.props.classes.root}>
        <GenericListView
          editIcon={true} deleteIcon={true}
          refetchFunc={refetch}
          basePath="/overviewsupply/"
          fabLabel="Product registreren"
          tblTitle="Voorraad"
          data={data && data.balances}
          headers={headers}
          columns={columns}
        />
      </div>
    );
  }
}
