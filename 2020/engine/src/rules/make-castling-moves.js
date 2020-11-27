
import { log, debug } from '../utils/logger.js'
import { NULL_REF } from '../core/refs.js'
import { create_piece } from '../core/pieces.js'
import { get_side_param } from '../core/sides.js'

export const make_castling_moves = (ctx, params) => {
    const { selector } = params
    const position = ctx.peek(selector)
    const { board, flags, captures, raycaster } = position    

    const castlings = ['O-O', 'O-O-O']

    const proponent = flags.get_pair('current-player').value
    let opponent = null

    // @TODO: could be directly set in flags ?
    if(proponent === 'black') opponent = 'white'
    if(proponent === 'white') opponent = 'black'

    log('# rule: make_castling_moves')
    debug({ params })

    castlings.map((castle) => {
        const flag_name = proponent + '-' + castle
        const king_path = get_side_param(proponent, castle + '-king').value
        const rook_path = get_side_param(proponent, castle + '-rook').value    
        const kpn = king_path[king_path.length - 1]
        const rpn = rook_path[rook_path.length - 1]

        let ok_king = true
        let ok_rook = true
        let forked, subpath
        let fen_king, fen_rook

        if(flags.get_pair(flag_name).value === false) return null

        // could the king pass ?
        if(raycaster.get_dests_for(king_path[0]).indexOf(kpn) === -1) ok_king = false

        // is there a checking position ??
        king_path.map((ref, ridx) => {
            const pressions = raycaster.get_pressions(ref)

            if(pressions[opponent] > 0) ok_king = false
        })

        // rook path
        if(raycaster.get_starts_to(rpn).indexOf(rook_path[0]) === -1) ok_rook = false

        console.log({
            king_path,
            rook_path,              
            ok_king,
            ok_rook,
        })

        if(ok_king && ok_rook) {
            subpath = [king_path[0], king_path[2]].join(':')
            forked = ctx.fork(selector, subpath)
            
            fen_king = forked.board.whois(king_path[0])
            fen_rook = forked.board.whois(rook_path[0])

            forked.board.remove(king_path[0])
            forked.board.remove(rook_path[0])
            forked.board.place(kpn, fen_king)
            forked.board.place(rpn, fen_rook)

            // the two castling flags fall down simultaneously when castling
            forked.flags.set_pair(proponent + '-O-O', false)
            forked.flags.set_pair(proponent + '-O-O-O', false)
        }
    })
}


