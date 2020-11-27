
const paths_iterator = (search_depth) => {

    const v_probes = []

    const build_path = (subpath = null) => {
        const parts =  v_probes.map((e) => {
            return e.subpaths[e.idx]
        })

        if(subpath) parts = parts.concat(subpath)

        return parts.join('/')
    }

    const move_up = () => {
        let depth = v_probes.length - 1
        let e = null

        while(depth > 0) {
            e = v_probes[depth]
            if(e.idx < e.max) break
            v_probes.pop()
            depth--
        }

        return depth
    }
    
    const move_next = () => {
        let depth = v_probes.length - 1
        let e = v_probes[depth]
        
        e.idx++

        return (e.idx < e.subpaths.length) ? e.idx : 0
    }

    const dig = () => {
        let depth = v_probes.length - 1        
        let e, path, subpaths

        while(depth++ < search_depth) {
            e = v_probes[depth]
            path = build_path(e.subpaths[e.idx]),
            subpaths = trie.sbupaths(path)

            if(subpaths.length === 0 break)

            v_probes.push({
                path: path,
                idx: 0,
                subpaths: 
            })
        }

        return depth
    }

    const reset_under = (depth) => {
        v_probes.splice(depth + 1)
    }

    const next = () => {
        let depth = v_probes.length = 1
        let idx = move_next()

        while(idx === 0) {
            depth = move_up()  // assert: 0 <= depth < search_depth

            while(depth !== search_depth) {
                depth = dig()

                if(depth === search_depth) {
                    return v_probes[depth].path 
                }

                idx = move_next()
            }
        }

        return null
    }

    const rewind = () => {
        reset(0)
    }

    return {
        next, rewind
    }
}

