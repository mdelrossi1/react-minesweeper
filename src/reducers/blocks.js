const initData = (id) => {
        return { ticks: 0, isMine: false, revealed: false, id: id, flagged: false };
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

        blocks = addTicks(blocks);

        return blocks;
    },

    addTick = (block, blocks, row, col) => {
        if (!blocks[row]) {
            return false;
        }

        if(!blocks[row][col]) {
            return false;
        }

        if (blocks[row][col].isMine) {
            block.ticks++;
        }
    },

    addTicks = (blocks) => {

        blocks.map((row, rowIndex) => {
            row.map((block, colIndex) => {
                if (block.isMine) { return false; }

                addTick(block, blocks, (rowIndex - 1), (colIndex - 1));
                addTick(block, blocks, (rowIndex - 1), (colIndex));
                addTick(block, blocks, (rowIndex - 1), (colIndex + 1));

                addTick(block, blocks, (rowIndex), (colIndex - 1));
                addTick(block, blocks, (rowIndex), (colIndex + 1));

                addTick(block, blocks, (rowIndex + 1), (colIndex - 1));
                addTick(block, blocks, (rowIndex + 1), (colIndex));
                addTick(block, blocks, (rowIndex + 1), (colIndex + 1));

                return false;
            });

            return false;
        });

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

        if (!field[row]) {
            return false;
        }

        if (!field[row][col]) {
            return false;
        }

        block = field[row][col];

        wasRevealed = block.revealed;
        block.revealed = true;

        if (block.ticks === 0 && wasRevealed === false && block.isMine === false) {
            floodArea(field, row, col);
        }

        return field;
    },

    revealedHandler = (field, row, col) => {
        let block = field[row][col];

        if (block.flagged) {
            return field;
        }

        return setRevealed(field, row, col);
    },

    setFlagged = (field, row, col) => {
        let block = field[row][col];

        if (!block.revealed) {
            block.flagged = !block.flagged;
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
            newState = revealedHandler(newState, action.row, action.col);
            break;
        case 'FLAG_MINE':
            newState = setFlagged(newState, action.row, action.col);
            break;

        // no default
    }

    return newState;
}

export default blocks;
