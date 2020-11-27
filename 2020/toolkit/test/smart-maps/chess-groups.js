    
import { create_bidimap } from '../../src/smart-maps/bidimap.js'

// acceletor groups for piece selection
export const groups = create_bidimap()

groups.link({ a: ['king', 'white', 'delta'], b: 'K' })
groups.link({ a: ['king', 'black', 'delta'], b: 'k' })

groups.link({ a: ['queen', 'white', 'delta'], b: 'Q' })
groups.link({ a: ['queen', 'black', 'delta'], b: 'q' })

groups.link({ a: ['rook', 'white', 'delta'], b: 'R' })
groups.link({ a: ['rook', 'black', 'delta'], b: 'r' })

groups.link({ a: ['bishop', 'white', 'delta'], b: 'B' })
groups.link({ a: ['bishop', 'black', 'delta'], b: 'b' })

groups.link({ a: ['knight', 'white', 'delta'], b: 'N' })
groups.link({ a: ['knight', 'black', 'delta'], b: 'n' })

groups.link({ a: ['pawn', 'white'], b: 'P' })
groups.link({ a: ['pawn', 'black'], b: 'p' })


console.log( groups.toString() )

const q1 = { a: ['black', 'king'], b: '*'}
const q2 = { a: ['white', 'king'], b: '*'}

console.log(q1, groups.select(q1))
console.log(q2, groups.select(q2))








