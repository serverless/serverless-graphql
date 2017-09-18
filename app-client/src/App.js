import React, { Component } from 'react';
import ContributorList from './components/ContributorList'
import logo from './logo.svg';
import './App.css';

import {
    ApolloClient,
    ApolloProvider,
    createNetworkInterface,
} from 'react-apollo';

const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });

const client = new ApolloClient({
    networkInterface,
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
                        Welcome to the world of <code>Serverless</code> and <code>GraphQL</code>.
                    </p>
                    <p className="App-Contributor">
                        <ContributorList/>
                    </p>
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
