export const initApp = (mines, cols, rows) => {
    return {
        type: 'INIT_APP',
        mines,
        cols,
        rows
    }
}
