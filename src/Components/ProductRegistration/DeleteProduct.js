import React, { Component } from 'react';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import gql from 'graphql-tag';
import MutationHOC from '../HOC/MutationHOC';

const mutation = gql`  
mutation($itemId: Int!) {
  deleteItem(itemId: $itemId) 
}`;

@MutationHOC(mutation)
export default class DeleteProduct extends Component {
  handleClick = this.handleClick.bind(this)

  handleClick(itemId) {
    console.log(`${itemId}`);
    this.props.mutateFunc({
      variables: {
        itemId,
      },
    });
  }

  render() {
    const rowIndex = this.props.row;
    return (
      <DeleteRoundedIcon className='deleteIcon' onClick={e => this.handleClick(rowIndex)}/>
    );
  }
}
