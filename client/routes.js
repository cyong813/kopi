import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App.js';
import Login from './components/Login';
import Register from './components/Register';
import Bookmarks from './components/Bookmarks';
import Cafe from './components/Cafe';
import Cafes from './components/Cafes';
import Drinks from './components/Drinks';
import Drink from './components/Drink';
import Navbar from './layout/Navbar';

const Routes = () => (
  <div>
    <Navbar />
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route exact path='/bookmarks' component={Bookmarks} />
      <Route exact path='/cafes' component={Cafes} />
      <Route path="/cafe/:cafe_name" component={Cafe} />
      <Route exact path='/drinks' component={Drinks} />
      <Route path="/drink/:drink_name" component={Drink} />
    </Switch>
  </div>
);

export default Routes;