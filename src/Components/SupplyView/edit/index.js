import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MutationHOC from '../../HOC/MutationHOC';
import QueryHOC from '../../HOC/QueryHOC';
import GenericDialog from '../../Common/CRUD/GenericDialog';

// notice: query contains a parameter ($id: Int!)
// so we will use this.props.queryResults.refetch function to supply it a value
const query = gql`query($id: Int!) {
  balance (id: $id) {
    id amount item { id name } account { id name }
  }
}`;

const mutation = gql`mutation($amount: Int!, $description: String, $balanceId: Int!) {
    updateBalance (
      amount: $amount,
      description: $description,
      balanceId: $balanceId) {
        id amount item { id name } account { id name }
    }
  }`;

const styles = ({ spacing }) => ({
});

@QueryHOC(query)
@MutationHOC(mutation)
@withStyles(styles)
export default class SupplyEdit extends Component {
  state = {
    amount: '',
    description: '',
    balanceId: '',
  };

  // we call refetch to supply our QueryHOC with the required param
  componentWillMount() {
    const { match: { params: { id } } } = this.props;
    this.props.queryResults.refetch({ id: parseInt(id, 10) });
  }

  // when we receive new data from the refetch func, update the state values
  componentDidUpdate(prevProps, prevState) {
    if (!this.props.queryResults.data) return;
    if (this.props.queryResults.data !== prevProps.queryResults.data) {
      const {
        amount, description,
      } = this.props.queryResults.data.balance;
      this.setState({
        amount, description,
      });
    }
  }

  render() {
    const { mutateResults: { loading, error, data }, mutateFunc } = this.props;
    if (!loading && !error && data) return <Redirect to='/overviewsupply' />;

    const variables = { ...this.state, balanceId: parseInt(this.props.match.params.id, 10) };
    return (
      <GenericDialog
        dialogTitle="Voorraad bewerken"
        cancelPath="/overviewsupply"
        onConfirm={() => mutateFunc({ variables })}
        {...this.props.queryResults} called={this.props.queryResults.data}
      >
        <TextField
          id='amount' name='amount' label='Nieuw aantal' type='amount' margin='normal'
          value={this.state.amount}
          onChange={e => this.setState({ amount: e.target.value })} />
        <TextField
          id='description' name='description' label="Beschrijving" type='description' margin='normal'
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })} />
      </GenericDialog>
    );
  }
}
