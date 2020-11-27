    
import { create_bmp } from './bmp.js'

export const create_trie = (options) => {

    const bmp = create_bmp({
        size: 20,
        thresold: 0.05,
        growth: 0.05,
        debug: !!options.debug
    })

    const move = (path) => {
        const parts = path.length ? path.split ('/') : []
        
        const uid = parts.reduce((vuid, subpath) => {
            // console.log('parts.move reducer:', { vuid, subpath })
        
            const vnode = bmp.get_data_chunk(vuid)
            let cnode = null
            let cuid = null

            if(debug) console.log('        reduce: ', { vuid, subpath })
            if(debug) console.log('        reduce: ',  vnode )
            
            if(!vnode) return null
            if(false === vnode.children.has(subpath)) return null
            cuid = vnode.children.get(subpath)
            cnode = bmp.get_data_chunk(cuid)
            if(!cnode) return null
            if(cnode.subpath !== subpath) return null
            
            if(debug) console.log('    reduce:', { cuid })

            return cuid
        }, root)

        if(debug) console.log ('     trie.move:', { parts, uid })        
       
        return uid
    }

    const value = (path) => {
        const vuid = move (path)
        const vnode = bmp.get_data_chunk (vuid)

        // console.log ('trie.value', { vuid, vnode })

        if (!vnode ) return null
        
        return vnode.data
     }

    const subpaths = (path) => {
        const vuid = move (path)
        const vnode = bmp.get_data_chunk (vuid)

        // console.log ('trie.subpaths', { vuid, vnode })
        
        if(!vnode) return null
        
        return Array.from(vnode.children.keys())
    }

    const attach = (path, subpath, data) => {
        const vuid = move(path)
        const vnode = bmp.get_data_chunk(vuid)
        const cuid = bmp.set_data_chunk({
            subpath, 
            children: new Map(),
            data
        })

        if(debug) console.log('trie.attach:', { path, subpath, vuid, cuid})
        
        vnode.children.set (subpath, cuid)
    }

    // @TODO: add "revursive" behaviour to avoid memory leaks !
    const detach = (path, subpath) => {
        const vuid = move(path)
        const vnode = bmp.get_data_chunk(vuid)

        bmp.free_data_chunk(vnode.uid)
    }    

    const root = bmp.set_data_chunk({ 
        subpath: '', 
        children: new Map(), 
        data: '#root!'
    })    
    
    const debug = !!options.debug

    console.log ({ root })

    return {
        value, subpaths, attach, detach
    }
}
