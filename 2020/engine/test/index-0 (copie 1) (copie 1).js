
import './core/refs.js' 
import { create_engine } from '@engine'

const separate = () =>  console.log('\n###########\n')

const engine = create_engine ({
    log_level: 0
})

const futures = engine.get_futures()

console.log (''  + engine)

console.log({ futures }, futures.length)

//separate()
console.log ('#####', 'engine.play')
//separate()

// from wikipedia (mat de Legal, 1715)
const sequence = "e2:e4 e7:e5 f1:c4 d7:d6 g1:f3 c8:g4 b1:c3 g7:g6 f3:e5 g4:d1 c4:f7 e8:e7 c3:d5"

let moves = sequence.split(' ')
// const moves = []
// moves = moves.slice(0, 4)

moves.map((move, midx) => {
    try {
        console.log('== playing: ' + midx + ' ' + move + ' ======')
        engine.play(move)
        console.log('' + engine)
    } catch(error) {
        console.log('ERROR!')
        throw new Error(error)
    }
}) 





