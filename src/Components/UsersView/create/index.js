import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import NameTextFields from '../../Common/FormComponents/NameTextFields';
import MutationHOC from '../../HOC/MutationHOC';
import LoadingIndicator from '../../Common/FormComponents/LoadingIndicator';

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

  createUser = this.createUser.bind(this);

  handleChange = this.handleChange.bind(this);

  createUser() {
    this.props.mutateFunc({ variables: this.state });
  }

  handleChange({ target: { value } }, k) {
    this.setState({ [k]: value });
  }

  render() {
    const { mutateResults: { data, loading, error } } = this.props;
    if (!error && data) return <Redirect to='/users' />;
    const { firstName, lastName } = this.state;
    return (
      <Dialog
        className='dialogueWindow'
        open={true}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Nieuwe gebruiker:
        </DialogTitle>
        <DialogContent className='dialogueContent'>
          <NameTextFields onChange={this.handleChange}
            initValues={{ firstName, lastName }} />
          <TextField id='email' name='email' label='E-mail adres' type='email'
            margin='normal' onChange={e => this.handleChange(e, 'email')} />
          <TextField id='password' name='password' label='Wachtwoord' type='password'
            margin='normal' onChange={e => this.handleChange(e, 'password')} />
        </DialogContent>
        <DialogActions>
          <LoadingIndicator loading={loading} error={error} called={!loading && data} />
          <Button onClick={e => this.props.history.push('/users')} color="primary">
            Cancel
          </Button>
          <Button onClick={this.createUser} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
