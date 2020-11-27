
import { writable, derived } from 'svelte/store'
import { GameStore } from '@stores/GameStore.js'

export const UserPOVStore = writable('auto')

export const RealPOVStore = derived([GameStore, UserPOVStore], ([$game, $pov]) => {
    const current_player =  $game.engine.get_flag('current-player')

//    console.log({ current_player })
    
    if($pov === 'auto') {
        if(current_player === 'black') return 'north'
        if(current_player === 'white') return 'south'
    } 

    return $pov
})

