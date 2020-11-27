
import { writable } from 'svelte/store'
import { create_engine } from '@engine'

const options = {
    log_level: 0
}


/*
const createGameStore = () => {
    const engine = create_engine(options)
    const { subscribe, update, set } = writable({ counter: 0, engine  })

    const reset = (options) => {

        set({ counter: 0, engine: engine })
    }

    const play = (move) => {
        update((state) => {
            state.counter = state.counter + 1
            state.engine.play(move)

            return state
        })
    }

    const revert = () => {}

    reset({ log_level: 0})

    return {
        subscribe,
        reset, play, revert
    }
}
*/

const createGameStore = () => {
    const engine = create_engine(options)
    const { subscribe, update } = writable(0)
    
    return {
        subscribe,
        play: (move) => {
            const result = engine.play(move)

//            if(result) 
            update((counter) => counter + 1)
                
            return result
        },

        get_whois: (ref) => engine.get_whois(ref),

        get_pressions: (ref) => engine.get_pressions(ref),


        get_flag: (name) => {
            console.log({ GameStore_get_flag : engine.get_flag(name) })
            return engine.get_flag(name)
        },
        get_futures: () => engine.get_futures()
        
    }    
}

export const GameStore = createGameStore({})

// GameStore.reset(options)
