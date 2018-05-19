import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
import { SchemaLink } from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';

import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';

import App from './App';
import { typeDefs, mocks } from './schema';

import registerServiceWorker from './registerServiceWorker';

const cache = new InMemoryCache();

// const GITHUB_BASE_URL = 'https://api.github.com/graphql';

// const httpLink = new HttpLink({
//   uri: GITHUB_BASE_URL,
//   headers: {
//     authorization: `Bearer ${
//       process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
//     }`,
//   },
// });

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({
  schema,
  mocks,
});

const client = new ApolloClient({
  // link: httpLink,
  link: new SchemaLink({ schema }),
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
