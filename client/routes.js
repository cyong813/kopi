import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/App';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Bookmarks from './containers/Bookmarks/Bookmarks';
import Cafe from './containers/Cafes/Cafe/Cafe';
import Cafes from './containers/Cafes/Cafes';
import Drinks from './containers/Drinks/Drinks';
import Drink from './containers/Drinks/Drink/Drink';
import Navbar from './components/Navigation/Navbar/Navbar';

const Routes = () => (
  <div>
    <Navbar />
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/bookmarks' component={Bookmarks} />
      <Route exact path='/cafes' component={Cafes} />
      <Route path="/cafe/:cafe_name" component={Cafe} />
      <Route exact path='/drinks' component={Drinks} />
      <Route path="/drink/:drink_name" component={Drink} />
    </Switch>
  </div>
);

export default Routes;