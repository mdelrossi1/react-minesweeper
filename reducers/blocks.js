const initData = (id) => {
        return { ticks: 0, isMine: false, revealed: false, id: id };
    },

    buildField = (randomNumbersArray, cols, rows) => {
        let blocks = [],
            id = 0;

        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
            blocks[rowIndex] = [];

            for (let colIndex = 0; colIndex < cols; colIndex++) {
                blocks[rowIndex][colIndex] = initData(id);

                if (randomNumbersArray.includes((rowIndex * cols) + colIndex)) {
                    blocks[rowIndex][colIndex].isMine = true;
                }

                id++;
            }
        }

        blocks = addTicks(blocks, rows, cols);

        return blocks;
    },

    addTicks = (blocks, mineFieldRows, mineFieldCols) => {
        for (let rowIndex = 0; rowIndex < mineFieldRows; rowIndex++) {
            for (let colIndex = 0; colIndex < mineFieldCols; colIndex++) {
                let currentBlock = blocks[rowIndex][colIndex],
                    firstRow = rowIndex === 0,
                    lastRow = rowIndex === mineFieldRows - 1,
                    firstCol = colIndex === 0,
                    lastCol = colIndex === mineFieldCols - 1;

                if (currentBlock.isMine) { continue; }

                if (!firstRow) {
                    if (!firstCol) {
                        if (blocks[rowIndex - 1][colIndex - 1].isMine) { currentBlock.ticks++; }
                    }

                    if (blocks[rowIndex - 1][colIndex].isMine) { currentBlock.ticks++; }

                    if (!lastCol) {
                        if (blocks[rowIndex - 1][colIndex + 1].isMine) { currentBlock.ticks++; }
                    }
                }

                if (!firstCol) {
                    if (blocks[rowIndex][colIndex - 1].isMine) { currentBlock.ticks++; }
                }

                if (!lastCol) {
                    if (blocks[rowIndex][colIndex + 1].isMine) { currentBlock.ticks++; }
                }

                if (!lastRow) {
                    if (!firstCol) {
                        if (blocks[rowIndex + 1][colIndex - 1].isMine) { currentBlock.ticks++; }
                    }

                    if (blocks[rowIndex + 1][colIndex].isMine) { currentBlock.ticks++; }

                    if (!lastCol) {
                        if (blocks[rowIndex + 1][colIndex + 1].isMine) { currentBlock.ticks++; }
                    }
                }
            }
        }

        return blocks;
    },

    floodArea = (field, row, col) => {
        setRevealed(field, row-1, col-1);
        setRevealed(field, row, col-1);
        setRevealed(field, row+1, col-1);
        setRevealed(field, row-1, col);
        setRevealed(field, row+1, col);
        setRevealed(field, row-1, col+1);
        setRevealed(field, row, col+1);
        setRevealed(field, row+1, col+1);
    },

    setRevealed = (field, row, col) => {
        let wasRevealed,
            block;

        if (typeof field[row] === 'undefined') {
            return false;
        }

        if (typeof field[row][col] === 'undefined') {
            return false;
        }

        block = field[row][col];
        wasRevealed = block.revealed;
        block.revealed = true;

        if (block.ticks === 0 && wasRevealed === false && block.isMine === false) {
            floodArea(field, row, col);
        }

        return field;
    }

const blocks = (state = [], action) => {
    var newState = state.concat([]);

    switch(action.type) {
        case 'INIT_APP':
            newState = buildField(action.mines, action.cols, action.rows);
            break;
        case 'REVEAL_MINE':
            newState = setRevealed(newState, action.row, action.col);

    }

    return newState;
}

export default blocks;
