import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TopNavbar from './TopNavbar';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

let title="Wikipedia Thumbnail Gallery"

ReactDOM.render(
  <TopNavbar title={title} />,
  document.getElementById('top-navbar')
);
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();
