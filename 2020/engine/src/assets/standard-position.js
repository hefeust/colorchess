
import { log, debug } from '../utils/logger.js'
import { create_position } from '../game/position.js'

export const create_standard_position = () => {
    const position = create_position()
 
     
    position.board.place('a1', 'R')
    position.board.place('b1', 'N')
    position.board.place('c1', 'B')
    position.board.place('d1', 'Q')
    position.board.place('e1', 'K')
    position.board.place('f1', 'B')
    position.board.place('g1', 'N')
    position.board.place('h1', 'R')

    position.board.place('a2', 'P')
    position.board.place('b2', 'P')
    position.board.place('c2', 'P')
    position.board.place('d2', 'P')
    position.board.place('e2', 'P')
    position.board.place('f2', 'P')
    position.board.place('g2', 'P')
    position.board.place('h2', 'P')

    position.board.place('a7', 'p')
    position.board.place('b7', 'p')
    position.board.place('c7', 'p')
    position.board.place('d7', 'p')
    position.board.place('e7', 'p')
    position.board.place('f7', 'p')
    position.board.place('g7', 'p')
    position.board.place('h7', 'p')

    position.board.place('a8', 'r')
    position.board.place('b8', 'n')
    position.board.place('c8', 'b')
    position.board.place('d8', 'q')
    position.board.place('e8', 'k')
    position.board.place('f8', 'b')
    position.board.place('g8', 'n')
    position.board.place('h8', 'r')

    log ('src/assets/standard-position.js: position')
    debug ("" + position)

    return position
}
