
export const create_captures = (options) => {
 
    const pieces = []
 
    const submit = (piece) => {
        let fen = '.'

        if(!piece) return null
        if(piece.fen) {
            // for old rules versions
            fen = piece.fen
        } else {
            fen = piece
        }
    
        pieces.push ( fen  )
    }
 
    const get_captured_by = (attacker_side) => {
        // note: (for AI stuff) kings could be captured in ghosts and spies evaluation
        // normal engine ctx evaluation and user interface should avoid this
        const black_pieces = 'kqrbnp'.split('')
        const white_pieces = 'KQRBNP'.split('')

        return pieces.filter ((fen) => { 
            let pieces_to_filter = []

            if(attacker_side === 'black') pieces_to_filter = white_pieces
            if(attacker_side === 'white') pieces_to_filter = black_pieces

            return (pieces_to_filter.indexOf(fen) > -1)
        })
    }
 
    const _each = ((cb) => {
        pieces.map ((c, cidx) => cb(cidx, c))
    })

    const fork = () => {
        const forked = create_captures()
    
        pieces.forEach((piece) =>  forked.submit(piece))
        
        return forked
    }

    const toString = () => {
        let text = '### CAPTURES ###' + '\n'

        text += '[by black]: ' + get_captured_by('black').join(' ') + '\n'
        text += '[by white]: ' + get_captured_by('white').join(' ') + '\n'

        console.log(pieces)
        
        return text
    }
 
    return {
        submit, get_captured_by,  fork, toString
    }   
}
