import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import NameTextFields from '../../Common/FormComponents/NameTextFields';
import MutationHOC from '../../HOC/MutationHOC';
import GenericDialog from '../../Common/CRUD/GenericDialog';

const mutation = gql`mutation (
  $firstName: String!, $lastName: String!, $password: String!, $email: String!
) {
  createUser(
    firstName: $firstName, lastName: $lastName,
    password: $password, email: $email
  ) {
    id
  }
}`;

const styles = ({ spacing }) => ({
});

@MutationHOC(mutation)
@withStyles(styles)
@withRouter
export default class CreateUser extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  handleChange = this.handleChange.bind(this);

  handleChange({ target: { value } }, k) {
    this.setState({ [k]: value });
  }

  render() {
    const { mutateResults: { data, loading, error }, mutateFunc } = this.props;
    if (!loading && !error && data) return <Redirect to='/users' />;

    const { firstName, lastName } = this.state;
    return (
      <GenericDialog
        dialogTitle="Gebruiker toevoegen"
        cancelPath="/users"
        onConfirm={() => mutateFunc({ variables: this.state })}
        loading={loading} error={error} called={data}
      >
        <NameTextFields onChange={this.handleChange}
          initValues={{ firstName, lastName }} />
        <TextField id='email' name='email' label='E-mail adres' type='email'
          margin='normal' onChange={e => this.handleChange(e, 'email')} />
        <TextField id='password' name='password' label='Wachtwoord' type='password'
          margin='normal' onChange={e => this.handleChange(e, 'password')} />
      </GenericDialog>
    );
  }
}
