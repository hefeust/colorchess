
import { log, debug } from '../utils/logger.js'
import { NULL_REF } from '../core/refs.js'
import { create_piece } from '../core/pieces.js'

export const make_delta_moves = (ctx, params) => {
    const { selector } = params
    const position = ctx.peek(selector)
    const { board, flags, captures, raycaster } = position    
    const locations = board.select('delta')
    
    log('# rule: make_delta_moves')
    debug({ params })
    debug({ locations })

    locations.map((starting_ref) => {
        const fen_to_move = board.whois(starting_ref)
        const piece_to_move = create_piece(fen_to_move)
        const targets = raycaster.get_dests_for(starting_ref)
        const side_to_move = flags.get_pair('current-player').value

//        console.log(flags.value('side-turn'))
        if(piece_to_move.side !== side_to_move) return null
        
        targets.map((target_ref) => {
            const subpath = [starting_ref, target_ref].join(':')
            const fen_captured = board.whois(target_ref)
            const piece_captured = create_piece(fen_captured) 
            let forked
            
            if (piece_captured && piece_captured.side === piece_to_move.side) return null

            forked = ctx.fork(selector, subpath)

            forked.board.remove(starting_ref)
            forked.board.remove(target_ref)
            forked.board.place (target_ref, piece_to_move)
            
            if(piece_captured) forked.captures.submit(piece_captured)
        })
    })
}

