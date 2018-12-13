import React, { Component } from 'react';
import gql from 'graphql-tag';
import MutationHOC from '../HOC/MutationHOC';
import QueryHOC from '../HOC/QueryHOC';

const mutation = gql`  
  mutation($code: String!, $locationId: Int!, $recommended_stock: Int!, $name: String!) {
  createItem (
    code: $code, 
    locationId: $locationId, 
    recommended_stock: $recommended_stock, 
    name: $name) {
      code
    }
  }`;

// @MutationHOC(mutation)
export default class Mutation extends Component {
  render() {
    const {
      product, type, location, stock, submit,
    } = this.props;
    console.log(this.props.submit);
    // if (submit = true) {
    //
    // }

    // return ();
    return (
      <div className='mutation'>
      </div>
    );
  }
}
