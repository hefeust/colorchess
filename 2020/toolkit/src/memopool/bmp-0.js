
import { create_mwc } from '../mwc/create.js'

const key36 = t => 'abcdefghijklmnopqrstuvwxyz12324567890'.charAt (t)

export const create_bmp = (options) => {

    const mwc = create_mwc(97531, 36, 4)
    const list = []
    const lookup = new Map()

    const reallocate = (count) => {
        const len = (count <= size) ? size : count
        const range = new Array(len).fill(null).map((_, idx) => idx)
        const newer = new Array(len).fill(null)

        range.map((idx) => {
            let data = {}
            let used = false
            let uid, block
                       
            do {
                uid = mwc.next().map ((d) => key36(d)).join ('')
//                console.log (mwc.get_state())
            } while (lookup.has (uid)) 
              

            block = { uid, data, used }
            newer[idx] = block
            lookup.set(uid, block)
        })
            
        list.push(...newer)
        size += len
    
//        console.log ('reallocated')
    }
    
    const check_resize = (count) => {
        const rest = size - watermark
        const critical = size * thresold
        
//        console.log ('check resize')
//        console.log ({ count, critical, rest})

        
        if (count + critical >= rest) { 
  //          console.log ('reallocate')
            reallocate(count)
        }
    }

    const get_empty_block = (count) => {
        const results = new Array(count)
        let chunk, prev_chunk = null

//        console.log ('get_empty_block')
//        console.log ({ watermark })
//        console.log (list.length)
        
        for(let i = 0; i < count; i++) {
            chunk = list[watermark + i]
            results[i] = chunk

            if (prev_chunk && chunk) prev_chunk.next = chunk.uid

            prev_chunk = chunk
        }

        watermark += count

        return results
    }

    const set_data_chunk = (data) => {
  //      console.log ('set_data_chunk')
    
        let chunk = null 
        
        check_resize(1)        
//                chunk = (get_empty_block(1))[0]
        let t = get_empty_block(1)
//        console.log (t)
        chunk = t[0]
        if(chunk) {
            chunk.data = data
        } else {
            console.log ('chunk error')
        }
        
//        console.log ({chunk})
//        console.log (chunk.uid)
        
        return chunk.uid
    }
    
    const get_data_chunk = (uid) => {
        let result = null

        if (lookup.has(uid)) {
            result = lookup.get(uid).data
        } 
        
        return result
    }

    const free_data_chunk = (uid) => {
        const chunk = lookup.get(uid)
        let temp = null 
        
        if(!chunk) return null
        
        chunk.data = null
        chunk.used = false
        
        temp = chunk
        
        
    }

    const set_data_block = (items) => {
        const count = items.length
        let chunks = null 
        
        check_resize(count)        
        chunks = get_empty_block(count)

        items.map ((item, idx) => {
            chunks[idx].data = item
        })

        return chunks[0].uid
    }
    
    const get_data_block = (uid) => {
        const results = []
        let current_uid = uid
        let current_chunk = null
        
        while(current_uid)  {
            current_chunk = lookup.get(current_uid) (current_uid)
            results.push(current_chunk.data)
            current_uid = current_chunk.next
        }
        
        return results    
    }

   
    const free_data_block = (uid) => {}
    
    const setup = (options) => {
        size = options.size || 1000
        thresold = options.thresold || 0.1
        growth = options.growth || 0.2
        
        mwc.init([9, 7, 5, 3, 1, 0,7, 7])  
        
        reallocate(size)  
    }

    let growth = 0.2
    let thresold = 0.1
    let size = 0
    let watermark = 0
 
    setup(options || {})
    
    return {
        set_data_chunk,
        get_data_chunk,
        free_data_chunk,
        set_data_block,
        get_data_block,
        free_data_block
    }
}
