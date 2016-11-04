require('./style.scss');
import React from 'react';
import { render } from 'react-dom';
import firebase from './firebase';
import App from './components/App';

render(<App/>, document.getElementById('application'));
