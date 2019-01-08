import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

export default graphqlQuery => WrappedComponent => class MutationHOC extends Component {
  render() {
    return <Mutation mutation={graphqlQuery}
      children={
        (mutateFunc, data) => (
          <WrappedComponent mutateResults={data} mutateFunc={mutateFunc} {...this.props} />
        )
      }
    />;
  }
};
