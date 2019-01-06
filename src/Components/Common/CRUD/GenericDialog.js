import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import LoadingIndicator from '../FormComponents/LoadingIndicator';

const styles = ({ spacing }) => ({
});

@withStyles(styles)
@withRouter
export default class GenericDialog extends Component {
  render() {
    const {
      dialogTitle, loading, error, called, children, cancelPath, onConfirm,
      history,
    } = this.props;

    return (
      <Dialog
        className='dialogueWindow'
        open={true}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {dialogTitle}
        </DialogTitle>
        <DialogContent className='dialogueContent'>
          {children}
        </DialogContent>
        <DialogActions>
          <LoadingIndicator loading={loading} error={error} called={called} />
          <Button onClick={e => history.push(cancelPath)} color="primary">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

GenericDialog.propTypes = {
  dialogTitle: PropTypes.string.isRequired,
  cancelPath: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  called: PropTypes.any,
};
