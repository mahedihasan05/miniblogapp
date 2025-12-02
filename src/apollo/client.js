import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  makeVar,
} from "@apollo/client";

export const favoritePostsVar = makeVar([]);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: ["options"],
          merge(existing = { data: [] }, incoming = { data: [] }) {
            return {
              ...incoming,
              data: [...(existing.data || []), ...incoming.data],
            };
          },
        },
        favoritePosts: {
          read() {
            return favoritePostsVar();
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  uri: "https://graphqlzero.almansi.me/api",
  cache,
  defaultOptions: {
    watchQuery: { errorPolicy: "all" },
    query: { errorPolicy: "all" },
  },
});

export const ApolloAppProvider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
