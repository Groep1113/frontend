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
  // Dont know why this started bugging out, but sometimes this is undefined..
  if (!operation) return forward();

  // add the HTTP Bearer Auth to the headers
  const token = localStorage.getItem('authToken');
  if (token === null) return forward(operation);

  operation.setContext({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return forward(operation);
});

const errorLink = onError(({ forward, operation, graphQLErrors }) => {
  if (
    graphQLErrors
    && graphQLErrors.filter(({ message }) => message.includes('E401')).length
  ) {
    window.location.replace('/unauthorized');
  }

  if (operation) return forward(operation);
  return forward();
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});
export default client;
