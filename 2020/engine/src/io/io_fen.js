
/**
 * positions FEN strings handler package
 * 
 * FEN: see Forsyth-Edwards Notation
 * is a way to describe a game position in few characters
 */
export const create_io_fen = (position) => {



    const read_placements = (record) => {
        const cols = '12345678'.split('')
        const rows = 'hgfedcba'.aplit('')

        let chars = record.split('')
        let col
        let row
        let ref = 'h1'

        chars.map((char, chidx) => {

            

        })
    }


    const load = (fen_str) => {
        const records = fen_str.split(' ')

        read_placements(records[0])
        
    }

    const dump = (selector) => {}

    const digest = (selector) => {}

    return { dump, load, digest }
}

