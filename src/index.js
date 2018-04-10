/* globals document, window */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import _ from 'lodash';
import procedurefyApp from './state/reducers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { addItem } from './state/actions';

const store = createStore(
  procedurefyApp,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
_.times(30, (i) => {
  store.dispatch(addItem(`Item ${i + 1}`));
  const aparent = store.getState().procedure.settings.maxId;
  _.times(5, (b) => {
    store.dispatch(addItem(`Item ${i + 1}-${b + 1}`, aparent));
    const bparent = store.getState().procedure.settings.maxId;
    _.times(5, (c) => {
      store.dispatch(addItem(`Item ${i + 1}-${b + 1}-${c + 1}`, bparent));
    });
  });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
