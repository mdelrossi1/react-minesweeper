import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import router from './reducers/index.js'
import MineField from './components/MineField/container.js';

const store = createStore(router);

ReactDOM.render(
    <Provider store={store}>
        <MineField />
    </Provider>,
    document.getElementById('app')
);
