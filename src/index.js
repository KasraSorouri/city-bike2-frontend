import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client'

const client = new ApolloClient({
  uri: '/api/citybike',
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)