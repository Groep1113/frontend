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
import FormControl from '@material-ui/core/FormControl/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import MutationHOC from '../HOC/MutationHOC';

const mutation = gql`  
mutation($itemId: Int!, $amount: Int!, $plannedDate: LocalDate!) {
    createReservationTransaction (
      itemId: $itemId, 
      amount: $amount, 
      plannedDate: $plannedDate
    ) { createdDate }
}`;

@MutationHOC(mutation)
export default class AddReservation extends Component {
  state = {
    open: false,
    item: '',
    amount: null,
    plannedDate: null,
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

  handleClick(items) {
    this.setState({
      open: false,
    });
    const { item, plannedDate } = this.state;
    let { amount } = this.state;
    const itemId = parseInt(item, 10);
    amount = parseInt(amount, 10);

    this.props.mutateFunc({
      variables: {
        itemId, amount, plannedDate,
      },
    });
    window.location.reload();
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    let { items } = this.props;
    items = items.map(itemsToJSX);
    return (
      <div className='header'>
        <h3>
          Huidige reserveringen:
        </h3>
        <Fab color='primary' className='addReservation' onClick={this.handleClickOpen}>
          <AddIcon />
        </Fab>
        <Dialog
          className='dialogueWindow'
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Maak een reservering:</DialogTitle>
          <DialogContent className='dialogueContent'>
            <div className='dropdown'>
              <FormControl>
                <InputLabel htmlFor="location">Items</InputLabel>
                <Select
                  className='productFormControl'
                  value={this.state.item}
                  onChange={e => this.handleChange(e, 'item')}
                  inputProps={{
                    name: 'items',
                    id: 'items',
                  }}
                >
                  {items}
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                id='amount'
                name='amount'
                label='Aantal'
                margin='normal'
                onChange={e => this.handleChange(e, 'amount')}
              />
            </div>
            <div>
              <TextField
                id='plannedDate'
                name='plannedDate'
                type='date'
                defaultValue='2019-01-31'
                label='Reserveringsdatum'
                margin='normal'
                onChange={e => this.handleChange(e, 'plannedDate')}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={e => this.handleClick(items)} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const itemsToJSX = (items, i) => {
  const item = items;
  return (
    <MenuItem key={i} value={item.id}
      className="menuItem">
      {item.name}
    </MenuItem>
  );
};
