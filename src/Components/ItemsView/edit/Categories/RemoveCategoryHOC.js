import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const graphqlQuery = gql`mutation($itemId: Int!, $categoryId: Int!) {
    itemRemoveCategory (
      itemId: $itemId,
      categoryId: $categoryId) {
        id name categories { id name }
    }
  }`;

export default WrappedComponent => class RemoveCategoryHOC extends Component {
  render() {
    return <Mutation mutation={graphqlQuery}
      children={
        (mutateFunc, data) => (
          <WrappedComponent
            dataRemoveCategory={data} mutateRemoveCategory={mutateFunc} {...this.props} />
        )
      }
    />;
  }
};
