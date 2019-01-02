import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditIcon from '@material-ui/icons/Edit';
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

let rowIndex = null;

function displayMessage(event) {
  console.log(`You clicked it ${event}`);
}

function getRowIndex(event) {
  rowIndex = 1;
  console.log(`${rowIndex} ${event}`);
}

const mapDataToJSXRows = (data, columns) => data.map((row, i) => (
  <tr className="table__row" key={row.id ? row.id : i} onMouseOver = {getRowIndex}>
    {mapColumnsToJSX(row, columns)}
    <td className='lastColumn'>
      <EditIcon className='editIcon' onClick={displayMessage}/>
      <DeleteRoundedIcon className='deleteIcon' onClick={displayMessage}/>
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
