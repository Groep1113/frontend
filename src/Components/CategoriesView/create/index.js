import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MutationHOC from '../../HOC/MutationHOC';
import GenericDialog from '../../Common/CRUD/GenericDialog';

const mutation = gql`mutation($name: String!) {
    createCategory (
      name: $name,
    ) { id }
  }`;

const styles = ({ spacing }) => ({
});

@MutationHOC(mutation)
@withStyles(styles)
export default class CategoriesCreate extends Component {
  state = { name: '' };

  render() {
    const { mutateResults: { loading, error, data }, mutateFunc } = this.props;
    if (!loading && !error && data) return <Redirect to='/categories' />;

    return (
      <GenericDialog
        dialogTitle="Categorie toevoegen"
        cancelPath="/categories"
        onConfirm={() => mutateFunc({ variables: this.state })}
        loading={loading} error={error} called={data}
      >
        <TextField
          id='name' name='name' label='Naam' type='name' margin='normal'
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })} />
      </GenericDialog>
    );
  }
}
