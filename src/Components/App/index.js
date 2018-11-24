import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthRequired from '../AuthRequired';
import Login from '../Login';
import Navbar from '../Navbar';
import Welcome from '../Welcome';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <AuthRequired>
          <Switch>
            <Route path="/login" component={Login} />
            <Route component={Welcome} />
          </Switch>
        </AuthRequired>
      </>
    );
  }
}


export function createTable(firstRowTable, query) {
  const table = { body: document.body, tbl: document.createElement('table') };
  const { body, tbl } = table;
  tbl.setAttribute('className', 'registerTable');
  tbl.style.width = '60%';
  tbl.style.marginLeft = '5%';
  tbl.style.marginTop = '10%';

  for (let i = 0; i < query.length + 1; i += 1) { // diepte
    const tr = tbl.insertRow();
    tr.style.height = '2em';
    for (let j = 0; j < firstRowTable.length; j += 1) { // breedte
      if (i === 0) {
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(firstRowTable[j]));
        td.style.backgroundColor = '#a5bff5';
      } else {
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(query[i - 1][j]));
        if (i % 2 === 0) {
          td.style.backgroundColor = '#d5d5d5';
        } else {
          td.style.backgroundColor = '#f6f6f6';
        }
      }
    }
  }
  body.appendChild(tbl);
}
