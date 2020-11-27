
import { log, debug } from '../utils/logger.js'

export const ply_turn = (ctx, params) => {
    const { selector } = params
//    const position = ctx.peek(selector)
//    const { board, flags, captures, raycaster } = position    
    const futures = ctx.get_futures()

    log('# rule: ply-turn')
    debug({ params })  

    futures.map((selector) => {
        const path = ctx.current_path + '/' + selector
        const position = ctx.peek(path)
        const { board, flags, captures, raycaster } = position
        const side_to_move = flags.get_pair('current-player').value
        const ply_turn = flags.get_pair('ply-turn').value
        const half_turn = flags.get_pair('half-turn').value

        switch(side_to_move) {
            case 'black':
                flags.set_pair('current-player', 'white')
            break

            case 'white':
                flags.set_pair('current-player', 'black')
            break
        }

        flags.set_pair('half-turn', 1 - half_turn)        

        flags.set_pair('ply-turn', ply_turn + half_turn)
    })    
}
