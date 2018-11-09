import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { onError } from 'apollo-link-error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  // @TODO: backend url as config option or environment variable
  uri: "http://localhost:9000/graphql"
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the HTTP Basic Auth to the headers
  operation.setContext({
    headers: {
      "Authorization": "Basic " + localStorage.getItem('BasicAuth') || null,
    }
  });

  return forward(operation);
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
});
export default client;
