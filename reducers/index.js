import { combineReducers } from 'redux';

import settings from './settings';
import blocks from './blocks';

var reducers = combineReducers({
    settings,
    blocks
});

export default reducers;
