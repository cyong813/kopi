import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App.js';
import Login from './components/Login';
import Register from './components/Register';
import Bookmarks from './components/Bookmarks';
import Cafes from './components/Cafes';
import Drinks from './components/Drinks';

const Routes = () => (
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route exact path='/bookmarks' component={Bookmarks} />
      <Route exact path='/cafes' component={Cafes} />
      <Route exact path='/drinks' component={Drinks} />
    </Switch>
);

export default Routes;