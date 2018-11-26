import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import './productregistration.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import TextField from '@material-ui/core/TextField';
import QueryHOC from '../HOC/QueryHOC';
import Table from '../Table';

const query = gql`{
  items {
    name code locations {code} recommended_stock 
  }
}`;

const theme = createMuiTheme({
  // because we apparently use typography and it will be deprecated with the next release,
  // to have a smooth transition:
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#0a45c1',
    },
  },
});

const columnFormatting = ['name', 'code', ({ locations }) => locations.reduce((accum, { code }) => `${accum}, ${code}`, '').substring(2), 'recommended_stock'];
const firstRowTable = ['Product', 'Type', 'Locatie', 'Aanbevolen voorraad'];

@QueryHOC(query)
@withRouter
export default class ProductRegistration extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { loading, error, data } = this.props.queryResults;
    if (loading) return 'Loading graphql query..';
    if (error) {
      return 'Something went wrong';
    }
    return (
      <div className = 'register'>
        <div className='header'>
          <h3>
            Huidige producten:
          </h3>
          <MuiThemeProvider theme={theme}>
            <Button variant='fab' color='primary' className='add' onClick={this.handleClickOpen}>
              <AddIcon />
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>Voeg een product toe:</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  <TextField
                    id='standard-name'
                    label='Product'
                    margin='normal'
                  />
                </DialogContentText>
                <DialogContentText id='alert-dialog-description'>
                  <TextField
                    id='standard-name'
                    label='Type'
                    margin='normal'
                  />
                  <DialogContentText id='alert-dialog-description'>
                  </DialogContentText>
                  <TextField
                    id='standard-name'
                    label='Locatie'
                    margin='normal'
                  />
                  <DialogContentText id='alert-dialog-description'>
                  </DialogContentText>
                  <TextField
                    id='standard-name'
                    label='Aanbevolen voorraad'
                    margin='normal'
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </MuiThemeProvider>
        </div>
        <Table data = {data.items} headers = {firstRowTable} columns = {columnFormatting}/>
      </div>
    );
  }
}
