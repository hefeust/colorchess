
export const get_pov_def = (name) => {
    const north = {
        rows: '-12345678+'.split(''),
        cols: '+hgfedcba-'.split('')
    }

    const south = {
        rows: '+87654321-'.split(''),
        cols: '-abcdefgh+'.split('')
    }

    return ({ north, south})[name]
}
