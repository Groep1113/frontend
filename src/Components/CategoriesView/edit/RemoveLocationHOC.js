import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const graphqlQuery = gql`mutation ($locationId: Int!, $categoryId: Int!) {
  categoryRemoveLocation(locationId: $locationId, categoryId: $categoryId) {
    id name locations {
      id code
    }
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
