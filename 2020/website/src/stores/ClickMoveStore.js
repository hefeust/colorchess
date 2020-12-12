
import { writable, derived } from 'svelte/store'
import { GameStore } from '@stores/GameStore.js'
import { ShowPromoteModal } from '@stores/ModalStores.js'
import { PromoteStore } from '@stores/PromoteStore.js'

const createClickedStore = () => {
    const { set, subscribe, update} = writable(null)

    const clear = () => set({ now: null, past: null })

    const click = (ref) => {
//        console.log({ click: ref})

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

export const ClickMoveStore = derived([GameStore, ClickedStore, PromoteStore], 
    ([$game, $clicked, $promote]) => {

//    console.log('derived:', $clicked, $promote)    

    const { past, now } = $clicked
    const futures = GameStore.get_futures()
    const prefix = [past, now].join(':') + ($promote ? '=' + $promote : '')

//    console.log({ prefix })

    const filtered = futures.filter((selector) => prefix === selector.substr(0, prefix.length))

///    console.log('futures', futures)
//    console.log('promote length ', futures.filter((f) => f.length === 7).length )

    let message = 'click on start then destination refs'

//    console.log($clicked)

    if(past && now) {
        switch(filtered.length) {
            case 0:
//                console.log('FUTURES_0')
                message = '/!\\ No valid move found here'
            break
            case 1:
//                console.log('FUTURES_1')
                message = `attempting to play ${past}:${now}`
                message += '\n' + 'filtered[0]: ' + filtered[0]
                // engine.play(filtered[0])
                GameStore.play(filtered[0])
                ClickedStore.clear()
                if($promote) PromoteStore.update((state) => null    )
            break
            case 4:
//                console.log('FUTURES_4')
                message = 'this is time to promote pawn !'

                ShowPromoteModal.update((state) =>  true)
                PromoteStore.update((state  ) => null)
            break
        }
    }

    message += ` [prefix: ${ past }${ now } filtered: ${ filtered.length }]`

    console.log(message)
    message = ''

    return message
})

// export const ClickMoveStore = createClickMoveStore()

