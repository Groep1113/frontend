import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import './productregistration.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import QueryHOC from '../HOC/QueryHOC';

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
  render() {
    const { loading, error, data } = this.props.queryResults;
    if (loading) return 'Loading graphql query..';
    if (error) {
      return 'Something went wrong';
    }
    return (
      <div className = "register">
        <div className='header'>
          <h3>
            Huidige producten:
          </h3>
          <MuiThemeProvider theme={theme}>
            <Button variant='fab' color='primary' className='add' onClick={this.handleClickOpen}>
              <AddIcon />
            </Button>
          </MuiThemeProvider>
        </div>
        <Table data = {data.items} headers = {firstRowTable} columns = {columnFormatting}/>
      </div>
    );
  }
}
