import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import MutationHOC from '../../HOC/MutationHOC';
import GenericDialog from '../../Common/CRUD/GenericDialog';

const mutation = gql`mutation($transactionId: Int!) {
    executeTransaction (
      transactionId: $transactionId
    ) { receivedDate }
}`;

const styles = ({ spacing }) => ({
});

@MutationHOC(mutation)
@withStyles(styles)
@withRouter
export default class ReservationExecute extends Component {
  render() {
    const { id } = this.props.match.params;
    const { mutateResults: { loading, error, data }, mutateFunc } = this.props;
    if (!loading && !error && data) return <Redirect to='/orders' />;

    return (
      <GenericDialog
        dialogTitle="Order ontvangen"
        cancelPath="/orders"
        onConfirm={() => mutateFunc({ variables: { transactionId: parseInt(id, 10) } })}
        loading={loading} error={error} called={data}
      >
        <div>
          Wilt u de order met id: {id} ontvangen?
        </div>
      </GenericDialog>
    );
  }
}
