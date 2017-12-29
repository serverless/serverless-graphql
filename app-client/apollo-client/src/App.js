import React, { Component } from 'react';
import UserList from './components/UserList';
import logo from './logo.svg';
import './App.css';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

//enable persisted queries
const apolloLink = createPersistedQueryLink().concat(
  HttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT })
);

const client = new ApolloClient({
  link: apolloLink,
  cache: new InMemoryCache(),
});

/* fetch data from graphQL server and print on console */
//client.query({ query: gql`{ hello }` }).then(console.log);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Serverless GraphQL Apollo </h2>
          </div>
          <div className="App-User">
            <UserList />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
