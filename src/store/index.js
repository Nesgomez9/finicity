import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';

const initialState = {
  load: false,
  userInformation: {},
  accounts: [],
  selectedAccount: {},
  transaction: {},
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Store = (props) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default Store;
