import { combineReducers } from 'redux';

import settings from './settings';
import gameState from './gameState';
import blocks from './blocks';

var reducers = combineReducers({
    settings,
    gameState,
    blocks
});

export default reducers;
