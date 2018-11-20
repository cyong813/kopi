import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App.js';
import Bookmarks from './components/Bookmarks';

const Routes = () => (
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/bookmarks' component={Bookmarks} />
    </Switch>
);

export default Routes;