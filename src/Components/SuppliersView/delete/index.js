import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import MutationHOC from '../../HOC/MutationHOC';
import GenericDialog from '../../Common/CRUD/GenericDialog';

const mutation = gql`mutation ($id: Int!) {
  deleteSupplier(id: $id) { id }
}`;

const styles = ({ spacing }) => ({
});

@MutationHOC(mutation)
@withStyles(styles)
@withRouter
export default class SupplierDelete extends Component {
  render() {
    const { id } = this.props.match.params;
    const { mutateResults: { loading, error, data }, mutateFunc } = this.props;
    if (!loading && !error && data) return <Redirect to='/suppliers' />;

    return (
      <GenericDialog
        dialogTitle="Leverancier verwijderen"
        cancelPath="/suppliers"
        onConfirm={() => mutateFunc({ variables: { id: parseInt(id, 10) } })}
        loading={loading} error={error} called={data}
      >
        <div>
          Wilt u de leverancier met id: {id} verwijderen?
        </div>
      </GenericDialog>
    );
  }
}
