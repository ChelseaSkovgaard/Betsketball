import React from 'react';
import { render } from 'react-dom';
import firebase from './firebase';
import App from './components/app';
require('./style.scss');

render(<App/>, document.getElementById('application'));
