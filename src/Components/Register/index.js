import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { createTable } from '../App';
import './register.css';
import Table from '../Table';

const firstRowTable = ['Product', 'Type', 'Locatie', 'Leverancier'];
const query = [['printer 1', 'printer', '5G', 'bol.com'], ['desktop 1', 'desktop', '4G', 'amazon'], ['scanner 1', 'scanner', '3G', 'coolblue']];
const object = [
  {
    product: 'printer 1', type: 'printer', locatie: '5G', leverancier: 'bol.com',
  },
  {
    product: 'scanner 1', type: 'scanner', locatie: '3G', leverancier: 'coolblue',
  },
  {
    product: 'desktop 1', type: 'desktop', locatie: '4G', leverancier: 'amazon',
  }];

@withRouter
export default class Register extends Component {
  render() {
    return (
      <div className = "register">
        <Table data = {object} />
        {createTable(firstRowTable, query)}
      </div>
    );
  }
}
