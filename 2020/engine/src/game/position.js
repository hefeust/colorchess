
import { create_board } from '../core/board.js'
import { create_flags } from '../core/flags.js'
import { create_captures } from '../core/captures.js'
import { create_raycaster } from '../game/raycaster.js'

export const create_position = (other) => {
    const board = other ? other.board.fork() : create_board()
    const flags = other ? other.flags.fork() :create_flags()
    const captures = other ? other.captures.fork() : create_captures()        
    const raycaster = create_raycaster()

    const toString = () => {
//        console.log ('position.toString')
//        console.log (board)
    
        return [
            board, captures, flags
        ].join('\n')
    }

    const prettified = () => {
        const lines = []
        const spaces_8 = ' '.repeat(8)
        const newlines_8 = (spaces_8 + '\n').repeat(8).split('\n').slice(0, 8)
        const board_lines = board.toString().split('\n').concat(newlines_8).slice(0, 16)
        const flags_lines = flags.toString().split('\n').concat(newlines_8).slice(0, 16)

        lines.push(('#### Colorchess position (pretty print) ####').padEnd(64, ' '))
        lines.push(spaces_8.repeat(8))

        for(let i = 0; i < 16; i++) {
            lines.push(((spaces_8 + board_lines[i]).padEnd(32, ' ') + flags_lines[i]).padEnd(64, ' '))
        }

//        lines.push('')
//        lines.push('Captured:')
//        lines.push('White:  ')
//        lines.push('Black:  ')

        lines.push(captures.toString())
    
        return lines.slice(0, 21).join('\n')
    }

    const api = {
        toString, prettified
    }
    
    Object.defineProperty(api, 'board', { 
        get: () => board 
    })
    
    Object.defineProperty(api, 'flags', { 
        get: () => flags 
    })

    Object.defineProperty(api, 'captures', { 
        get: () => captures 
    })
    
   Object.defineProperty(api, 'raycaster', { 
        get: () => raycaster 
   })


    return api
}
