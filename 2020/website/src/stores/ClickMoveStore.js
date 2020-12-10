
import { writable, derived } from 'svelte/store'
import { GameStore } from '@stores/GameStore.js'

const createClickedStore = () => {
    const { set, subscribe, update} = writable(null)

    const clear = () => set({ now: null, past: null })

    const click = (ref) => {
        console.log({ click: ref})

        update(($clicks) => {
            
            $clicks.past = $clicks.now
            $clicks.now = ref

            return $clicks
        })
    }

    clear()
    
    return {
        subscribe, clear, click
    }
}

export const ClickedStore = createClickedStore()

export const ClickMoveStore = derived([GameStore, ClickedStore], ([$game, $clicked]) => {
    const { past, now } = $clicked
//    const { engine } = $game
//    const fen = engine.get_whois($clicked.now)
    const futures = GameStore.get_futures()
    const prefix = [past, now].join(':')
    const filtered = futures.filter((selector) => prefix === selector.substr(0, prefix.length))

    let message = 'click on start then destination refs'

//    console.log($clicked)

    if(past && now) {
        switch(filtered.length) {
            case 0:
                message = '/!\\ No valid move found here'
            break
            case 1:
                message = `attempting to play ${past}:${now}`
                // engine.play(filtered[0])
                GameStore.play(filtered[0])
                ClickedStore.clear()
            break
            case 4:
                message = 'this is time to promote pawn !'
            break
        }
    }

    message += ` [prefix: ${ past }${ now } filtered: ${ filtered.length }]`

    return message
})

// export const ClickMoveStore = createClickMoveStore()

