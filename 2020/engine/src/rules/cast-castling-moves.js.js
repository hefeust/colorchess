
import { log, debug} from '../utils/logger.js'
import { NULL_REF } from '../core/refs.js'
import { create_piece } from '../core/pieces.js'
import { get_side_param } from '../core/sides.js'
import { RAY_OFFSET } from '../game/raycaster.js'

export const cast_castling_moves = (ctx, params) => {
    const { selector } = params
    const position = ctx.peek(selector)
    const { board, flags, captures, raycaster } = position    

    const castling_infos= [
        { player: 'black', castle: 'O-O'},
        { player: 'black', castle: 'O-O-O'},
        { player: 'white', castle: 'O-O'},
        { player: 'white', castle: 'O-O-O'}
    ]

    log('## RULE: cast-castling-moves')
    debug({ params })

    castling_infos.map((infos) => {
        const flag_name = infos.player + '-' + infos.castle
        const king_path = get_side_param(infos.player, infos.castle + '-king').value
        const rook_path = get_side_param(infos.player, infos.castle + '-rook').value
        const king_refs = board.select(['king', infos.player])
        const rook_refs = board.select(['rook', infos.player])

        debug({ flag_name, king_path, rook_path })
        debug({ king_refs, rook_refs })

        // a quick'n'dirty legality check hre...
        if(king_refs.length !== 1) flags.set_pair('is-legal', false)

        // exit with message ?
        if(flags.get_pair(flag_name).value === false) return null

        // if conditions are satisafied, castle castling flags
        // otherwise the flag falls down
        if(king_path[0] === king_refs[0] && rook_refs.indexOf(rook_path[0] > -1)) {
            raycaster.cast(infos.player, RAY_OFFSET, king_path)
            raycaster.cast(infos.player, RAY_OFFSET, rook_path)
        } else {
            flags.set_pair(flag_name, false)
        }
    })
}

