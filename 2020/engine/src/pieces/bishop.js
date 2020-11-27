


export const bishop = (side) => {
    const name = side + '-' + 'bishop'

    const deltas = [
        { col: -1, row: -1 }, 
        { col: -1, row: 1 }, 
        { col: 1, row: -1 },                         
        { col: 1, row: 1 }
    ]

    const iterative = true

    let fen = ''

    if(side === 'black') {
        fen = 'b'
    }

    if(side === 'white') {
        fen = 'B'
    }
    
    return { name, fen, deltas, iterative, side }
}
