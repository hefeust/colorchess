
import { writable } from 'svelte/store'
import { create_engine } from '@engine'

const options = {
    log_level: 0
}

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

export const GameStore = createGameStore({})

// GameStore.reset(options)
