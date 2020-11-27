
import { log, debug } from '../utils/logger.js'

import { NULL_REF } from '../core/refs.js'
import { create_piece } from '../core/pieces.js'
import { get_side_param } from '../core/sides.js'
import { RAY_OFFSET, RAY_CAPTURE } from '../game//raycaster.js'

export const cast_pawn_moves = (ctx, params) => {
    const { selector } = params
    const position = ctx.peek(selector)
    const { board, flags, captures, raycaster } = position    
    const side_to_move = flags.get_pair('current-player').value
    const locations = board.select('pawn')

    log('cast-pawns-moves')
    log('side_to_move:' + side_to_move)
    debug({ params })
    debug({ locations })

    locations.forEach((ref) => {
        const fen = board.whois(ref)
        const piece = create_piece(fen)
        const delta_row = get_side_param(piece.side, 'delta-row').value
        const start_row = get_side_param(piece.side, 'start-row').value

        debug('' + board)
        debug({ delta_row, start_row })
        
        // simple move
        const sms = ref.sequence({ col: 0, row: delta_row}, false)
        raycaster.cast(piece.side, RAY_OFFSET, sms)
        
        // capture move
        const c1 = ref.sequence({ col: -1, row: delta_row}, false)
        raycaster.cast(piece.side, RAY_CAPTURE, c1)

        const c2 = ref.sequence({ col: 1, row: delta_row}, false)
        raycaster.cast(piece.side, RAY_CAPTURE, c2)        
 
//        console.log({ sms, c1, c2})
        
        // first move
        
         if(piece.side === side_to_move && ref[1] == start_row) {
             const fms = ref.sequence({ col: 0, row: delta_row}, true).slice(0, 3)
             raycaster.cast(piece.side, RAY_OFFSET, fms)
             
//             console.log({ fms })
         }
         //promotion
         
         // en-passant capture move
    })
}
