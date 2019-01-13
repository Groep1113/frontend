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
  category(id: $id) { name }
}`;

const mutation = gql`mutation($categoryId: Int!, $name: String!) {
  updateCategory (categoryId: $categoryId, name: $name) { id }
}`;

const styles = ({ spacing }) => ({
});

@QueryHOC(query)
@MutationHOC(mutation)
@withStyles(styles)
export default class CategoriesEdit extends Component {
  state = { name: '' };

  // we call refetch to supply our QueryHOC with the required param
  componentWillMount() {
    const { match: { params: { id } } } = this.props;
    this.props.queryResults.refetch({ id: parseInt(id, 10) });
  }

  // when we receive new data from the refetch func, update the state values
  componentDidUpdate(prevProps, prevState) {
    if (!this.props.queryResults.data) return;
    if (this.props.queryResults.data !== prevProps.queryResults.data) {
      const { name } = this.props.queryResults.data.category;
      this.setState({ name });
    }
  }

  render() {
    const { mutateResults: { loading, error, data }, mutateFunc } = this.props;
    if (!loading && !error && data) return <Redirect to='/categories' />;

    const variables = { ...this.state, categoryId: parseInt(this.props.match.params.id, 10) };
    return (
      <GenericDialog
        dialogTitle="Categorie bewerken"
        cancelPath="/categories"
        onConfirm={() => mutateFunc({ variables })}
        {...this.props.queryResults} called={this.props.queryResults.data}
      >
        <TextField
          id='name' name='name' label='Naam' type='name' margin='normal'
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })} />
      </GenericDialog>
    );
  }
}
