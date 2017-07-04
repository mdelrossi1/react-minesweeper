export const flagMine = (row, col) => {
    return {
        type: 'FLAG_MINE',
        row,
        col
    }
}
