
import { derived, writable } from 'svelte/store'
import { GameStore } from '@stores/GameStore.js'
//import { RealPOVStore } from '@stores/POVStore.js'
import { get_pov_def} from '@helpers/board-povs.js'

import { get_color } from '@helpers/colors.js'

const pov = get_pov_def(null) // generic POV: is board refs list
const stores = new Map()

pov.iterate((def) => {
    const { ref } = def
    
    const store = derived(GameStore, ($game) => {
        return get_color(GameStore.get_pressions(ref))
    })

    stores.set(ref, store)
})

export const ColorStore = (ref) => stores.get(ref)

// 'none', 'full' or 'transparent'
export const UserColorStore = writable('none')
