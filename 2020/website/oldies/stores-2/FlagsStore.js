
import { derived } from 'svelte/store'
import { GameStore } from '@stores/GameStore.js'

const stores = new Map()

stores.set('current-player', derived(GameStore, ($game) => {
    const { engine } = $game

    return engine.get_flag('current-player')
}))

export const FlagsStore = (name) => stores.get(name)
