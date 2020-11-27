
// let's define the various board dimensions ranges
const NORMAL_COLS = '-abcdefgh+'.split('')
const REVERT_COLS = '+hgfedcba-'.split('')
const NORMAL_ROWS = '-12345678+'.split('')
const REVERT_ROWS = '+87654321-'.split('')

const cols = (direction) => {
    if(direction === 1)
        return NORMAL_COLS

    if(direction === -1)
        return REVERT_COLS

    return []
}

const rows = (direction) => {
    if(direction === 1)
        return NORMAL_ROWS

    if(direction === -1)
        return REVERT_ROWS

    return []
}

// strategy for north and south povs 
const v_cell = (def) => {
    const ref = [def.i, def.o].join('')
    const col = def.i
    const row = def.o
    const cidx = def.iidx
    const ridx = def.oidx
    const cell = { ref, col, row, cidx, ridx }

    return cell
}

// strategy for east and west sides (v_cell transposed)
const h_cell =  (def) => {
    const ref = [def.o, def.i].join('')
    const col = def.o
    const row = def.i
    const cidx = def.oidx
    const ridx = def.iidx
    const cell = { ref, col, row, cidx, ridx }

    return cell
}



const create_iterator = (extended) => (outer, inner, strategy) => (callback) => {
    const results = []

//    console.log('create_iterator')
//    console.log({ callback })
    
    // loops through dimensions
    outer.map((o, oidx) => {
         inner.map((i, iidx) => {
            const cell = strategy({ o, i, oidx, iidx })

            if(extended === false) {
                if(oidx < 1) return null
                if(oidx > 8) return null
                if(iidx < 1) return null
                if(iidx > 8) return null
            }

            results.push({ cell, result: callback(cell) })
        })
    })

    return  results
}

// * the povs definitions, loops and strategies */

// the 'none' point of view
// just all refs inside board
const none = (extended) => {
    const iterator = create_iterator(false)

    return { iterate: iterator(rows(1), cols(1), v_cell ) }
}

const north = (extended) =>  {
    const iterator = create_iterator(extended)

    return { iterate:  iterator(rows(1), cols(-1), v_cell ) }

}

const south = (extended) => {
    const iterator = create_iterator(extended)

    return { iterate: iterator(rows(-1), cols(1), v_cell ) }
}

//@TODO tranpose for east and west !

export const get_pov = (name, extended = false) => {
//    console.log({ name })
    switch(name) {
        case 'north': 
            return north(extended)
        break

        case 'south': 
            return south(extended)
        break

        case 'none': 
        case null:
        case undefined:
            return none()
        break

        default:
            return { error: '#name!'}
        break
    }
}

