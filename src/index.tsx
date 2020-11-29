import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Router } from './Router';
import { tools } from './tools/tools';
import { Overview } from './tools/overview/Overview';

ReactDOM.render(
  <React.StrictMode>
    <Router
      routes={tools as any}
      fallback={() => <Overview />}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
