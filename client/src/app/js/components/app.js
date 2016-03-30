import React from 'react';
import { Component } from 'react';

import Error from './shared/error';
import Header from './shared/header';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Error />
        {this.props.children}
      </div>
    );
  }
}
