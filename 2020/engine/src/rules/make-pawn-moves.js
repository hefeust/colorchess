
import { log, debug } from '../utils/logger.js'
import { NULL_REF } from '../core/refs.js'
import { create_piece } from '../core/pieces.js'
import { get_side_param } from '../core/sides.js'

const promoted = (side) => {
    if(side === 'black') return 'q,r,b,n'.split(',')
    if(side === 'white') return 'Q,R,B,N'.split(',')
    return [] // do not promote if neutral...
}

export const make_pawn_moves = (ctx, params) => {
    const { selector } = params
    const position = ctx.peek(selector)
    const { board, flags, captures, raycaster } = position    

//    const locations = board.select('pawn')
//    const side_to_move = flags.get_pair('current-player').value
    const futures = []

    const proponent = flags.get_pair('current-player').value
    const opponent = (proponent === 'white') ? 'black' : 'white'

    const our_pawns_refs = board.select(['pawn', proponent])
    const all_their_refs = board.select([opponent])

    log('# RULE: make-pawn-moves')
    log('\t our_pawns_refs count =' + our_pawns_refs.length)


    debug({ params })
    debug({ our_pawns_refs, all_their_refs })

    our_pawns_refs.map((src_ref, sridx) => {
        const dests = raycaster.get_dests_for(src_ref)

        log('    trying move #' + sridx + ' from ref = ' + src_ref)        
//        debug({ dests })        
        log('\t' + dests.join(', '))
        log('\t' + dests.length)

        dests.map((dest_ref, drix) => {
            const attacker_refs = raycaster.get_starts_to(dest_ref)
            const subpath = [src_ref, dest_ref].join(':')        

            if(attacker_refs.indexOf(src_ref) === -1) return null

//            if(piece_to_move.side !== side_to_move) return null
//            if(is_attacker && !piece_capture) return null
//            if(!is_attacker && piece_capture) return null


            if(dest_ref[1] === get_side_param(proponent, 'promote-row') ) {
                promoted(proponent).map((promoted_fen) => {
                    futures.push(subpath + '=' + promoted_fen)
                })
            } else {
                futures.push(subpath)
            }
        })
    })
 
    log('    found futures, count = ' + futures.length)    

    futures.map((subpath) => {
        const forked = ctx.fork(selector, subpath)

        // a2:a4
        // b7:b8=Q
        const src = subpath.substr(0, 2)
        const dest = subpath.substr(3, 2)
        const fen_promote = subpath.substr(6, 1) // more often an empty string...

        const fen_attacker = forked.board.whois(src)
        const fen_capture = forked.board.whois(dest)

        forked.board.remove(src)
        forked.board.remove(dest)
   
        if(fen_promote === '') {
            forked.board.place(dest, fen_attacker)
        } else {
            forked.board.place(dest, fen_promote)
        }
            
       if(fen_capture) forked.captures.submit(fen_capture)
   })    
}

