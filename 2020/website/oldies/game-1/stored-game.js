
import { derived, writable } from 'svelte/store'
import { create_engine } from '@engine'
import { get_pov } from '@game/board-povs.js' 

export const create_stored_game = (options) => {

    const refs = get_pov(null)            
    const engine = create_engine(options || {})
    const stored_refs = new Map()
    const stored_flags = writable(engine.get_flags_pairs())
    const stored_futures = writable(engine.get_futures())

    const get_whois = (ref) => {
        const strefs = stored_refs.get(ref)
        
        return { subscribe: strefs.subscribe  }
    }

    const get_flags = () => {
        return { subscribe: stored_flags.subscribe }
    }

    const get_futures = () => {
        return { subscribe: stored_futures.subscribe }
    }

    // *** playing action ***

    const play = (selector) => {
        const refs = Array.from(stored_refs.keys())

        engine.play(selector)

        refs.map((ref) => {
            const sr = stored_refs.get(ref)

            sr.update(state => engine.whois(ref))
        })

        stored_futures.update((state) => engine.get_futures())
        stored_flags.update((state) => engine.get_flags_pairs())
    }

    // *** initialiszation code ***

    refs.iterate( (cell) => {
        const { ref } =  cell 
        const store = writable(engine.whois(ref))

        stored_refs.set(ref, store)
    })

    return {
        get_whois,
        get_flags,
        get_futures,
        play
    }
}

export const stored_game = create_stored_game({
    log_level: 0
})

