import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'column',
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    minWidth: 200,
  },
  links: {
    marginTop: theme.spacing.unit * 2,
  },
});

@withStyles(styles)
@withRouter
export default class UnauthorizedView extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h4">Toegang geweigerd</Typography>
          <Typography variant="body1">
            Uw gebruikersaccount heeft onvoldoende rechten om deze pagina te bekijken.
            <br />
            Login op een account met de juiste rechten.
          </Typography>
          <div className={classes.links}>
            <Link to="/">Terug naar Dashboard</Link>
          </div>
        </Paper>
      </div>
    );
  }
}
