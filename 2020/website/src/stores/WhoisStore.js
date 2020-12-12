
import { derived } from 'svelte/store'
import { GameStore } from '@stores/GameStore.js'
//import { RealPOVStore } from '@stores/POVStore.js'
import { get_pov_def} from '@helpers/board-povs.js'

const pov = get_pov_def()
const stores = new Map()

pov.iterate((def) => {
    const { ref } = def
    
    const store = derived(GameStore, ($game) => {
//        console.log($game)

        return GameStore.get_whois(ref)
    })

    stores.set(ref, store)
})

export const WhoisStore = (ref) => stores.get(ref)

