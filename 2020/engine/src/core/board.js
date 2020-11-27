
import { log, debug} from '../utils/logger.js'

import { create_bidimap } from '@toolkit'
import { refs, COLS, REV_ROWS } from '../core/refs.js'
import { groups } from '../core/groups.js'

export const create_board = (options) => {

    // bidiamp
    // *   a-relation-side: piece
    // *   b-relation-side: ref
    const locations = create_bidimap()

    const whois = (ref) => {
        const results = locations.select({
            a: '*', b: ref
        })        

        if(results.length > 1) 
            throw new Error('/!\ board.whois: 0 or 1 piece at same time on a ref...')

        // empty board tile
        if(results.length === 0) return null

        return results[0].pair.a
    }

    const place = (ref, piece) => {
        const fen = piece ? (piece.fen || piece) : null

        // bugfix 20201010 in make_delta_moves #target_ref
        // console.log({ref, piece })

        debug('## board.place: ' + ref + ' ' + fen)

        if(refs.indexOf(ref) === -1) 
            throw new Error('/!\ board.place; unexisting ref ?' + ref)

        if(!piece) 
            return null
//            throw new Error('/!| board.place: attempting to place NULL piece at ref = ' + ref)

        locations.link({
            a: fen, b: ref
        })

    }

    const remove = (ref) => {
        const fen = whois(ref)

        debug('board.remove ref =' + ref)

        if(refs.indexOf(ref) === -1) 
            throw new Error('/!\ board.remove; unexisting ref ?' + ref)

        if(fen) {
            locations.unlink({
                a: fen, b: ref
            })  
        }
    }

    const arrayize = (value)  => {
        if(value === undefined) return []
        if(Array.isArray(value)) return value

        return [value]    
    }

    // a-relation-side: group names
    // b-relation-side: group qualities (FEN form)

    /// BUG: 2020-11-20
    ///     when multiple groups are specified, 
    ///     performs logical OR
    ///     instead of a logical AND
    /// @see toolkit/src/smart-maps/bidimap.js for details
    ///     (needs to recompile toolkit !)
    const select = (group_names) => {
        const gna = arrayize(group_names)
        const fens = groups.select({ a: gna, b: '*' }, true)
        const results = []

//        log('# board select ')
        log('# board.select: ' + gna.join(', '))
//        debug({ gna })

//        console.log( fens )
//        debug({ pair: fens.map((r) => r.pair) })
        //debug('' + locations)

        fens.map((res) => {
            // in fens group bidimap sleection reslults
            // a-relation-side: group names
            // b-relation-side: group qualities (FEN form)            
            const fen = res.pair.b

            // in locatiions bidimap
            //  a-relation-side: quality (FEN form)
            //  b-relation-side: ref

            const locs = locations.select({ a: fen, b: '*' }).map((r) => r.pair.b)

            results.push(...locs)
        })

        log('found refs: count = ' + results.length)
        debug({ results })

        return results
    }

    /// dirty version ???
    const select2 = (group_names) => {
        const lists = arrayize(group_names).map((gn) => {
            const results = groups.select({ a: gn, b: true })
//            console.log(results)
            return results.map(res => res.pair.b)
        }) 

        console.log(lists)

        return []
    }

    const fork = () => {
        const forked = create_board()

        log('# board.fork')

        refs.map ((ref) => {
            forked.place(ref, whois(ref)) 
        })
       
        return forked
    }

    const toString = () => {
        const texts = ['### BOARD ###', '']
        const EXPANDED_COLS = ['-'].concat(COLS).concat(['+'])
        const EXPANDED_ROWS = ['+'].concat(REV_ROWS).concat(['-'])        

        EXPANDED_ROWS.forEach((row) => {
            const line = []
        
            EXPANDED_COLS.forEach((col) => {
                const ref = col + row
//                const piece = locations.has(ref) ? locations.get(ref) : '.'
                const piece = whois(ref)

                let slot = '. '
                
                if (['--', '-+', '+-', '++'].indexOf(ref) > -1) {
                    slot = '# '
                } else if(['-', '+'].indexOf(ref[0]) > -1) {
                    slot =  ref[1] + ' ' 
                } else if(['-', '+'].indexOf(ref[1]) > -1) {
                    slot =  ref[0] + ' '
                } else if(piece) {
                    slot = piece + ' '
                }
                
                line.push(slot)
            })        
            
            texts.push(line.join(''))
        })
        
        return texts.join('\n') + '\n'
    }

    const api = {
        whois,
        place,  
        remove, 
        select, 
        fork,
        toString
    }

    return api
}

