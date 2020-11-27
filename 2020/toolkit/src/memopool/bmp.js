
import { create_mwc } from '../mwc-prng/create.js'

const key_for = (arr) => {
    const chars36 = 'abcdefghijklmnopqrstuvwxyz1234567890'

    return arr.map(idx => chars36.charAt(idx)).join('')
}

export const create_bmp = (options) => {

    const mwc = create_mwc(357979131, 36, 4)
    const chunks = []
    const lookup = new Map()

    const reallocate = (qty) => {
//        console.log({ reallocate: qty})
        const length = Math.floor(qty)
//        const length = (qty <= size) ?  size : qty
        const newer = new Array(length)
        let idx = 0
        let uid = null
        let chunk = null
        
        while(idx < length) {
            do {
                uid = key_for(mwc.next())        
            } while(lookup.has(uid))    
        
            chunk = { uid, data: null, used: false  }
            newer[idx] = chunk
            lookup.set(uid, chunk) 
            idx++
        }
        
        chunks.push(...newer)
        size  += length

        
    }
    
    const check_resize = (qty) => {
        const rest = size - watermark
        const critical = size * thresold


        // console.log({ size, qty, rest, critical, length: chunks.length })

        if (qty + critical > rest) { 
          reallocate(size * growth)
        }
    }    
    
    const set_data_chunk = (data) => {
        let chunk = null

        check_resize(1)

//        console.log('set_data_chunk', { watermark, size })

        chunk = chunks[watermark]
        watermark++

        chunk.data = data
        chunk.used = true

        return chunk.uid
    }
    
    const get_data_chunk = (uid) => {
        const chunk = lookup.get(uid)

        if(debug) console.log('         bmp.get_data_chunk:', { uid })
        if(debug) console.log('         SUCCESS:', !!chunk )


        if(!chunk) 
            throw new Error('unexisting chunk for uid=' + uid)

        return chunk.data
    }
    
    const free_data_chunk = (uid) => {
        let chunk = lookup.get(uid)
        let last = list[length - 1]
        let swap = chunk
        
        if(!chunk) return null

        chunk.data = null
        chunk.used = false

        chunk = last
        last = swap

        watermark--
    }

    const toString = () => {
        const texts = []

        texts.push('### BLOCK MEMORY POOL ###')
        texts.push('')
        texts.push('size: ' + size + ' chunks')
        texts.push('watermark: ' + watermark)
        texts.push('ratio: ' + (size ?  100 * watermark / size : '#n/a!')+ ' %')*
        texts.push('')

        return texts.join('\n')
    }        

    const api = { 
        set_data_chunk,
        get_data_chunk,
        free_data_chunk,
        toString
    }    

    const setup = (params) => {
        growth = params.growth || 0.2
        thresold = params.thresold || 0.1
        
        mwc.init([1, 2, 3, 5, 7, 11, 13, 17])
        
        reallocate(params.size || 100)
    }

    const debug = !!options.debug

    let size = 0
    let growth = 0.2
    let watermark = 0
    let thresold = 0.1

    setup(options || {})

    return api
}
