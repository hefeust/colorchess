
import { log, debug } from '../utils/logger.js'
import { refs, NULL_REF } from '../core/refs.js'
import { create_piece } from '../core/pieces.js'
import { get_side_param } from '../core/sides.js'

const promoted = (side) => {
    if(side === 'black') return 'qrbn'.split('')
    if(side === 'white') return 'QRBN'.split('')
    return [] // do not promote if neutral...
}

export const make_pawn_moves = (ctx, params) => {
    const { selector } = params
    const position = ctx.peek(selector)
    const { board, flags, captures, raycaster } = position    

    // future moves
    const moves = []

    const proponent = flags.get_pair('current-player').value
    const opponent = (proponent === 'white') ? 'black' : 'white'

    const our_pawns_refs = board.select(['pawn', proponent])
    const all_their_refs = board.select([opponent])

    const promote_row = get_side_param(proponent, 'promote-row').value
    const home_row = get_side_param(proponent, 'home-row')

    let delta_row = 0
    let seq = []

    log('# RULE: make-pawn-moves')
    log('\t our_pawns_refs count =' + our_pawns_refs.length)

    debug({ params })
    debug({ our_pawns_refs, all_their_refs })

    our_pawns_refs.map((src, sidx) => {
        const dests = raycaster.get_dests_for(src)

        log('    trying move #' + sidx + ' from ref = ' + src)        
        debug({ dests })        
        log('\t' + dests.join(', '))
        log('\t' + dests.length)

        dests.map((dest, drix) => {
            const move = {
                src, 
                dest,
                promoted_fen: null,
                en_passant: flags.get_pair('en-passant').value
            }

            const attacker_refs = raycaster.get_starts_to(dest)

            // bconsole.log(attacker_refs)
            // console.log({ dest })
            // console.log(promote_row)

            if(attacker_refs.indexOf(src) === -1) return null

//            if(all_their_refs.indexOf(dest) === -1) return null

            // promotions
            if(dest[1] == promote_row) {

                promoted(proponent).map((promoted_fen) => {
                    // console.log({ promoted_fen })

                    moves.push({
                        src,  dest, promoted_fen, en_passant: NULL_REF
                    })
                })
            } else {
                moves.push({
                    src, dest, en_passant: flags.get_pair('en-passant').value
                })
            }
        })
    })
 
    log('    found moves, count = ' + moves.length)    

    moves.map((move) => {
        let subpath = ''
        let forked = null
        let fen_src, fen_dest, fen_promote
        let delta_row, seq

        subpath = move.src + ':' + move.dest

        if(move.promoted_fen) {
            subpath += '=' + move.promoted_fen
        }        

        // console.log({ subpath })

        forked = ctx.fork(selector, subpath)

        if(move.en_passant !== NULL_REF) {
            delta_row = get_side_param(proponent, 'delta-row').value
            seq = move.en_passant.sequence({ col: 0, row: -1 * delta_row })

            forked.board.remove(seq[1])
        }


        fen_src = board.whois(move.src)
        fen_dest = board.whois(move.dest)

        forked.board.remove(move.src)
        forked.board.remove(move.dest)
   
        if(move.promoted_fen) {
            forked.board.place(move.dest, move.promoted_fen)
        } else {
            forked.board.place(move.dest, fen_src)
        }

        if(fen_dest) forked.captures.submit(fen_dest)

        if(move.src[1] === home_row) {
            delta_row = get_side_param(proponent, 'delta-row')
            seq = move.src.sequence({ col: 0, row: delta_row })

            forked.flags.set_pair('en-passant', seq[1])    
        }

        forked.board.place(move.dest, fen_promote)
   })
}

