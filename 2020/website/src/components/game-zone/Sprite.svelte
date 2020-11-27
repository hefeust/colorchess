
<script>
    import { onMount } from 'svelte'
    import { WhoisStore } from '@stores/WhoisStore.js'
//    import { GameStore } from '@stores/GameStore.js'
    import { ClickedStore } from '@stores/ClickMoveStore.js'
    import { get_board_utils } from '@helpers/board-utils.js'
    import { fullname } from '@helpers/pieces-fullnames.js'

//    import { stored_game } from '@game/stored-game.js'
//    import { move_clicks } from '@game/move-clicks.js'

    const DIMS = 1.0    

    export let pov_name = null
    export let ref = null
    export let cidx = -1
    export let ridx = -1
    export let col = ''
    export let row = ''
    
    let fen 

    $: fen = WhoisStore(ref)

    const filling = (fen) => {
        const name = fullname(fen)

        if(fen) {
            return `url(#${ name }-sprite)`
        } else {
            return 'transparent'
        }
    }

</script>
<g class={ `sprite_${ ref}_col_${ cidx }_row_${ ridx}`}>
    <circle r="0.5" 
        on:click={ () => ClickedStore.click(ref) }
        cx={ cidx - 0.5 } 
        cy={ ridx - 0.5 } 
        fill={ filling( $fen ) } 
        stroke="black" 
        stroke-width="0.025"
    />
</g>
