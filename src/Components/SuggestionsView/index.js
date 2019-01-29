import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import ListView from './list';
import ExecuteView from './execute';
// import DeleteView from './delete';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'column',
  },
});

@withStyles(styles)
export default class SuggestionsView extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Route path="/suggestions/execute/:id" component={ExecuteView} />
        <Route path="/suggestions/delete/:id" component={ListView} />
        <Route component={ListView} />
      </div>
    );
  }
}
