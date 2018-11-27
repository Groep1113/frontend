import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 50,
  },
  loginPaper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  textField: {
  },
  inputContainer: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
});

@withRouter
@withStyles(styles)
export default class Login extends Component {
  state = { email: '@bs-htg.nl', password: '' }

  handleSubmit = this.handleSubmit.bind(this)

  handleSubmit(e) {
    e.preventDefault();

    console.log('submit received', this.state);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Paper className={classes.loginPaper} elevation={1}>
          <form onSubmit={this.handleSubmit} className={classes.inputContainer}>
            <TextField id="email"
              label="E-mail"
              type="email"
              autoComplete="email"
              className={classes.textField}
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })} />
            <TextField id="password"
              label="Password"
              type="password"
              className={classes.textField}
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })} />
            <Button color="primary"
              type="submit"
              className={classes.submit}
              size="large">
              Login
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}
