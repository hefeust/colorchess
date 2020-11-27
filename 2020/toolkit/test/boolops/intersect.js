

import { intersect } from '../../src'
/*
const arr1 = [-5,0,5]
const arr2 = [-5,-4,-3,3,4,5]
*/
const MAX_LENGTH = 500000

const dump_array = (arr) => '[list length = ' + arr.length + '] ' + arr.join(' ')  

const arr1 =  (new Array(MAX_LENGTH)).fill(1).map((_, idx) => {
    return Math.floor(MAX_LENGTH  * Math.random())
}).sort((x, y) => x - y)

const arr2 = (new Array(MAX_LENGTH)).fill(1).map((_, idx) => {
    return Math.floor(MAX_LENGTH  * Math.random())
}).sort((x, y) => x - y)

const t0 = Date.now()
console.log('-----------')
const slow = intersect(arr1, arr2)
console.log('-----------')
const t1 = Date.now()
// const fast = fast_intersect(arr1, arr2)
console.log('-----------')
const t2 = Date.now()

const dt_slow = ((t1 - t0) / 1000)
//const dt_fast = ((t2 - t1) / 1000)

// console.log(dump_array(arr1))
// console.log(dump_array(arr2))
// console.log(dump_array(slow))
//console.log(dump_array(fast))

console.log({ 
    arr1: arr1.length, 
    arr2: arr2.length,
    slow: slow.length
//    fast: fast.length
})
//console.log(`time: ${dt} seconds`)
//console.log({ dt_slow, dt_fast })
console.log({ dt_slow })

