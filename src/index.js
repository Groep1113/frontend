import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { BrowserRouter, withRouter } from 'react-router-dom';

import './index.css' // global base css

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
