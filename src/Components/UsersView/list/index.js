import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import QueryHOC from '../../HOC/QueryHOC';
import GenericListView from '../../Common/CRUD/GenericListView';

const query = gql` {
  users { id, firstName, lastName, email }
}`;

const styles = theme => ({
});

@QueryHOC(query)
@withStyles(styles)
@withRouter
export default class UsersList extends Component {
  componentDidUpdate(prevProps, prevState) {
    // Refetch graphql query when we create or edit a user
    const oldPath = prevProps.location.pathname;
    if (
      (oldPath.includes('/users/create') || oldPath.includes('/users/edit/'))
      && this.props.location.pathname === '/users'
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

    const headers = ['Id', 'Voornaam', 'Achternaam', 'E-Mail Adres', 'Edit'];
    const columns = ['id', 'firstName', 'lastName', 'email'];
    return (
      <GenericListView
        editIcon={true} deleteIcon={false}
        refetchFunc={refetch}
        basePath="/users/"
        fabLabel="Gebruiker toevoegen"
        tblTitle="Gebruikers"
        data={data && data.users}
        headers={headers}
        columns={columns}
      />
    );
  }
}
