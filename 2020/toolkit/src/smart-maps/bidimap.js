
import { intersect } from '../boolops/intersect.js'

// const arrayize = (value) => Array.isArray(value) ? value : [value]

// this function replace a value by its arrayisation
// - if value is undefined, return an empty array
// - if value is an array, returns the array
// - if value is another, piut it as single elemùent array
const arrayize = (value) => {
    if(value === undefined) return []
    if(Array.isArray(value))
        return value
    else
        return [value]
}

/**
    create and returns a Biirectional Map
    - no parameters needed
*/
export const create_bidimap = () => {

    // left side  (a) uids lookup
    // Map <key> => <array_of_uids >
    const a_lookup = new Map()
    
    // right side (b) uids lookup
   // Map <key> => <array_of_uids >
    const b_lookup = new Map()
    
    // Map <uid => association_pair>
    const pairings = new Map()

    const count_matching_cnx = (pair) => {
        const a_pairs = arrayize(a_lookup.get(pair.a))
        const b_pairs = arrayize(a_lookup.get(pair.b))        
        const isect = intersect(a_pairs, b_pair)
        let count = 0

        if(isect.length === 0) return 0
        
        isect.map((uid) => pairings.get(uid)    ).map((some_pair) => {
            if(pair.a === some_pair.a && pair.b === some_pair.b)
                count++

        })

        
        return count
    }
    
     const get_matching_cnx = (parts) => {
        // mock!
        return null
    }

    // setup an association pair
    const set_matching_pair = (pair, data) => {
        const a_uids = arrayize(a_lookup.get(pair.a))
        const b_uids = arrayize(b_lookup.get(pair.b))        
//        const isect = intersect(a_uids, b_uids)
        let chunk = { pair, data }        
        let uid = ++UID

        a_lookup.set(pair.a, a_uids.concat(uid))
        b_lookup.set(pair.b, b_uids.concat(uid))
        pairings.set(uid, chunk )
    }


    // setup an association pair
    // @TODO: remove pairs with joker '*'
    const remove_matching_pair = (pair) => {
        const a_uids = arrayize(a_lookup.get(pair.a))
        const b_uids = arrayize(b_lookup.get(pair.b))        
        const isect = intersect(a_uids, b_uids)
        let uid = null
        
//        console.log({ a_uids, b_uids, isect })
//        console.log( pairings )

        if(a_uids.length === 0) return null
        if(b_uids.length === 0) return null
        if(isect.length === 0) return null         

        isect.map((uid) => {
            const a_uid_idx = a_uids.indexOf(uid)
            const b_uid_idx = b_uids.indexOf(uid)

            pairings.delete(uid)

            if(a_uid_idx > -1) a_uids.splice(a_uid_idx, 1)
            if(b_uid_idx > -1) b_uids.splice(b_uid_idx, 1)
        })
    }

    // link the two sides <a, b> holding an optional data
    const link = (pair, data) => {
        const a_selectors = arrayize(pair.a)        
        const b_selectors = arrayize(pair.b)                

        a_selectors.map((a) => {
            b_selectors.map((b) => {
                set_matching_pair({ a, b }, data)
            })
        })
    }
    
    // break a existing pairing link
    // @TODO: remove pairs with joker '*'
    const unlink = (pair) => {
        const a_selectors = arrayize(pair.a)        
        const b_selectors = arrayize(pair.b)                

        a_selectors.map((a) => {
            b_selectors.map((b) => {
                remove_matching_pair({ a, b })
            })
        })        

        return null
    }

    // colects uids inside lookup according to selector(s)

    /// BUG: 2020-11-20
    /// performs and logical OR instead of a logical AND  !!!
    ///
    /// added: conjunction parameter
    const collect = (lookup, selectors, conjunction = false) => {
/*
        // this works for pizzas, but not for chess !
        return selectors.map((selector) => {
            const uids = arrayize(lookup.get(selector))

            return uids
       }).reduce((acc, arr) => acc.concat(arr), [])
*/

        // that worked with pizzas too

        const results = []
        const scores = new Map()

        const lists = selectors.map((selector) => {
            const uids =  arrayize(lookup.get(selector))

            return uids
        })

        lists.map((uids) => {
            uids.map((uid) => {
                const pair = pairings.get(uid)
                const score = scores.has(uid) ? scores.get(uid) : 0

                scores.set(uid, 1 + score)
            })
        })

//         console.log(a_lookup)
//         console.log(b_lookup)
//        console.log(a_lookup.get('king'))
//        console.log(a_lookup.get('white'))

//        console.log('pairings:', pairings)

//        console.log('scores:', scores)

        const keys = Array.from(scores.keys())

//        console.log({ selectors })
//        console.log({ keys })

        keys.map((key) => {
            if(scores.get(key) > 0) results.push(key)
        })

        return results        
    }

    const scored_filtering = (uids_list, criteria, value) =>  {
        const scores = new Map()

        return uids_list.map((uid) => {
            const chunk = pairings.get(uid)
            const pair = chunk.pair
            const score = scores.get(pair[criteria]) || 0
                        
            scores.set(pair[criteria], 1 + score)

            return uid
        }).filter((uid) => {
            const chunk = pairings.get(uid)
            const pair = chunk.pair
            const score = scores.get(pair[criteria]) || 0
                        
            return score === value
        }).reduce((acc, uid) => {
            const chunk = pairings.get(uid)
            const pair = chunk.pair
            const score = scores.get(pair[criteria]) || 0

            if(score > 0) {
                scores.set(pair[criteria], 0)
                acc = [...acc, uid]
            }

            return acc
        }, [])
    }
    
    // test if list of selectors contains a wildcard joker
    const contains_joker = (list) => {
        let i = 0

        while(i <= list.length) {
            if(list[i] === true || list[i] === '*') 
                return true
            i++
        }

        return false
    }

    // slect (query) inside bidirectional map
    // bdm.select({ a: 'a10', b: 'b11' })    
    // bdm.select({ a: 'a10', b: '*' })        
    // bdm.select({ a: '*', b: 'b11' })    
    // bdm.select({ a: ['a1', 'a2'], b: {'b3', 'b4'] })    
    const select = (query, conjunction = false) => {       
         const results = []
        const a_query = arrayize(query.a)
        const b_query = arrayize(query.b)        
        const a_joker = contains_joker(a_query)
        const b_joker = contains_joker(b_query)
        const a_uids = collect(a_lookup, a_query, conjunction)
        const b_uids = collect(b_lookup, b_query, conjunction)        
        let isect = []

        if(a_joker && b_joker) {
            throw new Error('could not dump all links at same time')
        } else if(a_joker) {
            isect = scored_filtering(b_uids, "a", b_query.length)
//            isect = b_uids
        } else if (b_joker) {
            isect = scored_filtering(a_uids, "b", a_query.length)
//            isect = a_uids
        } else {
            isect = intersect(
                scored_filtering(b_uids, "a", b_query.length),
                scored_filtering(a_uids, "b", a_query.length)
            )
        }

        // onsole.log({ a_joker, b_joker, isect })

        isect.map((uid) => {
            results.push(pairings.get(uid))
        })
        
        return results
    }

    const toString = () => {
        const texts = []
        const ac = Array.from(a_lookup.keys()).length
        const bc = Array.from(b_lookup.keys()).length
        const pc = Array.from(pairings.keys()).length

        texts.push('toolkit bidimap')
        texts.push('found a_lookups: count = ' + ac)
        texts.push('found b_lookups: count = ' + bc)
        texts.push('found records: count = ' + pc)

        //console.log(a_lookup)
        //console.log(b_lookup)
        //console.log(pairings)

        return texts.join('\n')
    }
    
    const api = {
        link, 
        unlink, 
        select,
        toString
    }
    
    // UID counter  for pairs
    // @TODO optimsation with MWC generator
    let UID = 0

    return api
}   
