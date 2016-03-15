import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Users from './components/users/index';
import User from './components/users/show';
import New from './components/users/new';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Users} />
    <Route path="users/:id" component={User} />
    <Route path="user/new" component={New} />
  </Route>
);
