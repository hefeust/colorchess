
import { engine } from './engine.js'

export const board_moves = (dims, pov) => {

        const find_move = (starting, ending) => {
            const found = []
            const prefix = [starting, ending].join(':')

            futures.map((selector) => {
//                console.log({ selector, prefix })

               if(selector.substr(0, prefix.length) === prefix) {
                    found.push(selector)
               }
            })

//            console.log('find_move', { futures, ref, found})

            return found
        }

    const click = (ref) => {
        const piece = engine.whois(ref)
        const futures = engine.get_futures()
    
        console.log('click', { ref, state })

        switch(state) {
            case 'nothing':
                if(piece) {
                    starting = ref
                    state = 'starting'
                    console.log({state, ref })
                } else {
                    console.log('board_move.click: NOTHING to select here !')
                }
            break
            case 'starting':
                if(starting === ref) {
                    // deseelect tile
                    state = 'nothing'
                    starting = null
                    console.log('board_move.click: DESELECTING tile')
                    moves.splice(0)
                } else {
                    state = 'nothing'
                    ending = ref
                    console.log('move: ' + starting + '-' + ending)

                    moves.push(...find_move(starting, ending))

                    console.log({ moves })

                    switch(moves.length) {
                        case 0:
                            console.log('/!\ Not a valid move !')
                        break
                        case 1:
                            console.log('ordinary move')
                            engine.play(moves[0])
                        break
                        case 4:
                            // promotions
                            console.log('promotion move: asking for new piece name (callback or promise)')
                        break
                    }

                    moves.splice(0)
                }
            break
            case 'ending':
                
            break
        }

    }

    const moves = []

    let state = 'nothing'
    let starting = null
    let ending = null

    return { click }
}
