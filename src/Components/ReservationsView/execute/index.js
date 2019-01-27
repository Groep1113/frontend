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
    if (!loading && !error && data) return <Redirect to='/reservations' />;

    return (
      <GenericDialog
        dialogTitle="Reservering uitvoeren"
        cancelPath="/reservations"
        onConfirm={() => mutateFunc({ variables: { transactionId: parseInt(id, 10) } })}
        loading={loading} error={error} called={data}
      >
        <div>
          Wilt u de reservering met id: {id} uitvoeren?
        </div>
      </GenericDialog>
    );
  }
}
