var gameState = (state = {}, action) => {
    var newState = Object.assign({}, state, {
        isStarted: false,
        totalMines: 0
    });

    switch(action.type) {
        case 'INIT_APP':
            newState.totalMines = action.mines.length;
            break;

        // no default
    }

    return newState;
}

export default gameState;
