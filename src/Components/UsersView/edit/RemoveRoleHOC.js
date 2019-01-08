import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const graphqlQuery = gql`mutation ($roleId: Int!, $userId: Int!) {
  removeRole(roleId: $roleId, userId: $userId) {
    id, email, roles {
      id name
    }
  }
}`;

export default WrappedComponent => class RemoveRoleHOC extends Component {
  render() {
    return <Mutation mutation={graphqlQuery}
      children={
        (mutateFunc, data) => (
          <WrappedComponent dataRemoveRole={data} mutateRemoveRole={mutateFunc} {...this.props} />
        )
      }
    />;
  }
};
