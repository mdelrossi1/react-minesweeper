var settings = (state = {}, action) => {
    var newState = Object.assign(state, {
        mineFieldRows: 10,
        mineFieldCols: 10,
        numberOfMines: 10
    });

    return newState;
}

export default settings;
