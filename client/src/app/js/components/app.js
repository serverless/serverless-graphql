import React from 'react';
import { Component } from 'react';

import Error from './shared/error';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Error />
        {this.props.children}
      </div>
    );
  }
}
