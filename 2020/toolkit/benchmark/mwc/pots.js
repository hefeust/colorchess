
import { create_mwc } from '../../src/mwc-prng/create.js'

const MAX_POTS =  1024 * 1024
const POT_SIZE = 16 * 1024
const STEP = 16 * 1024
const N_LOOPS = MAX_POTS * POT_SIZE
const POTS = new Array(MAX_POTS)
const EMPTIES = new Array()
const CLASHES = new Array()

const pot_number = (x) =>  Math.floor(x / POT_SIZE)

const emptyness = (pots) => {
    const empties = pots.reduce ((acc, pot) => pot === 0 ? acc + 1: acc , 0)

    return empties / MAX_POTS
}

const overhelms = (pots) => {
    const fullfilled = pots.reduce (
        (acc, pot) => (pot >= 0.5 * POT_SIZE) ? acc + 1 : acc
    , 0)

    return fullfilled / MAX_POTS
}

let idx = 0
let value = 0
let text = '' 

const mwc = create_mwc(12345, 64, 4)

console.log ('init MWC')

mwc.init ([1, 3,5,7,9,11,13, 15])

POTS.fill(0)

console.log ('LOOPING')

for (let t = 0; t < N_LOOPS; t++) {

    if(t % STEP === 0)  {
        text = ['trial:', t, ', ', (t/ N_LOOPS).toFixed(5), '%'].join(' ')
        console.log(text)
    }
    
    value = mwc.next ()           
    idx = pot_number(value)
    POTS[idx]++

    if(t % STEP === 0)  {
//        EMPTIES.push(emptyness(POTS))
//        CLASHES.push(overhelms(POTS))
        
        text = ['empties', emptyness(POTS),'\t', 'overhelms:', overhelms(POTS)].join(' ')
        console.log (text)
    }
}

