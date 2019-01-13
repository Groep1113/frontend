import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import ListView from './list';
// import EditView from './edit';
// import CreateView from './create';
import DeleteView from './delete';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'column',
  },
});

@withStyles(styles)
export default class LocationsView extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {/* <Route path="/locations2/create" component={CreateView} /> */}
        <Route path="/locations2/delete/:id" component={DeleteView} />
        {/* <Route path="/locations2/edit/:id" component={EditView} /> */}
        <Route component={ListView} />
      </div>
    );
  }
}
