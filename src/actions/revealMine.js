export const revealMine = (row, col) => {
    return {
        type: 'REVEAL_MINE',
        row,
        col
    }
}
