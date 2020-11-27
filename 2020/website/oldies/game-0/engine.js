
import { writable } from 'svelte/store'
import { create_engine } from '@engine'

const create_stored_engine = () => {
    const engine = create_engine({})
    const { subscribe, set, update } = writable(false)

    const whois = (ref) => {
        return engine.whois(ref)
    }

    const play = (selector) => {
        update((state) => true)
        engine.play(selector)
        update((state) => false)
    }

    const get_futures = () => engine.get_futures()

    set(true)

    return {
        subscribe,
        whois,
        play,
        get_futures
    }
}

export const engine = create_stored_engine()


