
import { log, debug } from '../utils/logger.js'
import { create_position } from '../game/position.js'

export const create_standard_position = () => {
    const position = create_position()
    const { board, flags = position}
     
    position.place('a7', 'P')
    position.place('b2', 'p')

    position.set('h7', 'k')
    position.set('h2', 'K')


    log ('src/assets/standard-position.js: position')
    debug ("" + position)

    return position
}
