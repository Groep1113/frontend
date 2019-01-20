import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const graphqlQuery = gql`mutation($itemId: Int!, $locationId: Int!) {
    itemRemoveLocation (
      itemId: $itemId,
      locationId: $locationId) {
        id name locations { id code }
    }
  }`;

export default WrappedComponent => class RemoveLocationHOC extends Component {
  render() {
    return <Mutation mutation={graphqlQuery}
      children={
        (mutateFunc, data) => (
          <WrappedComponent
            dataRemoveLocation={data} mutateRemoveLocation={mutateFunc} {...this.props} />
        )
      }
    />;
  }
};
