
const raw_hexcodes_string = `
#00dd9a
#90ee90
#98fa98
#ffffff
#7f887f
#eebbcd
#ffeee0
#ffa4c4
#005500
#802800
#ff4500
#ff7f50
#000000
#660000
#881122
#cd3333
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


    console.log({ balance, [idx]: hexcodes[idx] })

    return hexcodes[idx]
}

