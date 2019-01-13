import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import QueryHOC from '../../HOC/QueryHOC';
import GenericListView from '../../Common/CRUD/GenericListView';

const query = gql`query{
  items { id name code locations {code} recommendedStock categories { name } }
}`;

const styles = theme => ({
});

@QueryHOC(query)
@withStyles(styles)
@withRouter
export default class ItemsView extends Component {
  componentDidUpdate(prevProps, prevState) {
    // Refetch graphql query when we create or edit a user
    const oldPath = prevProps.location.pathname;
    if (
      (oldPath.includes('/items/create') || oldPath.includes('/items/edit/'))
      && this.props.location.pathname === '/items'
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

    const headers = ['Id', 'Product', 'Code', 'Minimum voorraad', 'Locatie', 'Categorie', 'Edit', 'Delete'];
    const columns = ['id', 'name', 'code', 'recommendedStock', ({ locations }) => locations.reduce((accum, { code }) => `${accum}, ${code}`, '').substring(2), ({ categories }) => categories.reduce((accum, { name }) => `${accum}, ${name}`, '').substring(2)];
    return (
      <GenericListView
        editIcon={true} deleteIcon={true}
        refetchFunc={refetch}
        basePath="/items/"
        fabLabel="Item toevoegen"
        tblTitle="Items"
        data={data && data.items}
        headers={headers}
        columns={columns}
      />
    );
  }
}
