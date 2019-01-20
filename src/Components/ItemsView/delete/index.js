import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import MutationHOC from '../../HOC/MutationHOC';
import GenericDialog from '../../Common/CRUD/GenericDialog';

const mutation = gql`mutation($itemId: Int!) {
  deleteItem(itemId: $itemId) { id }
}`;

const styles = ({ spacing }) => ({
});

@MutationHOC(mutation)
@withStyles(styles)
@withRouter
export default class ItemDelete extends Component {
  render() {
    const { id } = this.props.match.params;
    const { mutateResults: { loading, error, data }, mutateFunc } = this.props;
    if (!loading && !error && data) return <Redirect to='/items' />;

    console.log(id);
    return (
      <GenericDialog
        dialogTitle="Item verwijderen"
        cancelPath="/items"
        onConfirm={() => mutateFunc({ variables: { itemId: parseInt(id, 10) } })}
        loading={loading} error={error} called={data}
      >
        <div>
          Wilt u het item met id: {id} verwijderen?
        </div>
      </GenericDialog>
    );
  }
}
