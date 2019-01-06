import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import './table.css';
import DeleteProduct from '../ProductRegistration/DeleteProduct';

@withRouter
export default class Table extends Component {
  render() {
    let { data, headers } = this.props;
    const { columns, deleteVersion } = this.props;
    headers = headers.map(headerToJSX);
    data = mapDataToJSXRows(data, columns, deleteVersion);
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

function displayMessage(event) {
  console.log(`You clicked it ${event}`);
}

function addDelete(deleteVersion, rowId) {
  switch (deleteVersion) {
  case 'product':
    return <DeleteProduct className='deleteIcon' row = {rowId}/>;
  case 'anderDing':
    return 'anderDing';
  default:
    return null;
  }
}

const mapDataToJSXRows = (data, columns, deleteVersion) => data.map((row, i) => (
  <tr className="table__row" key={row.id ? row.id : i} >
    {mapColumnsToJSX(row, columns)}
    <td className='lastColumn'>
      <EditIcon className='editIcon' onClick={displayMessage}/>
      {addDelete(deleteVersion, row.id)}
    </td>
  </tr>
));

const mapColumnsToJSX = (row, columns) => columns.map((x, i) => {
  let col = x;
  if (typeof col === 'string') col = row[col];
  if (typeof col === 'function') col = col(row);
  return (
    <td className="table__cell" key={`${row.id}.${i}`}>
      {col}
    </td>
  );
});

const headerToJSX = (headerInfo, i) => {
  let header = headerInfo;
  if (typeof header === 'string') header = { value: header };

  return (
    <th key={i}
      className="table__head__cell" style={header.style}>
      {header.value}
    </th>
  );
};
