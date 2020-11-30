
const defaults =  new Map([

    ['ply-turn', 1],
    ['half-turn', 0],
    ['current-player', 'white'],
    ['black-O-O-O', true],
    ['black-O-O', true],
    ['white-O-O-O', true],
    ['white-O-O', true],        
    ['en-passant' , '**'],
    ['is-check', false],
    ['is-end', false],
    ['is-legal', true],
    ['is-gas', false]
])

const keys = Array.from(defaults.keys())

export const create_flags = (options) => {

    const pairs = new Map()
    
    const set_pair = (key, value) => {
        let ok = false

        if (pairs.has(key)) {
            pairs.set (key, value)
            ok = true
        }
        
        return ok
    }
 
    const get_pair = (key) => {

        if (pairs.has(key)) {
            return { key, value: pairs.get(key) }
        }

        return null
    }
 
    const fork = () => {
        const forked = create_flags()

        keys.map((key) => {
            const pair = get_pair(key)
 
            forked.set_pair(key, pair.value )
        })
        
        return forked
    }

    /// clones and export all flags pairs
    const get_all_pairs = () => {
        const results = []

        keys.map((key) => {
            const pair = get_pair(key)

            results.push(pair)
        })

        return results
    }

    const toString = () => {
        let texts = ['### FLAGS ###', '']
        
//        items.forEach ((v, k ) => texts.push('\t' + [k, v ].join (': ')))
        get_all_pairs().map((pair) => 
            texts.push(`${pair.key}: ${pair.value}`
        ))

        return texts.join ('\n') + '\n'
    }

 //   defaults.forEach ((v, k) => items.set (k, v))
    keys.map((key) => {
        const value = defaults.get(key)

        pairs.set(key, value)
    })

    return { 
        set_pair, 
        get_pair,
        get_all_pairs,
        fork, 
        toString }
}
