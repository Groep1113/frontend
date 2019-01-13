import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import QueryHOC from '../../HOC/QueryHOC';
import GenericListView from '../../Common/CRUD/GenericListView';

const query = gql`query { 
  categories { 
    id name locations { id code } 
  }
}`;

const styles = theme => ({
});

@QueryHOC(query)
@withStyles(styles)
@withRouter
export default class CategoriesView extends Component {
  componentDidUpdate(prevProps, prevState) {
    // Refetch graphql query when we create or edit a user
    const oldPath = prevProps.location.pathname;
    if (
      (oldPath.includes('/categories2/create') || oldPath.includes('/categories/edit/'))
      && this.props.location.pathname === '/categories'
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

    const headers = ['Id', 'Naam', 'Locatie(s)', 'Edit', 'Delete'];
    const columns = ['id', 'name', ({ locations }) => locations.reduce((accum, { code }) => `${accum}, ${code}`, '').substring(2)];
    return (
      <GenericListView
        editIcon={true} deleteIcon={true}
        refetchFunc={refetch}
        basePath="/categories/"
        fabLabel="Categorie toevoegen"
        tblTitle="Categorieën"
        data={data && data.categories}
        headers={headers}
        columns={columns}
      />
    );
  }
}
