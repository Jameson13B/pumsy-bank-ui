import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
// Apollo
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
// Configure dotenv
require('dotenv').config()
// Create Websocket URI
const wsLink = new WebSocketLink({
  uri: `wss://${process.env.REACT_APP_GRAPHQL_URL}`,
  options: {
    reconnect: true
  }
})
// Create Main URI
const httpLink = createHttpLink({
  uri: `https://${process.env.REACT_APP_GRAPHQL_URL}`
})
// Server link based off operation
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)
// Created Apollo Client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
