
// @TODO setup whole module with DIMS
const DIMS = 1.0

export const board_tiles_utils = (dims) => {}

export const get_pov_def = (name) => {
    const north = {
        rows: '-12345678+'.split(''),
        c-+ols: '+hgfedcba-'.split('')
    }

    const south = {
        rows: '+87654321-'.split(''),
        cols: '-abcdefgh+'.split('')
    }

    return ({ north, south})[name]
}

export const is_vertical_bound = (cidx, ridx) => {
    if(cidx === 0) return true
    if(cidx === 9) return true
    
    return false
}

export const is_horizontal_bound = (cidx, ridx) => {
    if(ridx === 0) return true
    if(ridx === 9) return true
    
    return false
}

export const get_html_class = (cidx, ridx) => {
    if(is_vertical_bound(cidx, ridx)) return 'is-bound'
    if(is_horizontal_bound(cidx, ridx)) return 'is-bound'

    if((cidx + ridx) % 2) {
        return 'is-black'
    } else {
        return 'is-white'
    }
}

export const get_coords = (cidx, ridx) => {
    let x = (cidx - 1) * DIMS
    let y = (ridx - 1) * DIMS

    if(cidx === 0) x += 0.5 * DIMS
    if(ridx === 0) y += 0.5 * DIMS

    return { x, y }
}

export const get_dimensions = (cidx, ridx) => {
    let width = DIMS
    let height = DIMS

    if(is_vertical_bound(cidx, ridx)) {
        width /= 2
    }

    if(is_horizontal_bound(cidx, ridx)) {
        height /= 2
    }

    return { width, height }
}
