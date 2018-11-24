import React, { Component } from 'react';
import { Query } from 'react-apollo';

export default graphqlQuery => WrappedComponent => class QueryHOC extends Component {
  render() {
    return <Query query={graphqlQuery}
      children={
        data => <WrappedComponent queryResults={data} />
      }
    />;
  }
};
