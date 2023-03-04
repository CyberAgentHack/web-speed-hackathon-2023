import type { HttpOptions } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const syncXhr: HttpOptions['fetch'] = (uri, options) => {
  return new Promise((resolve, reject) => {
    const method = options?.method;
    if (method === undefined) {
      return reject();
    }

    const body = options?.body;
    if (body instanceof ReadableStream) {
      return reject();
    }

    const request = new XMLHttpRequest();
    request.open(method, uri.toString(), false);
    request.setRequestHeader('content-type', 'application/json');
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        return resolve(new Response(request.response));
      }

      reject();
    };
    request.onerror = reject;

    request.send(body);
  });
};

const link = new HttpLink({ fetch: syncXhr });

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions: {
    mutate: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
  link,
  queryDeduplication: false,
  uri: '/graphql',
});
