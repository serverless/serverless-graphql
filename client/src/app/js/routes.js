import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import UsersIndex from './components/users/index';
import UsersShow from './components/users/show';
import UsersEdit from './components/users/edit';
import UsersNew from './components/users/new';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={UsersIndex} />
    <Route path="users/:username/show" component={UsersShow} />
    <Route path="users/:username/edit" component={UsersEdit} />
    <Route path="users/new" component={UsersNew} />
  </Route>
);
