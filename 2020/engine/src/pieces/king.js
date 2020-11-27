


export const king = (side) => {
    const name = side + '-' + 'king'

    const deltas = [
        { col: -1, row: -1 }, 
        { col: -1, row: 0 }, 
        { col: -1, row: 1 }, 

        { col: 0, row: 1 }, 
        { col: 0, row: -1 },                         

        { col: 1, row: -1 },                         
        { col: 1, row: 0 }, 
        { col: 1, row: 1 }
    ]

    const iterative = false

    let fen = ''

    if(side === 'black') {
        fen = 'k'
    }

    if(side === 'white') {
        fen = 'K'
    }
    
    return { name, fen, deltas, iterative, side }
}
