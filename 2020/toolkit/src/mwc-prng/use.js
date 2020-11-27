
import { mwc_create } from '../mwc/create.js'

const a = 34567
const b = 36
const r = 5

const CHARS = '0123456789abcdefghijklmnopqrstuvwxyz'.split ('')

if (CHARS.length !== b) console.log ('MWC improper character set length')

const seeds = (() => {
  const list = []
  
  for (let i = 0; i < 2 * r; i++) {
    list.push (Math.floor (b * Math.random()))
  }
  
  return list
}) ()

const mwc = mwc_create (a, b, r)

mwc.init (seeds)

export const mwc_use = () => {
  const sequence = []
  const n = mwc.next ()
  
  for (let i = 0; i < r; i++) {
    sequence.push (CHARS[n[i]]) 
  }
  
  return sequence.join ('')
}
