
import { create_bidimap } from '../../src'

const bdm = create_bidimap()

const ingrs = (x) => '    * ' + x.pair.a + ' contains ' + x.pair.b

bdm.link({ a: ['margharita','reina', 'napolitana'], b: ['tomato', 'cheese'] })
bdm.link({ a: 'reina', b: ['ham', 'egg', 'mushrooms'] })
bdm.link({ a: 'napolitana', b: 'pepperoni'})

console.log('BiDiMap test: some pizzas and thier ingredients')

console.log('What are the ingredients of reina ?')
console.log(bdm.select({ a: 'reina', b: '*' }).map(ingrs))

console.log('What are the ingredients of napolitana ?')
console.log(bdm.select({ a: 'napolitana', b: '*' }).map(x => x.pair))

console.log('Which pizza contains tomato ?')
console.log(bdm.select({ a: '*', b: 'tomato' }))

console.log('Which pieezs contains both tomato and cheese ?')

console.log('schema tomato then cheese')
console.log(bdm.select({ a: '*', b: ['tomato', 'cheese'] }))

console.log('schema then tomato then')
console.log(bdm.select({ a: '*', b: ['cheese', 'tomato'] }))



