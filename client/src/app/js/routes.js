import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Users from './components/users/index';
import User from './components/users/show';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Users} />
    <Route path="users/:id" component={User} />
  </Route>
);
