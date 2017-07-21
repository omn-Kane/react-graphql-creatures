import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './containers/app-container';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers';
import CreaturesGraphql from './connectors/creatures-graphql';


let store = createStore(reducers);

ReactDOM.render(<Provider store={store}><CreaturesGraphql><App /></CreaturesGraphql></Provider>, document.getElementById('root'));
