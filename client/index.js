import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes';
import './assets/styles/main.scss';

ReactDOM.render(
    <BrowserRouter>
      <Routes />
    </BrowserRouter>, 
  document.getElementById('root')
);