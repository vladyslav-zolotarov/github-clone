import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = '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';

  return {
    headers: {
      ...headers,

      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
});
