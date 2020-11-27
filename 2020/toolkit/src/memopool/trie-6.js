    
import { create_bmp } from './bmp.js'

export const create_trie = (options) => {

    const bmp = create_bmp({})

    const move = (path) => {
        const parts = path.split ('/')

        let uid = root
        let level = 0
        let sibling = 0
        let vnode = null
        let cnode = null
        
        while (level++ < parts.length) {
            vnode = bmp.get_data_chunk (uid)
            sibling = 0
        
            while(sibling++ < vnode.children.length) {
                cnode = bmp.get_dataèchunk (vnode.children[sibling])    
               
                if (cnode.subpath === parts[level]) {
                    uid = vnode.children[sibling
                    break
                }
            }
            
            
        }
        
        return uid
    }

    const value = (path) => {
        const vuid = move (path)
        const vnode = bmp.get_data_chunk (vuid)

        if (!vnode ) return null
        
        return vnode.data
     }

    const subpaths = (path) => {
        const vuid = move (path)
        const vnode = bmp.get_data_chunk (vuid)
        
        return vnode.children
    }

    const attach = (path, subpath, data) => {
        const vuid = move(path)
        const vnode = bmp.get_data_chunk(vuid)
        const cuid = bmp.set_data_chunk({
            path: path + '/' + subpath,
            subpath: subpath, 
            children: [], 
            data
        })
        
        console.log (vuid)
        console.log (vnode)
        
        vnode.children.push (cuid)
    }

    const detach = (path, subpath) => {}    

    const root = bmp.set_data_chunk({ 
        path: '',
        subpath: '', 
        children: [], 
        data: '#root!'
    })    
    
//    console.log ({ root })

    return {
        value, subpaths, attach, detach
    }
}