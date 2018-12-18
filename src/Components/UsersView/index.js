import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import ListView from './list';
import EditView from './edit';
import CreateView from './create';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'column',
  },
});

@withStyles(styles)
export default class UsersView extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Switch>
          <Route path="/users/create" component={CreateView} />
          <Route path="/users/edit" component={EditView} />
          <Route component={ListView} />
        </Switch>
      </div>
    );
  }
}
