import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { BrowserRouter, withRouter } from 'react-router-dom';
import { ApolloProvider } from "react-apollo";
import App from './Components/App';

import './index.css' // global base css

const client = new ApolloClient({
  uri: "http://localhost:9000/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
  ,document.getElementById('app')
);
