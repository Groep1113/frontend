import React, { Component } from 'react';
import { Query } from 'react-apollo';

export default graphqlQuery => WrappedComponent => class QueryHOC extends Component {
  render() {
    if (!localStorage.getItem('token')) {
      return (
        <WrappedComponent {...this.props}
          queryResults={{ loading: false, data: null, error: true }} />
      );
    }

    return <Query query={graphqlQuery}
      children={
        data => <WrappedComponent queryResults={data} {...this.props} />
      }
    />;
  }
};
