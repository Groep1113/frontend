import React, { Component } from 'react';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import gql from 'graphql-tag';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import MutationHOC from '../HOC/MutationHOC';

const mutation = gql`  
mutation($itemId: Int!) {
  deleteItem(itemId: $itemId) 
}`;

@MutationHOC(mutation)
export default class DeleteProduct extends Component {
  state = {
    openSuccessMessage: false,
    openErrorMessage: false,
  }

  handleClick = this.handleClick.bind(this)

  handleClose = this.handleClose.bind(this)

  handleClick(itemId) {
    const itemDeleted = this.props.mutateFunc({
      variables: {
        itemId,
      },
    });
    window.location.reload();
    if (itemDeleted) {
      this.setState({ openSuccessMessage: true });
    } else {
      this.setState({ openErrorMessage: true });
    }
  }

  handleClose() {
    this.setState({ openErrorMessage: false, openSuccessMessage: false });
  }

  render() {
    const rowIndex = this.props.row;
    return (
      <div>
        <DeleteRoundedIcon className='deleteIcon' onClick={e => this.handleClick(rowIndex)}/>
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