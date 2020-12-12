
import toolkit from '@toolkit'
import { create_position } from '../game/position.js'
import { log, debug } from '../utils/logger.js'

export const create_context = (options) => {

    const trie = toolkit.create_trie({})
    let current_path = ''
    
    const toString = () => {
        let text = ''
        let current_position = trie.value (current_path)
    
        text += current_position.prettified() + '\n'
        text += 'path: '  + current_path + '\n'
        text += 'futures: ' + '#' + get_futures().length + '.\n'
    
        text += 'illegals: ' + get_futures().filter((subpath) => {
            const { flags } = peek(current_path + '/' + subpath )

            return flags.get_pair('is-legal').value === false
        }).map((subpath) => {
            return 'ILLEGAL; ' + subpath
        }).length
    
        text += '\n'

        return text
    }

    const setup = (position) => {
        trie.attach('', '#init!', position)
        current_path += '#init!'
    }
    
    const fork = (selector, subpath, is_gas) => {
        const src = trie.value(selector)
        let dest = null
        
        if(!src) return null

        dest = create_position(src)
        dest.flags.set_pair('is-gas', is_gas)
        trie.attach(selector, subpath, dest)

        return dest
    }

    const peek = (selector) => {
       //  log('# context.peek, with selector: ' + selector)
        
        return trie.value (selector)
    }

    const get_futures = (options = {}) => {
        // return trie.subpaths(current_path)
        const subpaths = trie.subpaths(current_path)
/*
        return subpaths.filter((subpath, sidx) => {
            const selector = [current_path, subpath].join('/')
            const position = peek(selector)
            const { flags } = position
            const legal_check = flags.get_pair('is-legal').value

//            console.log({ [sidx]: legal_check })

            return legal_check === true
        })
*/

        return subpaths
    }

    
    const push = (subpath) => {
        // history.push(subpath)
        current_path += '/' + subpath
        
    }

    const pop = (selector) => {
    
    }

    const cutoff_branchs = (selector) => {
        return 0
    }

    ///
    /// WARNING
    /// possible performance bugs if depth is to big !
    /// depth should be less than 4
    /// Math.pow(40, 4) = 25600000...
    ///
    const stupid_subpaths = (basepath, depth, aperture = 1) => {
        const range = (new Array(aperture)).fill(null)

        let lists = [
            [basepath]
        ]

//        console.log('ctx.stupid_subpaths')
//        console.log('    depth = ' + depth )
//        console.log('    aparture = ' + aperture )
//        console.log('    basepath = ' + basepath )

        if(depth >= 0) {
            range.map((_, idx) => {
                const nexties = []

                lists[idx].map((path) => {
                    trie.subpaths(path).map((subpath) => {
                        nexties.push(path + '/' +subpath)
                    })
                })

                lists.push(nexties)
            })

            
        } else {
            lists = [[], ['#init!']]
        }

        console.log({ stupid_subpaths: lists })
//        return lists.slice(depth, aperture)
        return lists    
    }

    /// you'd better to implement that:
    const search_iterator = (subpath, depth) => {
        //
        // a probe is a singe property bag
        // let probe = {
        //      max: 0,         // number of subpaths
        //      subpaths: []    // supathsd list
        //      idx: 0          // currently visited subpath
        // }
        //
        const v_probes = new Array(depth)

        const next = () => {}
        const rewind = () => {}

        return { next, rewind }
    }
    
    const api = {
        setup, push, pop,
        fork, peek,
        get_futures, 
        toString,
        cutoff_branchs,
        stupid_subpaths
    }

    // API getter: current_path
    Object.defineProperty(api, 'current_path', {
        get: () => current_path
    })

    // API getter: current_position
    Object.defineProperty(api, 'current_position', {
        get: () => trie.value(current_path)
    })

    return api
}
