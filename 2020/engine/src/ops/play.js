
import { log, debug } from '../utils/logger.js'

const make_selector = (move) => {
    const ots = ({}).toString.call(move)
    
    if(ots === '[object String]') {
        return move
    } else {
        return move.start + ':' + move.end + (promote? '=' + promote : '')
    }
}

export const ops_play = (ctx, generator, move) => {
    log ('playing move...')
    debug({ move })
    
    const subpath = make_selector (move)   
  
    if(ctx.get_futures().indexOf(subpath) > -1) {
        ctx.push(subpath)
        
        log('ctx.current_path= ' + ctx.current_path )
        
        generator.process({
//            selector: ctx.current_path
            selector: subpath
        })        
        
        log('futures: ' + ctx.get_futures().length)
    } else {
        log('ops-play: error NO FUTURES for selection !')
//        throw new Error('no-futures-to-play!')
    }
}

