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
  mutation($depth: Int!, $code: String!, $width: Int!, $height: Int!) {
    createLocation (
      depth: $depth,
      code: $code, 
      width: $width, 
      height: $height, 
    ) { code }
  }`;

@MutationHOC(mutation)
export default class AddLocation extends Component {
  state = {
    open: false,
    code: '',
    depth: null,
    height: null,
    width: null,
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
    const { code } = this.state;
    let { depth, height, width } = this.state;
    depth = parseInt(depth, 10);
    height = parseInt(height, 10);
    width = parseInt(width, 10);
    this.props.mutateFunc({
      variables: {
        code, depth, height, width,
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
          Huidige locaties:
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
          <DialogTitle id='alert-dialog-title'>Voeg een locatie toe:</DialogTitle>
          <DialogContent className='dialogueContent'>
            <div>
              <TextField
                id='code'
                name='code'
                label='Code'
                margin='normal'
                onChange={e => this.handleChange(e, 'code')}
              />
            </div>
            <div>
              <TextField
                id='depth'
                name='depth'
                label='Diepte'
                margin='normal'
                onChange={e => this.handleChange(e, 'depth')}
              />
            </div>
            <div>
              <TextField
                id='height'
                name='height'
                label='Hoogte'
                margin='normal'
                onChange={e => this.handleChange(e, 'height')}
              />
            </div>
            <div>
              <TextField
                id='width'
                name='width'
                label='Breedte'
                margin='normal'
                onChange={e => this.handleChange(e, 'width')}
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
