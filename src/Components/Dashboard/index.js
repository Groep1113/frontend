import React, { Component } from 'react';

import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper/Paper';
import GenericListView from '../Common/CRUD/GenericListView';
import QueryHOC from '../HOC/QueryHOC';

const graphQlQuery = gql`query {
  suggestions {
    id
    reason
    amount
    item {
      id
      name
    }
  }
}`;

const styles = theme => ({
});

@QueryHOC(graphQlQuery)
export default class Dashboard extends Component {
  componentDidUpdate(prevProps, prevState) {
    // Refetch graphql query when we create or edit a user
    const oldPath = prevProps.location.pathname;
    if (
      (oldPath.includes('/dashboard'))
      && this.props.location.pathname === '/'
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

    const headers = ['Item', 'Aantal', 'Reden'];
    const columns = [({ item }) => item.name, 'amount', 'reason'];

    return (
      <Paper className='paper' elevation={1}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          Welkom op het dashboard. <br />
          Hier zal mogelijk een kort overzicht van de algemene stand van zaken weergegeven worden.
        </div>
        <GenericListView
          executeIcon={false} deleteIcon={false} addIcon={false}
          refetchFunc={refetch}
          basePath="/suggestions/"
          tblTitle="Suggesties"
          data={data && data.suggestions}
          headers={headers}
          columns={columns}
        />
      </Paper>
    );
  }
}
