
import { get } from 'svelte/store'
import { stored_game } from './stored-game.js'

const EMPTY = '#empty!'
const SELECTED = '#ref!'

const create_move_clicks = () => {

    const find_move = (starting, ending) => {
        const futures = get(stored_game.get_futures())
        const found = []
        const prefix = [starting, ending].join(':')


        futures.map((selector) => {
           if(selector.substr(0, prefix.length) === prefix) {
               found.push(selector)
           }
        })

        return found
    }

    const click = (ref) => {
        const piece = get(stored_game.get_whois(ref))
        const futures = get(stored_game.get_futures())
    
        console.log('click', { ref, state })

        switch(state) {
            case EMPTY:
                if(piece) {
                    state = SELECTED
                    starting = ref
                } else {
                    console.log('board_move.click: NOTHING to select here !')
                }
            break
            case SELECTED:
                if(starting === ref) {
                    // deseelect tile
                    state = EMPTY
                    starting = null
                    moves.splice(0)

                    console.log('board_move.click: DESELECTING tile')
                } else {
                    state = EMPTY
                    ending = ref
                    console.log('move: ' + starting + '-' + ending)

                    moves.push(...find_move(starting, ending))

                    switch(moves.length) {
                        case 0:
                            console.log('/!\ Not a valid move !')
                        break
                        case 1:
                            console.log('ordinary move')
                            stored_game.play(moves[0])
                        break
                        case 4:
                            // promotions
                            console.log('promotion move: asking for new piece name (callback or promise)')
                        break
                    }

                    moves.splice(0)
                }
            break
        }
    }

    const moves = []

    let state = EMPTY
    let starting = null
    let ending = null

    return { click }
}

export const move_clicks = create_move_clicks()
