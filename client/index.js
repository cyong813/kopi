import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import Routes from './routes';
import './assets/styles/main.scss';

import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Routes />
    </HashRouter> 
  </Provider>, 
  document.getElementById('root')
);