import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import NameTextFields from '../../Common/FormComponents/NameTextFields';
import MutationHOC from '../../HOC/MutationHOC';
import QueryHOC from '../../HOC/QueryHOC';
import UserRolesUpdater from './UserRolesUpdater';
import GenericDialog from '../../Common/CRUD/GenericDialog';

const mutation = gql`mutation (
  $id: Int!, $firstName: String, $lastName: String, $password: String, $email: String
) {
  updateUser(
    id: $id, firstName: $firstName, lastName: $lastName, password: $password, email: $email
  ) { id }
}`;

// notice: query contains a parameter ($id: Int!)
// so we will use this.props.queryResults.refetch function to supply it a value
const query = gql`query ($id: Int!) {
  user(id: $id) {
    firstName, lastName, email, token,
    roles { id, name }
  }
}`;

@QueryHOC(query)
@MutationHOC(mutation)
@withRouter
export default class EditUser extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  updateUser = this.updateUser.bind(this);

  handleChange = this.handleChange.bind(this);

  // we call refetch to supply our QueryHOC with the required param
  componentWillMount() {
    const { match: { params: { id } } } = this.props;
    this.props.queryResults.refetch({ id: parseInt(id, 10) });
  }

  // when we receive new data from the refetch func, update the state values
  componentDidUpdate(prevProps, prevState) {
    if (!this.props.queryResults.data) return;
    if (this.props.queryResults.data !== prevProps.queryResults.data) {
      const { firstName, lastName, email } = this.props.queryResults.data.user;
      this.setState({ firstName, lastName, email });
    }
  }

  updateUser() {
    const { match: { params: { id } } } = this.props;
    this.props.mutateFunc({
      variables: { ...this.state, id: parseInt(id, 10) },
    });
  }

  handleChange({ target: { value } }, k) {
    this.setState({ [k]: value });
  }

  render() {
    const {
      mutateResults: { loading, error, data }, queryResults, mutateFunc,
    } = this.props;
    if (!loading && !error && data) return <Redirect to='/users' />; // finished editing

    const id = parseInt(this.props.match.params.id, 10);
    const variables = { ...this.state, id };
    const { firstName, lastName, email } = this.state;
    return (
      <GenericDialog
        dialogTitle="Gebruiker bewerken"
        cancelPath="/users"
        onConfirm={() => mutateFunc({ variables })}
        {...queryResults} called={this.props.queryResults.data}
      >
        <ShowError mutateError={error} queryError={queryResults.error} />
        <NameTextFields initValues={{ firstName, lastName }} onChange={this.handleChange} />
        <EmailField value={email} onChange={e => this.handleChange(e, 'email')} />
        <PasswordField onChange={e => this.handleChange(e, 'password')} />
        <UserRolesUpdater
          current={queryResults.data.user ? queryResults.data.user.roles : null}
          refetchUser={queryResults.refetch}
          userId={id} />
      </GenericDialog>
    );
  }
}

const ShowError = ({ mutateError, queryError }) => (
  <Typography variant="body1">
    {mutateError ? `Error updating: ${mutateError.message}` : ''}
    {queryError ? `Error fetching: ${queryError.message}` : ''}
  </Typography>
);

const EmailField = ({ value, onChange }) => (
  <TextField
    value={value}
    id='email'
    name='email'
    label='E-mail adres'
    type='email'
    margin='normal'
    onChange={onChange} />
);

const PasswordField = ({ onChange }) => (
  <TextField
    id='password'
    name='password'
    label='Wachtwoord'
    type='password'
    margin='normal'
    onChange={onChange} />
);
