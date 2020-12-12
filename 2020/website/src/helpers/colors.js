
const raw_hexcodes_string = `
#008000
#ffffff
#ffffff
#ffffff
#000000
#cc8080
#ccaaaa
#ccaaaa
#000000
#800000
#aa4000
#aa4000
#000000
#800000
#aa4000
#aa0000
`

const hexcodes = raw_hexcodes_string.split('\n')
    .filter(str => str.length > 0)
    .slice(0, 16)

// console.log({ hexcodes })

const clamped = (value) => {
    const range = [0, 1, 2, 3]
    const vidx = range.indexOf(value)

    return (vidx > -1) ? range[vidx] : 3
}


export const get_color = (balance) => {
    const bidx = clamped(balance.black)
    const widx = clamped(balance.white)
    const idx = 4 * bidx + widx


//    console.log({ balance, [idx]: hexcodes[idx] })

    return hexcodes[idx]
}

