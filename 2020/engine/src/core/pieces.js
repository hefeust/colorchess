
import { log} from '../utils/logger.js'

import { king } from '../pieces/king.js'
import { pawn } from '../pieces/pawn.js'
import { queen } from '../pieces/queen.js'
import { rook } from '../pieces/rook.js'
import { bishop } from '../pieces/bishop.js'
import { knight } from '../pieces/knight.js'


const qualities = [king, queen, rook, pawn, knight, bishop]

const aliases = new Map()

export const create_piece = (options) => {
    const ots = ({}).toString.call(options)
    let piece = null 
    
//    console.log('create_piece', options)
    
    if(ots === '[object String]') {
        if(aliases.has(options)) {
            piece = aliases.get(options)
        }
    } else if(ots === '[object Object]') {
        /// recursive call
        piece = create_piece(opttions.side + '-' + options.quality)
    }
    
    return piece
}

String.prototype.piece = function() {
    return create_piece(this)
}

/*
aliases.set('k', king('black'))
aliases.set('K', king('white'))
aliases.set('black-king', king('black'))
aliases.set('white-king', king('white'))
*/

qualities.forEach((quality) => {
    const black_piece = quality('black')
    const white_piece = quality('white')
    
    aliases.set(black_piece.name, black_piece)  
    aliases.set(white_piece.name, white_piece)  
    aliases.set(black_piece.fen,  black_piece)  
    aliases.set(white_piece.fen,  white_piece)      
})

// console.log(aliases)
