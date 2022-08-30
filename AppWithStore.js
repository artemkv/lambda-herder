import React from 'react';
import store from './state/store';
import {Provider} from 'react-redux';
import App from './App';

const AppWithStore = _ => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWithStore;
