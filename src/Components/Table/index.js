/* eslint-disable no-param-reassign,prefer-destructuring */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './table.css';

@withRouter
export default class Table extends Component {
  render() {
    let { data, headers } = this.props;
    const { columns } = this.props;
    headers = headers.map(headerToJSX);
    data = mapDataToJSXRows(data, columns);
    return (
      <div className='aTable'>
        <table>
          <thead className='tableHeads'>
            <tr>
              {headers}
            </tr>
          </thead>
          <tbody>
            {data}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDataToJSXRows = (data, columns) => data.map((row, i) => (
  <tr className="table__row" key={row.id ? row.id : i}>
    {mapColumnsToJSX(row, columns)}
  </tr>
));

const mapColumnsToJSX = (row, columns) => columns.map((col, i) => {
  if (typeof col === 'string') col = row[col];
  if (typeof col === 'function') col = col(row);
  return (
    <td className="table__cell" key={`${row.id}.${i}`}>
      {col}
    </td>
  );
});

const headerToJSX = (header, i) => {
  if (typeof header === 'string') header = { value: header };

  return (
    <th key={i}
      className="table__head__cell" style={header.style}>
      {header.value}
    </th>
  );
};
