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
  }

  handleClickOpen = this.handleClickOpen.bind(this)

  handleClose = this.handleClose.bind(this)

  handleClickOpen() {
    this.setState({
      open: true,
    });
  }

  handleChange() {
    this.setState({
      open: false,
    });
    // console.log(this.state.product);
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
                  label='Product'
                  margin='normal'
                />
              </div>
              <div>
                <TextField
                  id='type'
                  label='Type'
                  margin='normal'
                />
              </div>
              <TextField
                id='location'
                label='Locatie'
                margin='normal'
              />
              <div>
                <TextField
                  id='stock'
                  label='Aanbevolen voorraad'
                  margin='normal'
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                  Cancel
              </Button>
              <Button onClick={this.handleChange} color="primary" autoFocus>
                  Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Table data = {data.items} headers = {firstRowTable} columns = {columnFormatting}/>
      </div>
    );
  }
}
