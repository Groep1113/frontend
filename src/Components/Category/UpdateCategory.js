import React, { Component } from 'react';
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
import { withRouter } from 'react-router-dom';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import TextField from '@material-ui/core/TextField/TextField';
import EditIcon from '@material-ui/icons/Edit';
import MutationHOC from '../HOC/MutationHOC';

const mutation = gql`  
  mutation($categoryId: Int!, $name: String!) {
    categoryChangeName (
      categoryId: $categoryId,
      name: $name,
    ) { name }
  }`;

@MutationHOC(mutation)
@withRouter
export default class UpdateCategory extends Component {
  state = {
    open: false,
    category: '',
    openSuccessMessage: false,
    openErrorMessage: false,
  }

  handleClickOpen = this.handleClickOpen.bind(this)

  handleChange = this.handleChange.bind(this)

  handleClick = this.handleClick.bind(this)

  handleClose = this.handleClose.bind(this)

  handleClickOpen() {
    this.setState({
      open: true,
    });
  }

  handleChange({ target: { value } }, k) {
    this.setState({
      [k]: value,
    });
  }

  handleClick(rowIndex) {
    const categoryId = parseInt(rowIndex, 10);
    const name = this.state.category;
    const itemDeleted = this.props.mutateFunc({
      variables: {
        categoryId,
        name,
      },
    });
    // window.location.reload();
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
        <EditIcon className='deleteIcon' onClick={this.handleClickOpen}/>
        <Dialog
          className='dialogueWindow'
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Verander de categorienaam: </DialogTitle>
          <DialogContent className='dialogueContent'>
            <div>
              <TextField
                id='category'
                name='category'
                label='Categorie'
                margin='normal'
                onChange={e => this.handleChange(e, 'category')}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={e => this.handleClick(rowIndex)} color="primary" autoFocus>
              Ok
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
                De categorienaam is aangepast.
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
