import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import './item.css';
import QueryHOC from '../HOC/QueryHOC';
import Table from '../Table';
import AddItem from './AddItem';

const query = gql`{
  items {
    id name code locations {code} recommendedStock categories { name }
  }
  locations { id, code }
  balances { id amount item { name } }
}`;

const columnFormatting = ['name', 'code', ({ locations }) => locations.reduce((accum, { code }) => `${accum}, ${code}`, '').substring(2), 'amount', 'recommendedStock', ({ categories }) => categories.reduce((accum, { name }) => `${accum}, ${name}`, '').substring(2)];
const firstRowTable = ['Product', 'Code', 'Locatie', 'Voorraad', 'Aanbevolen voorraad', 'Categorie'];

@QueryHOC(query)
@withRouter
export default class Item extends Component {
  render() {
    const { loading, error, data } = this.props.queryResults;
    if (loading) return 'Gegevens worden geladen..';
    if (error) {
      return <div>Er ging iets fout.<br />{error.message}</div>;
    }
    const { balances } = data;

    const items = addAmountToItemProperties(balances, data.items);
    console.log(items);

    return (
      <div className='register'>
        <AddItem locations = {data.locations} />
        <Table data = {items} headers = {firstRowTable} columns = {columnFormatting} version={'product'} />
      </div>
    );
  }
}

function addAmountToItemProperties(balances, items) {
  for (const balance of balances) {
    for (const item of items) {
      if (balance.item.name === item.name) {
        item.amount = balance.amount;
      }
    }
  }
  return items;
}
