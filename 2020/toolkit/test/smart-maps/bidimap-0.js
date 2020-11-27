
import { create_bidimap } from '../../src'

const bdm = create_bidimap()

const ia = 'a0,a1,a2,a3,a4'.split(',')
const ib = 'b0,b1,b2,b3,b4'.split(',')

const mappings = []

ia.map((a) => {
    ib.map((b) => {
        const data = [a, b].join('-')
    
        mappings.push({ pair: { a, b}, data })
        bdm.link({ a, b }, data)
    })
})

console.log('##### MAPPINGS TEST #####')

const query =  { a: ['a0', 'a1'], b: ['b3', 'b4'] }
console.log(query)
console.log(bdm.select(query))
