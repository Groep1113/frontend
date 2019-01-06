import React, { Component } from 'react';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import GenericListView from '../../Common/CRUD/GenericListView';
import QueryHOC from '../../HOC/QueryHOC';

const query = gql` {
  suppliers {
    id, name
  }
}`;

const styles = theme => ({
  root: {
    minWidth: '80%',
  },
});

@withStyles(styles)
@QueryHOC(query)
export default class SupplierList extends Component {
  render() {
    const {
      data, loading, error, refetch,
    } = this.props.queryResults;
    if (loading) return 'Loading data..';
    if (error) return `Foutmelding bij data ophaling: ${error.message}`;

    const headers = ['Id', 'Naam', 'Edit', 'Delete'];
    const columns = ['id', 'name'];
    return (
      <div className={this.props.classes.root}>
        <GenericListView
          editIcon={true} deleteIcon={true}
          refetchFunc={refetch}
          basePath="/suppliers/"
          fabLabel="Leverancier toevoegen"
          tblTitle="Leveranciers"
          data={data && data.suppliers}
          headers={headers}
          columns={columns}
        />
      </div>
    );
  }
}
