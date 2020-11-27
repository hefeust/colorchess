
import { log, debug } from '../utils/logger.js'

export const test_ending = (ctx, params) => {

    const { selector } = params
    const position = ctx.peek(selector)
    const { board, flags, captures, raycaster } = position    

    const futures = ctx.get_futures()

    let illegals = 0

    futures.map((subpath) => {
        const {flags} = ctx.peek(selector + '/' + subpath)

        if(flags.get_pair('is-legal').value === false) {
//            console.log('ILLEGAL VARIATION')
            illegals++
        }
    })

//    console.log('futures #=' + futures.length)
//    console.log({ illegals })

    if(futures.length === illegals) {
        flags.set_pair('is-end', true)
    } else {
        flags.set_pair('is-end', false)
    }    
}

