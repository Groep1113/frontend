import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const graphqlQuery = gql`mutation($itemId: Int!, $locationId: Int!) {
    itemAddLocation (
      itemId: $itemId,
      locationId: $locationId) {
        id name locations { id code }
    }
  }`;

export default WrappedComponent => class AddLocationHOC extends Component {
  render() {
    return <Mutation mutation={graphqlQuery}
      children={
        (mutateFunc, data) => (
          <WrappedComponent dataAddLocation={data} mutateAddLocation={mutateFunc} {...this.props} />
        )
      }
    />;
  }
};
