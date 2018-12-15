import React, { Component } from 'react';
import gql from 'graphql-tag';
import Fab from '@material-ui/core/Fab/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import TextField from '@material-ui/core/TextField/TextField';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import MutationHOC from '../HOC/MutationHOC';
import DropdownProduct from './DropdownProduct';

const mutation = gql`  
  mutation($type: String!, $location: Int!, $recommendedStock: Int!, $product: String!) {
    createItem (
      code: $type, 
      locationId: $location, 
      recommended_stock: $recommendedStock, 
      name: $product) {
        code
    }
  }`;

@MutationHOC(mutation)
export default class FormProduct extends Component {
  state = {
    open: false,
    product: '',
    type: '',
    location: '',
    recommendedStock: '',
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
    const {
      product, type,
    } = this.state;
    let { location, recommendedStock } = this.state;
    location = parseInt(location, 10);
    recommendedStock = parseInt(recommendedStock, 10);
    this.props.mutateFunc({
      variables: {
        type, location, recommendedStock, product,
      },
    });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className='header'>
        <h3>
          Huidige producten:
        </h3>
        <Fab color='primary' className='add' onClick={this.handleClickOpen}>
          <AddIcon />
        </Fab>
        <Dialog
          className='dialogueWindow'
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Voeg een product toe:</DialogTitle>
          <DialogContent className='dialogueContent'>
            <div>
              <TextField
                id='product'
                name='product[name]'
                label='Product'
                margin='normal'
                onChange={e => this.handleChange(e, 'product')}
              />
            </div>
            <div>
              <TextField
                id='type'
                name='type'
                label='Type'
                margin='normal'
                onChange={e => this.handleChange(e, 'type')}
              />
            </div>
            <DropdownProduct
              onChange={e => this.handleChange(e, 'location')}
            />
            {/* <TextField */}
            {/* id='location' */}
            {/* name='location' */}
            {/* label='Locatie' */}
            {/* margin='normal' */}
            {/* onChange={e => this.handleChange(e, 'location')} */}
            {/* /> */}
            <div>
              <TextField
                id='stock'
                name='stock'
                label='Aanbevolen voorraad'
                margin='normal'
                onChange={e => this.handleChange(e, 'recommendedStock')}
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
