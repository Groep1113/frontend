import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import QueryHOC from '../../HOC/QueryHOC';
import GenericListView from '../../Common/CRUD/GenericListView';

const query = gql`query {
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

@QueryHOC(query)
@withStyles(styles)
@withRouter
export default class SuggestionsList extends Component {
  componentDidUpdate(prevProps, prevState) {
    // Refetch graphql query when we create or edit a user
    const oldPath = prevProps.location.pathname;
    if (
      (oldPath.includes('/suggestions/apply'))
      && this.props.location.pathname === '/suggestions'
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

    const headers = ['Id', 'Item', 'Aantal', 'Reden', 'Toepassen', 'Verwijderen'];
    const columns = ['id', ({ item }) => item.name, 'amount', 'reason'];
    return (
      <GenericListView
        executeIcon={true} deleteIcon={true} addIcon={false}
        refetchFunc={refetch}
        basePath="/suggestions/"
        tblTitle="Suggesties"
        data={data && data.suggestions}
        headers={headers}
        columns={columns}
      />
    );
  }
}
