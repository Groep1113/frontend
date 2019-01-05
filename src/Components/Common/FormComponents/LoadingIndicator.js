import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Clear from '@material-ui/icons/Clear';
import Done from '@material-ui/icons/Done';

/**
 * LoadingIndicator, to display a CircularProgress icon during
 * loading, a Done icon when completed, or a Clear icon when an error occurred
 *
 * @prop  boolean    loading: truthy or false
 * @prop  boolean      error: truthy or false
 * @prop  boolean     called: truthy or false
 */

const styles = theme => ({
  loader: {
    width: 32,
    height: 32,
  },
});

@withStyles(styles)
export default class LoadingIndicator extends Component {
  render() {
    const {
      loading, error, called, classes: { loader },
    } = this.props;
    if (loading) return <CircularProgress color="secondary" size={32} className={loader} />;
    if (error) return <Clear size={32} color="secondary" className={loader} />;
    if (called) return <Done size={32} color="secondary" className={loader} />;
    return <span className={loader}>&nbsp;</span>;
  }
}
