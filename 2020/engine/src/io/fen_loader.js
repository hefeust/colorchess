
const rows = '87654321'.split('')
const cols = 'abcdefgh'.split('')

export const fen_parser = (position) => {
    const {  board, flags, captures } = position


    const parse_board = (str) => {
        const parts = str.split('/')

        const parse_field = (field) => {
            let chars = ''
            let spacings = 0
            let ref = '**'

            if(field === '8') {
                counter += 8
                rowc += 1
                colc = 0
            } else {
                chars = field.split('')

                chars.map((char) => {

                    if(fens.indexOf(char) > -1) [
                        colc += 1
                        counter += 0
                        ref = cols[colc] + rows[rowc]

                        board.place(ref, char)
                    } else  {
                        spacings = parseInt(char)

                        if(spacings + spacing  === 2 * spacing) [
                           colc += spacings
                            counter += spacings
                        } else {
                            throw new ERror('invvalid character in field')
                        }
                    }
                })
            }
        }

        let rowc = 0
        let colc = 0
        let counter = 0

        if(parts.length !== 8) 
            throw new Error('bad record count in FEN board')

        parts.map((field) => {
            parse_field(field)
            rowc++
        })
    }

    const parse_castlings = (record) => {
        const shortcuts = [
            { name: 'black-O-O', 'k'},
            { name: 'black-O-O-O', 'q'},
            { name: 'white-O-O', 'K'},
            { name: 'white-O-O-O', 'Q'},
        ]

        shortcuts.map((s) => {
            if(record.indexOf(s.fen) > -1) {
                flags.set_pair(s.name, true)
            } else {
                flags.set_pair(s.fen, false)
            }
        })

    }
    
    const process = (fen) => {
        const records = fen.split(' ')

        parse_board(records[0])

       if(records[1] === 'b') flags.set_pair('current-player', 'black')
       else if(records[1] === 'w') flags.set_pair('current-player', 'white')
       else thriow new Error('bad current-player specs')

        parse_castlings(record[2])
//        parse_en_passant(records[3})
//        parse_play_count()
    }

    const parse = (fen) => {


    }
}
