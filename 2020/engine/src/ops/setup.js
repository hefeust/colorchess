
import { log, debug } from '../utils/logger.js'
import { create_standard_position } from '../assets/standard-position.js'

export const ops_setup = (ctx, generator, options) => {
    const standard_position = create_standard_position()
    const products = new Array()

    let forked = null

    log('# setting up game...')
    
    if (options.fen) {
        log ('# ... with FEN')       

    } 

    if (options.pgn) {
        log ('# ... with PGN')            

    } 

    if(!options.fen && !options.pgn) {
        log ('basic setup, standard game')               

        ctx.setup(standard_position)        
        
//        generator.process({
//            selector: '#init!'
//       })        

        generator.setup()

        log('ops_setup')
        log('found futures; count = ' + ctx.get_futures().length)
        debug({ futures: ctx.get_futures() })
    }
}
