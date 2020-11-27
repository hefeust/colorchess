

import { writable } from 'svelte/store'

const metrics_names = 'none,basic,weighted,effective'.split(',')

const custom_store = () => {
    const store = writable('none')
    const { subscribe, upadate } = store

    return {
        setup: (name) => {
            if(metrics_names.indexOf(name) > -1) {
                update(state => name)
            } else {
                update(state => 'none')
            }
        },
        subscribe
    }
}

export const metrics_options = create_store()


