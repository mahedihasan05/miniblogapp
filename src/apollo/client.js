import { ApolloClient, InMemoryCache, ApolloProvider, makeVar } from "@apollo/client";

// Reactive variable
export const favoritePostsVar = makeVar([]);

// Cache with pagination merge function
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: false,
          merge(existing = [], incoming = []) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  uri: "https://graphqlzero.almansi.me/api", // free public GraphQL API
  cache,
});
