


export const rook = (side) => {
    const name = side + '-' + 'rook'

    const deltas = [
        { col: -1, row: 0 }, 
        { col: 0, row: 1 }, 
        { col: 0, row: -1 },                         
        { col: 1, row: 0 }, 
    ]

    const iterative = true

    let fen = ''

    if(side === 'black') {
        fen = 'r'
    }

    if(side === 'white') {
        fen = 'R'
    }
    
    return { name, fen, deltas, iterative, side }
}
