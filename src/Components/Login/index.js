import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MutationHOC from '../HOC/MutationHOC';
import LoadingIndicator from '../Common/FormComponents/LoadingIndicator';

const styles = ({ spacing, mixins }) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: spacing.unit * 4,
    alignItems: 'center',
    flexFlow: 'column',
  },
  loginPaper: {
    ...mixins.gutters(),
    paddingTop: spacing.unit * 2,
    paddingBottom: spacing.unit * 2,
    marginBottom: spacing.unit * 2,
  },
  textField: {
    minWidth: 400,
    marginTop: spacing.unit * 2,
    marginBottom: spacing.unit * 2,
  },
  inputContainer: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  submit: {
    marginTop: spacing.unit * 2,
    display: 'flex',
    justifyContent: 'space-between',
  },
  popover: {
    margin: spacing.unit * 2,
  },
});

const mutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

@MutationHOC(mutation)
@withStyles(styles)
export default class Login extends Component {
  state = { email: '@bs-htg.nl', password: '', anchorEl: null }

  handleSubmit = this.handleSubmit.bind(this)

  handleOnChange = this.handleOnChange.bind(this)

  handleSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;
    this.props.mutateFunc({ variables: { email, password } });
    this.setState({ anchorEl: event.currentTarget });
  }

  handleOnChange(name, { target: { value } }) {
    this.setState({ [name]: value });
  }

  loginRedirect({ login: { token } }) {
    localStorage.setItem('authToken', token);
    return <Redirect to="/" />;
  }

  render() {
    const {
      classes, mutateResults: {
        data, loading, called, error,
      },
    } = this.props;

    if (
      !error
        && data && data.login && data.login.token
        && data.login.token !== 'invalid login'
    ) {
      return this.loginRedirect(data);
    }

    const { anchorEl } = this.state;
    return (
      <div className={classes.container}>
        <Paper className={classes.loginPaper} elevation={1}>
          <form onSubmit={this.handleSubmit} className={classes.inputContainer}>
            <LoginTextField
              name="E-mail"
              type="email"
              className={classes.textField}
              stateVal={this.state.email}
              changeFunc={e => this.handleOnChange('email', e)} />
            <LoginTextField
              name="Wachtwoord"
              type="password"
              className={classes.textField}
              stateVal={this.state.password}
              changeFunc={e => this.handleOnChange('password', e)} />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submit}
              size="large">
              <span>Login</span>
              <LoadingIndicator
                loading={loading}
                called={called}
                error={error} />
            </Button>

            <Popover
              open={Boolean(error && anchorEl)}
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              onClose={e => this.setState({ anchorEl: null })}>
              <Typography className={classes.popover}>
                {error && error.message.replace(/.+(?:error:)/, '')}
              </Typography>
            </Popover>
          </form>
        </Paper>
      </div>
    );
  }
}

const LoginTextField = ({
  name, type, className, stateVal, changeFunc,
}) => (
  <TextField
    id={name}
    type={type}
    label={name}
    className={className}
    required={true}
    value={stateVal}
    onChange={changeFunc} />
);
