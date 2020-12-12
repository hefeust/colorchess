
import { log, debug } from '../utils/logger.js'
import { refs, COLS, REV_ROWS } from '../core/refs.js'

/*
    ray kinds:
    - DELTA:   both attacking and moving
    - OFFSET:  only moves, without attack and capture
    - CAPTURE: only capture move, triggered only by enemy piece
*/
export const RAY_DELTA = 'ray-delta'
export const RAY_OFFSET = 'ray-offset'
export const RAY_CAPTURE = 'ray-capture'

export const create_raycaster = () => {
    const starting = new Map()
    const tracking = new Map()

    const cast = (side, kind, sequence) => {

        // const started_hits = []
        const hits = []

        const ray = { side, kind, sequence, shadow: 0 }

        if([RAY_DELTA, RAY_OFFSET, RAY_CAPTURE].indexOf(kind) === -1)
            throw new Error('[X] internal error: raycaster.cast invalid ray kind: ' + kind)

        if(['black', 'white'].indexOf(side) === -1)
            throw new Error('[X] internal error: raycaster.cast invalid ray side: ' + side)

        if(Array.isArray(sequence) === false)
            throw new Error('[X] internal error: raycaster.cast invalid ray sequence array !')

        // exit if ray sequence is not relevant
        if(sequence.length < 2) return null

        sequence.map((sref, sidx) => {
            const started = starting.get(sref)
            const tracked = tracking.get(sref)

            if(sidx === 0) {
                started.push(ray)
                hits.push(...tracked)
            } else {
                tracked.push(ray)

            }
        })

        // shadow newly creted ray
        sequence.map((sref, sidx) => {
            const started = starting.get(sref)

            if(sidx === 0) return null

            // some ray starts at sref
            if(started.length > 0) {
                if(ray.shadow === 0) ray.shadow = sidx
                if(sidx < ray.shadow)  ray.shadow = sidx
            }
        })

        // shadowing existing rays
        hits.map((another_ray) => {
            const anhidx = another_ray.sequence.indexOf(sequence[0])

            if(anhidx === -1) return null
            if(another_ray.shadow === 0) another_ray.shadow = anhidx
            if(anhidx < another_ray.shadow) another_ray.shadow = anhidx
        })

//        log('raycaster.cast')
//        log(ray_format(ray))
    }

    /**
    * get accessible refs from ref
    */
    const get_dests_for = (ref) => {
        const started = starting.get(ref)    
        const results = []

        // are there starting rays from here ?
        if(started.length > 0) {
            started.map((sray) => {
                
                sray.sequence.map((seqref, seqidx) => {
                    const others = starting.get(seqref)

                    // skip other tests for starting position of current ray
                    if(seqidx === 0) return null

                    // skip other tests if we're other the shadow
                    if(0 < sray.shadow && sray.shadow < seqidx) return null
                    // if(seqidx === sray.shadow && ray.kind === RAY_OFFSET) return null

                    // capturing rays are not triggered by empty tiles !!!
                    if(others.length === 0 && sray.kind === RAY_CAPTURE) return null

                    // MUST NOT capture a friend piece !!!
                    if(others.length > 0 && others[0].side === sray.side) return null


                  
                    results.push(seqref)
                })
            })
        }        

        log('get_dests_for ref=' + ref + ', count=' + results.length)
        debug({ [ref]: results })
        
        return results
    }

    /**
    * get ray starting refs for ref square
    */
    const get_starts_to = (ref) => {
        const tracked = tracking.get(ref)
        const results = []

        // log(`\n\t # tracked on ref=${ ref } count=${ tracked.length }`)

        if(tracked.length > 0) {
            tracked.map((tray) => {
//                log(ray_format(tray))

                const tidx = tray.sequence.indexOf(ref)

//                console.log({ tidx, shadow: tray.shadow })
                if(tidx === 0) return null
                if(tray.shadow > 0 && tidx > tray.shadow) return null
                if(tray.kind === RAY_OFFSET && tidx <= tray.shadow) return null
                // console.log('PUSH_RESULTS')
                results.push(tray.sequence[0])
            })            
        }

        //log('\t get_starts_to ref=' + ref + ', count=' + results.length)
        // log('\t results: ' + results.join(', '))
        // debug({ [ref]: results })

        return results
    }

    /**
    * get pressions balance for the "ref"square
    */
    const get_pressions = (ref) => {
        const tracked = tracking.get(ref)
        let black = 0
        let white = 0
        
        tracked.map((tray) => {
            const tidx = tray.sequence.indexOf(ref)

            if(tray.kind === RAY_OFFSET) return null

            if(tidx === 0) return null
            if(0 < tray.shadow && tray.shadow < tidx) return null
            if(tray.side === 'black') black++
            if(tray.side === 'white') white++
        }) 

        return { black, white }
    }

    const ray_format = (ray) => {
        const texts = ['RAY: ', ray.side, ray.kind]
        
        ray.sequence.map((sref, sidx) => {
            const separator = (0 < ray.shadow && ray.shadow <= sidx) ?  '#' : ' '
            
            texts.push(separator + sref)

        })
        
        return texts.join(' ')
    }

    const format_rays_from = (ref) => {
        const started = starting.get(ref)
        const results = []
        
        results.push('DEBUG raycaster rays from ref=' + ref)
        
        started.map((ray) => {
            results.push('\t' + ray_format(ray))
        })
        
        return results.join('\n')
    }    

    const toString = () => {
        const results = []

        REV_ROWS.map((row) => {
            const line = []
        
            COLS.map((col) => {
                const ref = '' + col + row
                const pressions = get_pressions(ref)
                const text = ref + ':' + pressions.black + ',' + pressions.white
                
                line.push(text)
            })
            
            results.push(line.join('  '))
        })
      
        return results.join('\n')
    }

    refs.map((ref) => {
        starting.set(ref, [])
        tracking.set(ref, [])
    })

    return {
        cast,
        get_dests_for,
        get_starts_to,
        get_pressions,
        toString,
        format_rays_from
    }
}

