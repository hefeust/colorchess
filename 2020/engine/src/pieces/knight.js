


export const knight = (side) => {
    const name = side + '-' + 'knight'

    const deltas = [
        { col: -1, row: -2 }, 
        { col: -1, row: 2 }, 
        { col: -2, row: 1 }, 
        { col: -2, row: -1 }, 

        { col: 1, row: -2 }, 
        { col: 1, row: 2 }, 
        { col: 2, row: 1 }, 
        { col: 2, row: -1 }, 

    ]

    const iterative = false

    let fen = ''

    if(side === 'black') {
        fen = 'n'
    }

    if(side === 'white') {
        fen = 'N'
    }
    
    return { name, fen, deltas, iterative, side }
}
