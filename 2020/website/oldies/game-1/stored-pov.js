
import { writable, derived  } from 'svelte/store'

export const pov_names = 'auto,north,south'.split(',')

const create_stored_pov = () => {
    const store = writable('south')
    const { subscribe, update } = store

    return {
        setup: (name) => {
            console.log({ setup: name })

            if(pov_names.indexOf(name) > -1) {
                update(state => name)
            } else {
                update(state => 'auto')
            }
        },
        subscribe
    }
}

export const stored_pov = create_stored_pov()
