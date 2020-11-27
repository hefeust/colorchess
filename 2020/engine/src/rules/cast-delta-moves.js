
import { log, debug} from '../utils/logger.js'
import { NULL_REF } from '../core/refs.js'
import { create_piece } from '../core/pieces.js'
import { RAY_DELTA } from '../game/raycaster.js'

export const cast_delta_moves = (ctx, params) => {
    const { selector } = params
    const position = ctx.peek(selector)
    const { board, flags, captures, raycaster } = position    
    const locations = board.select('delta')

    log('## RULE: cast-deltas')
    debug({ params })
    debug({ locations })

    locations.forEach((ref) => {
        const fen = board.whois(ref)
        const piece = create_piece(fen)
        
        piece.deltas.forEach((deltas) => {
            const sequence = ref.sequence(deltas, piece.iterative)

 //           console.log( piece.name, sequence.join(','))
            raycaster.cast(piece.side, RAY_DELTA, sequence)    

       })             
    })
}

