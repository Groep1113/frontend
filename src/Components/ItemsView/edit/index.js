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
  item(id: $id) { code, name, recommendedStock }
}`;

const mutation = gql`mutation($itemId: Int!, $code: String, $name: String, $recommendedStock: Int) {
  updateItem (
    itemId: $itemId,
    code: $code,
    name: $name,
    recommendedStock: $recommendedStock,
  ) { id }
}`;

const styles = ({ spacing }) => ({
});

@QueryHOC(query)
@MutationHOC(mutation)
@withStyles(styles)
export default class LocationsEdit extends Component {
  state = {
    code: '', name: '', recommendedStock: '',
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
        code, name, recommendedStock,
      } = this.props.queryResults.data.item;
      this.setState({
        code, name, recommendedStock,
      });
    }
  }

  render() {
    const { mutateResults: { loading, error, data }, mutateFunc } = this.props;
    if (!loading && !error && data) return <Redirect to='/items' />;

    const variables = { ...this.state, itemId: parseInt(this.props.match.params.id, 10) };
    return (
      <GenericDialog
        dialogTitle="Item bewerken"
        cancelPath="/items"
        onConfirm={() => mutateFunc({ variables })}
        {...this.props.queryResults} called={this.props.queryResults.data}
      >
        <TextField
          id='name' name='name' label="Naam" type='name' margin='normal'
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })} />
        <TextField
          id='code' name='code' label='Code' type='code' margin='normal'
          value={this.state.code}
          onChange={e => this.setState({ code: e.target.value })} />
        <TextField
          id='recommendedStock' name='recommendedStock' label="Minimum voorraad" type='recommendedStock' margin='normal'
          value={this.state.recommendedStock}
          onChange={e => this.setState({ recommendedStock: e.target.value })} />
      </GenericDialog>
    );
  }
}