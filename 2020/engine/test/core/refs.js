
import { refs } from '../../src/core/refs.js'

console.log('testing refs')

console.log(refs)

console.log('a1'.sequence({ col: 1, row: 1}, true).join(','))
console.log('a8'.sequence({ col: 1, row: -1}, true).join(','))
console.log('h1'.sequence({ col: -1, row: 1}, true).join(','))
console.log('h8'.sequence({ col: -1, row: -1}, true).join(','))