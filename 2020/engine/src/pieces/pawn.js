

export const pawn = (side) => {
    const name = side + '-' + 'pawn'
    const deltas = []
    const iterative = false
    let fen = ''

    if(side === 'black') {
        fen = 'p'
    }

    if(side === 'white') {
        fen = 'P'
    }
    
    return { name, fen, deltas, iterative, side }
}
