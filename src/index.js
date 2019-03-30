import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Local from './Local';
import MapComponent from './MapComponent';


import TestImages from './Component/TestImages';

import * as serviceWorker from './serviceWorker';




ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();



