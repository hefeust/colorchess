
import { log, debug } from '../utils/logger.js'

const test_kings = (position, checking_mode) => {
    const { board, flags, raycaster } = position

    let proponent, opponent
    let ours, theirs

//    if(checking_mode === 'check-present') {
        proponent = flags.get_pair('current-player').value
         // @TODO: put this logic inside flags...
        opponent = (proponent === 'white') ? 'black' : 'white'

//    } 

//    if(checking_mode === 'anticipate-future') {
//        proponent = flags.get_pair('current-player').value
         // @TODO: put this logic inside flags...
//        opponent = (proponent === 'white') ? 'black' : 'white'
//    }

    // @TODO: needs to perform some checks for arrays safety !!!
    ours = board.select(['king', proponent])
    theirs = board.select(['king', opponent])

//    console.log({ proponent, opponent, ours, theirs })

    let checks = 0
    let illegals = 0

   // just one king per side !!!
    if(ours.length === 1 && theirs.length === 1) {
//        console.log(ours[0], raycaster.get_pressions(ours[0]))
//        console.log(theirs[0], raycaster.get_pressions(theirs[0]))

        // does our king being under attack ?
        if(raycaster.get_pressions(ours[0])[opponent] > 0) {
            flags.set_pair('is-check', true)

            if(checking_mode === 'anticpate_future') {
                flags.set_pair('is-legal', false)
            }
        } else {
            flags.set_pair('is-check', false)
        }

        // does thir king being under attack ?
        if(raycaster.get_pressions(theirs[0])[proponent] > 0) {
            flags.set_pair('is-check', true)
            flags.set_pair('is-legal', false)
        } 




    } else {
        // in some variations, king could be captured --> illegal
        flags.set_pair('is-legal', false)
        illegals++
    }

//    console.log({ checks, illegals })
    return { checks, illegals }
}

export const test_checkings = (ctx, params) => {
    const { selector } = params
    const { current_path, current_position } = ctx

    const subpaths = ctx.get_futures()

//    console.log('# rule: test-checking selector=' + selector)
    //debug({ params })  

    test_kings(current_position, 'check-present')

    subpaths.map((subpath) => {
        const f_selector = current_path + '/' + subpath
        const future_position = ctx.peek(f_selector)

//        console.log({ f_selector, future_position })
        
        test_kings(future_position, 'anticapte-future')
    })
}

