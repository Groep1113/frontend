import React, { Component } from 'react';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import gql from 'graphql-tag';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import MutationHOC from '../HOC/MutationHOC';
import DialogContent from "@material-ui/core/DialogContent/DialogContent";

const mutation = gql`  
mutation($itemId: Int!) {
  deleteItem(itemId: $itemId) 
}`;

@MutationHOC(mutation)
export default class DeleteItem extends Component {
  state = {
    open: false,
    openSuccessMessage: false,
    openErrorMessage: false,
  }

  handleClickOpen = this.handleClickOpen.bind(this)

  handleClick = this.handleClick.bind(this)

  handleClose = this.handleClose.bind(this)

  handleClickOpen() {
    this.setState({
      open: true,
    });
  }

  handleClick(itemId) {
    const itemDeleted = this.props.mutateFunc({
      variables: {
        itemId,
      },
    });
    window.location.reload();
    if (itemDeleted) {
      this.setState({ open: false, openSuccessMessage: true });
    } else {
      this.setState({ open: false, openErrorMessage: true });
    }
  }

  handleClose() {
    this.setState({ open: false, openErrorMessage: false, openSuccessMessage: false });
  }

  render() {
    const rowIndex = this.props.row;
    return (
      <div>
        <DeleteRoundedIcon className='deleteIcon' onClick={this.handleClickOpen} />
        <Dialog
          className='dialogueWindow'
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Product verwijderen</DialogTitle>
          <DialogContent>
            Weet je het zeker?
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={e => this.handleClick(rowIndex)} color="primary" autoFocus>
              Ja
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={this.state.openSuccessMessage}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className='success'>
                <CheckCircleIcon/>
                Het product is verwijderd.
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                onClick={this.handleClose}
              >
                <CloseIcon className='success'/>
              </IconButton>,
            ]}
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={this.state.openErrorMessage}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className='error'>
                <ErrorIcon/>
                Er ging iets mis, probeer het opnieuw.
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                onClick={this.handleClose}
              >
                <CloseIcon className='error'/>
              </IconButton>,
            ]}
          />
        </Snackbar>
      </div>);
  }
}
