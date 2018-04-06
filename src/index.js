/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import procedurefyApp from './state/reducers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { addItem } from './state/actions';

const store = createStore(procedurefyApp);
store.dispatch(addItem('Item 1'));
store.dispatch(addItem('Item 2'));
store.dispatch(addItem('Item 3'));
store.dispatch(addItem('Item 4'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
