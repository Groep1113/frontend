import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

@withRouter
export default class Table extends Component {
  render() {
    return (
      <>
        <Table className='aTable' data={this.props.data}>
          <th isKey dataField='product'>>
          </th>
        </Table>
      </>
    );
  }
}
