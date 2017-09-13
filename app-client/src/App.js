import React, { Component } from 'react';
import './App.css';
import Dashboard from './containers/Dashboard';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import {
    ApolloClient,
    ApolloProvider,
    createNetworkInterface,
} from 'react-apollo';

const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });

// if (!process.env.GRAPHQL_ENDPOINT) {
//     throw new Error('GRAPHQL_ENDPOINT is not defined');
// }

const client = new ApolloClient({
    networkInterface,
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                    <App>
                        <Route
                            path="/"
                            component={Dashboard}
                        />
                    </App>
                </Router>
            </ApolloProvider>,
                document.getElementById('root')
        );
    }
}

export default App;
