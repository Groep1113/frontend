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
import FormControl from '@material-ui/core/FormControl/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import MutationHOC from '../HOC/MutationHOC';
// import withStyles from '@material-ui/core/styles/withStyles';

import './additem.css';

const mutation = gql`
  mutation($code: String, $location: Int, $recommendedStock: Int, $product: String!) {
    createItem (
      code: $code,
      locationId: $location,
      recommendedStock: $recommendedStock,
      name: $product) {
        code
    }
  }`;

@MutationHOC(mutation)
export default class AddItem extends Component {
  state = {
    open: false,
    product: '',
    code: '',
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
      product, code,
    } = this.state;
    let { location, recommendedStock } = this.state;
    location = parseInt(location, 10);
    recommendedStock = parseInt(recommendedStock, 10);
    this.props.mutateFunc({
      variables: {
        code, location, recommendedStock, product,
      },
    });
    window.location.reload();
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    let { locations } = this.props;
    locations = locations.map(locationToJSX);
    return (
      <div className='headerProduct'>
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
                id='code'
                name='code'
                label='Code'
                margin='normal'
                onChange={e => this.handleChange(e, 'code')}
              />
            </div>
            <div className='dropdown'>
              <FormControl>
                <InputLabel htmlFor="location">Location</InputLabel>
                <Select
                  className='productFormControl'
                  value={this.state.location}
                  onChange={e => this.handleChange(e, 'location')}
                  inputProps={{
                    name: 'locations',
                    id: 'locations',
                  }}
                >
                  {locations}
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                id='stock'
                name='stock'
                label='Minimum voorraad'
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

const locationToJSX = (locations, i) => {
  const location = locations;
  return (
    <MenuItem key={i} value={location.id}
      className="menuItem">
      {location.code}
    </MenuItem>
  );
};
