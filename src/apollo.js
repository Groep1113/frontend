import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error'; // @TODO add error handling middleware

const httpLink = new HttpLink({
  // @TODO: backend url as config option or environment variable
  uri: 'http://localhost:9000/graphql',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the HTTP Bearer Auth to the headers
  const token = localStorage.getItem('authToken');
  if (token === null) return forward(operation);

  operation.setContext({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}` || null,
    },
  });

  return forward(operation);
});

const errorLink = onError(({ forward, graphQLErrors }) => {
  if (graphQLErrors.filter(({ message }) => message === 'Unauthorized.')) {
    localStorage.clear();
    window.location.replace('/');
  }

  forward();
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});
export default client;
