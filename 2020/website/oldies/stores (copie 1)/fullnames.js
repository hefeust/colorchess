
const defs = new Map()
const list = []

defs.set('k', 'black-king')
defs.set('K', 'white-king')
defs.set('q', 'black-queen')
defs.set('Q', 'white-queen')
defs.set('r', 'black-rook')
defs.set('R', 'white-rook')
defs.set('b', 'black-bishop')
defs.set('B', 'white-bishop')
defs.set('n', 'black-knight')
defs.set('N', 'white-knight')
defs.set('p', 'black-pawn')
defs.set('P', 'white-pawn')

Array.from(defs.keys()).map((key) => {
    list.push(defs.get(key))
})

export const fullname = (fen) => defs.get(fen)

export const fullnames_list = list



