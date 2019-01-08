import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab/Fab';
import AddIcon from '@material-ui/icons/Add';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import TextField from '@material-ui/core/TextField/TextField';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import gql from 'graphql-tag';
import MutationHOC from '../HOC/MutationHOC';

const mutation = gql`
  mutation($name: String!) {
    createCategory (
      name: $name,
    ) { id }
  }`;

@MutationHOC(mutation)
export default class AddCategory extends Component {
  state = {
    open: false,
    name: '',
    submit: false,
  }

  handleClickOpen = this.handleClickOpen.bind(this)

  handleClose = this.handleClose.bind(this)

  handleChange = this.handleChange.bind(this)

  handleClick = this.handleClick.bind(this)

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

  handleClick() {
    this.setState({
      open: false,
    });
    const { name } = this.state;
    this.props.mutateFunc({
      variables: {
        name,
      },
    });
    window.location.reload();
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className='header'>
        <h3>
          Huidige categorieën:
        </h3>
        <Fab color='primary' className='addLocation' onClick={this.handleClickOpen}>
          <AddIcon />
        </Fab>
        <Dialog
          className='dialogueWindow'
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Voeg een categorie toe:</DialogTitle>
          <DialogContent className='dialogueContent'>
            <div>
              <TextField
                id='name'
                name='name'
                label='Categorienaam'
                margin='normal'
                onChange={e => this.handleChange(e, 'name')}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClick} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
