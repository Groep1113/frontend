import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const graphqlQuery = gql`mutation ($roleId: Int!, $userId: Int!) {
  addRole(roleId: $roleId, userId: $userId) {
    id, email, roles {
      id name
    }
  }
}`;

export default WrappedComponent => class AddRoleHOC extends Component {
  render() {
    return <Mutation mutation={graphqlQuery}
      children={
        (mutateFunc, data) => (
          <WrappedComponent dataAddRole={data} mutateAddRole={mutateFunc} {...this.props} />
        )
      }
    />;
  }
};
