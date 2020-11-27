
export const COLS = 'abcdefgh'.split ('')
export const ROWS = '12345678'.split ('')
export const REV_COLS = 'hgfedcba'.split ('')
export const REV_ROWS = '87654321'.split ('')
export const NULL_REF = '**'

const _refs = new Map()

String.prototype.ref_as_object = function() {
    const str = this
    const col = str[0]
    const row = str[1]    
    const cidx = COLS.indexOf (col)
    const ridx = ROWS.indexOf (row)    
    const is_valid = () => cidx !== -1 && ridx !== -1

    if (str.length !== 2) return null
    if(str === NULL_REF) return null
    
    
    return {
        col, row,
        cidx, ridx,
        is_valid, str
    }
}

COLS.forEach((col) => {
    ROWS.forEach((row) => {
        const str = '' + col + row
        
        _refs.set(str, str.ref_as_object())
    })
})

String.prototype.move = function(deltas) {
    const obj = this.ref_as_object()
    const str = NULL_REF
    const new_cidx = obj.cidx + deltas.col
    const new_ridx = obj.ridx + deltas.row       
    const new_str = '' + COLS[new_cidx] + ROWS[new_ridx]
  
    return _refs.has(new_str) ? new_str : NULL_REF
}

String.prototype.sequence = function(deltas, iterative) {
    const results = []
    const nloops = iterative ? 7 : 1
    let moved = this
    let i = 0
    
    results.push(moved)
    
    while(i++ < nloops) {
        moved = moved.move(deltas)
        if(moved === NULL_REF) break
        results.push(moved)
    }
    
    return results
}

export const refs = Array.from(_refs.keys())
