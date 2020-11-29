
import { setup_log_level, SILENT, LOG, DEBUG } from './utils/logger.js'
import { create_context } from './game/context.js'
import { create_generator } from './game/generator.js'
import { ops_setup } from './ops/setup.js'
import { ops_play } from './ops/play.js'
import { ops_undo } from './ops/undo.js'

/**
 * ColorChess engine factory
 * 
 * @param Object options
 * @returns ColorChess engine API object instance
 *
 *
 * options key/value pairs:
 * - debug: String "silent" "log" "debug"
 */
export const create_engine = (options) => {

    /* gamep operations (ops) */

    /**
     *  setup colorchess
     *  @see ./ops/setup.js for details
     */
    const setup = () => {
        return ops_setup (ctx, generator, options)
    }

    const play = (move) => {
        return ops_play(ctx, generator, move)
    }
        
    const undo = (steps_count = 1) => {
        return ops_undo (ctx, steps_count)
    }
    
    /* game state getters */

    /**
     *    whois (chessman) on tile identified by ref ? 
     */
    const get_whois = (ref) => {
        const position = ctx.current_position

        return position.board.whois(ref)
    }

    /**
     *    get pressions balance  on tile identified by ref
     */
    const get_pressions = (ref) => {
        const position = ctx.current_position

        return position.raycaster.get_pressions(ref)
    }
    
    /*
    * game flag for name
    * @see./core/flags.js for details
    */
    const get_flag = (name) => {
//        const position = ctx.current_position
        
//        return position.flags.get_pair(name).value
        return ctx.current_position.flags.get_pair(name).value
    }

    const get_flags_pairs = () => {
        const position = ctx.current_position

        return position.flags.get_all_pairs( )
    }

    /**
     * captures list for given side
     */
    const get_captured_by = (side) => {
        const { captures } = ctx.current_position

        return captures.get_captured_by(side)
    }
    
    /**
    * game state stringification
    *
    * @returns String
    */
    const toString = () => {
//        return ['ColorChess engine 2020', ctx].join ('\n\n')
        return ctx.toString()
    }

    const prettified = () => {
        const position = ctx.current_position

        return position.prettified()
    }

    const get_futures = () => {
        return ctx.get_futures()
    }

    const metrics = (name, params) => {
        console.log('get_metrics: ' + name)
    }

    /**
    * game context { board, captured, flags }
    */
    const ctx = create_context (options || {})

    /**
    * moves generator
    */
    const generator = create_generator (ctx)
    
    /* game API */
    const api = {
        play,
        undo,
        get_whois,
        get_pressions,
        get_flag,
        get_captured_by,
        get_flags_pairs,
        toString,
        prettified,
        get_futures
    }

    setup_log_level (options.log_level || SILENT)
    setup ()
   
    return api
}

