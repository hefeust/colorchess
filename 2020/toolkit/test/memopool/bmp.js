
import { create_bmp } from '@toolkit'

const bmp = create_bmp({
    size: 1000,
    thresold: 0.05,
    growth: 0.05
})

const uids = [] 

const m = new Map ()

console.log ('### testing blocks_memory_pool ###')

for (let i = 0; i < 10000; i++) {
//    uids.push(bmp.set_data_chunk(i))

    uids.push(bmp.set_data_chunk([i, i+1, i+2, i+3, i+4]))
}

uids.map(uid => {
//    console.log(uid + ': ' + bmp.get_data_chunk(uid))
})

console.log(bmp.toString())
