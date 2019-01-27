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
const query = gql`query ($id: Int!) {
  transaction(id: $id) { plannedDate, description }
}`;

const mutation = gql`mutation($plannedDate: LocalDate, $description: String, $id: Int!) {
  updateTransaction (
    plannedDate: $plannedDate,
    description: $description,
    transactionId: $id)
  {
    id
  }
}`;

const styles = ({ spacing }) => ({
});

@QueryHOC(query)
@MutationHOC(mutation)
@withStyles(styles)
export default class OrdersEdit extends Component {
  state = {
    plannedDate: '', description: '',
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
        plannedDate, description,
      } = this.props.queryResults.data.transaction;
      this.setState({
        plannedDate, description,
      });
    }
  }

  render() {
    const { mutateResults: { loading, error, data }, mutateFunc } = this.props;
    if (!loading && !error && data) return <Redirect to='/orders' />;

    const variables = { ...this.state, id: parseInt(this.props.match.params.id, 10) };
    return (
      <GenericDialog
        dialogTitle="Order bewerken"
        cancelPath="/orders"
        onConfirm={() => mutateFunc({ variables })}
        {...this.props.queryResults} called={this.props.queryResults.data}
      >
        <TextField
          id='description' name='description' label='Beschrijving' type='description' margin='normal'
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })} />
        <TextField
          id='plannedDate' name='plannedDate' label="Orderdatum" type='date' margin='normal'
          value={this.state.plannedDate}
          onChange={e => this.setState({ plannedDate: e.target.value })} />
      </GenericDialog>
    );
  }
}
