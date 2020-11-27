


export const queen = (side) => {
    const name = side + '-' + 'queen'

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

    const iterative = true

    let fen = ''

    if(side === 'black') {
        fen = 'q'
    }

    if(side === 'white') {
        fen = 'Q'
    }
    
    return { name, fen, deltas, iterative, side }
}
