
import { derived } from 'svelte/store'
import { GameStore } from '@stores/GameStore.js'

const flags_names = [
    'ply-turn', 
    'half-turn', 
    'current-player',
    'black-O-O', 
    'black-O-O-O',
    'white-O-O', 
    'white-O-O-O',
    'en-passant', 
    'is-check', 
    'is-end'
]

export const FlagStores = derived(GameStore, ($game) => {

    return (name) => {
        console.log({ FlagStore_name: name })

        return GameStore.get_flag(name)
    }
})


