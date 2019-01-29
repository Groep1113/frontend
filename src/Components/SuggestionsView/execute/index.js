import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import MutationHOC from '../../HOC/MutationHOC';
import GenericDialog from '../../Common/CRUD/GenericDialog';

const mutation = gql`mutation($suggestionId: Int!) {
    executeSuggestion (
      suggestionId: $suggestionId
    )
}`;

const styles = ({ spacing }) => ({
});

@MutationHOC(mutation)
@withStyles(styles)
@withRouter
export default class SuggestionExecute extends Component {
  render() {
    const { id } = this.props.match.params;
    const { mutateResults: { loading, error, data }, mutateFunc } = this.props;
    if (!loading && !error && data) return <Redirect to='/suggestions' />;

    return (
      <GenericDialog
        dialogTitle="Suggestie uitvoeren"
        cancelPath="/suggestions"
        onConfirm={() => mutateFunc({ variables: { suggestionId: parseInt(id, 10) } })}
        loading={loading} error={error} called={data}
      >
        <div>
          Wilt u suggestie {id} uitvoeren, en een order aanmaken?
        </div>
      </GenericDialog>
    );
  }
}
