import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import QueryHOC from '../../HOC/QueryHOC';
import GenericListView from '../../Common/CRUD/GenericListView';

const query = gql`query{
  locations { id, code, depth, height, width, categories { name } }
}`;

const styles = theme => ({
});

@QueryHOC(query)
@withStyles(styles)
@withRouter
export default class LocationsList extends Component {
  componentDidUpdate(prevProps, prevState) {
    // Refetch graphql query when we create or edit a user
    const oldPath = prevProps.location.pathname;
    if (
      (oldPath.includes('/locations/create') || oldPath.includes('/locations/edit/'))
      && this.props.location.pathname === '/locations'
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

    const headers = ['Id', 'Code', 'Diepte (in cm\'s)', 'Hoogte (in cm\'s)', 'Breedte (in cm\'s)', 'Categorie(ën)', 'Edit', 'Delete'];
    const columns = ['id', 'code', 'depth', 'height', 'width', ({ categories }) => categories.reduce((accum, { name }) => `${accum}, ${name}`, '').substring(2)];
    return (
      <GenericListView
        editIcon={true} executeIcon={false} deleteIcon={true}
        refetchFunc={refetch}
        basePath="/locations/"
        fabLabel="Locatie toevoegen"
        tblTitle="Locaties"
        data={data && data.locations}
        headers={headers}
        columns={columns}
      />
    );
  }
}
