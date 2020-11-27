
import { log, debug } from '../utils/logger.js'
import { cast_delta_moves } from '../rules/cast-delta-moves.js'
import { make_delta_moves } from '../rules/make-delta-moves.js'
import { cast_pawn_moves } from '../rules/cast-pawn-moves.js'
import { make_pawn_moves } from '../rules/make-pawn-moves.js'
import { cast_castling_moves } from '../rules/cast-castling-moves.js'
import { make_castling_moves } from '../rules/make-castling-moves.js'
import { test_checkings } from '../rules/test-checkings.js'
import { test_ending } from '../rules/test-ending.js'
import { ply_turn } from '../rules/ply-turn.js'

// @TODO !!!
// importing { filty_moves } from '../rules/filthy_moves.js'

/*
    I+0: SELECT MOVE
    ...: (skip)
    I+4: makes
    I+4: ply-turn
    I:5: casts
    I+5: test-checkings
    I+5: test-filthy-moves
    I+4: test-ending
    I+4: CLEANUP
*/

export const create_generator = (ctx) => {

    // @TODO: MUST be in context
    const history = []

    // map of <subpath> => array<subpaths.descendants>

    // suing directluy the trie tree inside context ???    
    // !start! => [x0, x1,  ..., xn]
    // #start!x0 => []
    const lookup = new Map()
    
    // cleans dead postions in lookup
    const cleanup = (ctx, options) => {
        const { selector } = options
        const { flags} = ctx.peek(selector)

        if(flags.get_pair('is-legal') === false) {
            // ctx.cutoff(selector)
        }
    }

    const pipeline = [
        { 
            name: 'make-delta-moves',
            action: make_delta_moves, 
            work_on: 'present'
        },  { 
            name: 'make-pawn-moves',
            action: make_pawn_moves, 
            work_on: 'present'
        },  { 
            name: 'make-castling-moves',
            action: make_castling_moves,
            work_on: 'present'
        }, {
            name: 'ply-turn',
            action: ply_turn,
            work_on: 'present'
        },

/*
    {
        name: 'test-filty-moves',
        action: test_filthy_moves,
        subject: 'future'
    },
*/
        { 
            name: 'cast-delta-moves',
            action: cast_delta_moves,
            work_on: 'futures'
        }, { 
            name: 'cast-pawn-moves',
            action: cast_pawn_moves,
            work_on: 'futures'
        }, { 
            name: 'cast-castling-moves',
            action: cast_castling_moves,
            work_on: 'futures'
        }, { 
            name: 'test-checkings',        
            action: test_checkings,
            work_on: 'present'
        }, { 
            name: 'test-ending',
            action: test_ending,
            work_on: 'present'
        }, { 
            name: 'cleanup',    
            action: cleanup,
            work_on: 'futures'
        }
    ]

    // depth: positive number
    // work-on: 'present', or 'future

//            paths.rewind()
//            while (selectors.has_next()) {
//                const selector = selector.get_next()
//                const options = { selector }
//           }            
//

    const iterate = (depth) => {

        pipeline.map((rule, ridx) => {
            const { action, work_on } = rule
            let paths = []
            let basepath = history.join('/')

//            console.log({ basepath })

            if(depth >=0) {
                // console.log({ work_on, history })
                
                if(work_on === 'present') {
                    paths = [basepath]
                } else {
                    paths = ctx.get_futures().map((subpath) => {
                        return basepath + '/' + subpath
                    })
                }
            } else {
                if(work_on === 'present') {
                    paths = []
                } else {
                    paths = ['#init!']
                }
            }
            
//            console.log('generator.iterate', { basepath })
            // console.log('iterate: rule ridx=' + ridx + ' name=' + rule.name)

//                console.log('generator.iterate', { paths: paths.length })

                paths.map((selector) => {
                    const options = { selector }

//                    console.log('action: ', { selector }, '')
                    action(ctx, options)
                })

            // console.log('...')
        })

        // depth++    
    }

    // selector <-- path + '/' + subpath
    const setup = () => {
        depth = -1
        iterate({ depth})        
        depth = 0
        history.push('#init!')
        iterate(depth)        
        
    }

    const process = (options) => {
        const { selector } = options

        depth++

        history.push(selector)

//        iterate({ depth, present })        
        iterate(depth)
    }

    let depth = -1

    return {
        setup, process
    }   
}

