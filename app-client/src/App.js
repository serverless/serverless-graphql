import React, { Component } from 'react';
import UserList from './components/UserList';
import logo from './logo.svg';
import './App.css';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT }),
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Serverless GraphQL Apollo </h2>
          </div>
          <p className="App-intro">
            Welcome to the world of <code>Serverless</code> and{' '}
            <code>GraphQL</code>.
          </p>
          <p className="App-User">
            <UserList />
          </p>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
