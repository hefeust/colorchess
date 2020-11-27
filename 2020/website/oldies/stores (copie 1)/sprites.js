
import { derived } from 'svelte/store'
import { engine } from './engine.js'

export const create_stored_sprite  = (ref) => {
    const store = derived(engine, ($engine)  => {
        console.log('STORED_SPRITE ' + ref)

        return engine.whois(ref)
    })

    return store
}

