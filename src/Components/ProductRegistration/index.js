import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import './productregistration.css';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import TextField from '@material-ui/core/TextField';
import QueryHOC from '../HOC/QueryHOC';
import Table from '../Table';
import Mutation from '../Mutation';

const query = gql`{
  items {
    name code locations {code} recommended_stock
  }
}`;

const columnFormatting = ['name', 'code', ({ locations }) => locations.reduce((accum, { code }) => `${accum}, ${code}`, '').substring(2), 'recommended_stock'];
const firstRowTable = ['Product', 'Type', 'Locatie', 'Aanbevolen voorraad'];

@QueryHOC(query)
@withRouter
export default class ProductRegistration extends Component {
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
      submit: true,
      open: false,
    });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { loading, error, data } = this.props.queryResults;
    if (loading) return 'Gegevens worden geladen..';
    if (error) {
      return <div>Er ging iets fout.<br />{error.message}</div>;
    }
    return (
      <div className='register'>
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
              <TextField
                id='location'
                name='location'
                label='Locatie'
                margin='normal'
                onChange={e => this.handleChange(e, 'location')}
              />
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
        <Mutation
          product = {this.state.product}
          type = {this.state.type}
          location = {this.state.location}
          stock = {this.state.recommendedStock}
          submit = {this.state.submit} />
        <Table data = {data.items} headers = {firstRowTable} columns = {columnFormatting}/>
      </div>
    );
  }
}
