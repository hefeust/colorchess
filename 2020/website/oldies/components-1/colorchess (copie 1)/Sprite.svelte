
<script>
    import { onMount } from 'svelte'
    import { get_board_utils } from '@game/board-utils.js'
    import { stored_engine } from '@game/stored_engine.js'
    import { fullname } from '@game/fullnames.js'
    import { move_clicks } from '@game/move_clicks.js'

    const DIMS = 1.0    

    export let pov_name = 'south'
    export let ref = null
    export let cidx = -1
    export let ridx = -1
    export let col = ''
    export let row = ''


    const filling = (fen) => {
        const name = fullname(fen)

        if(fen) {
            return `url(#${ name }-sprite)`
        } else {
            return 'transparent'
        }
    }

    const utils = get_board_utils(pov_name, 1.0)

    const fen = utils.is_board(cidx, ridx) ? stored_engine.get_whois(ref) : null

</script>

{#if utils.is_board(cidx, ridx) }
    <circle r="0.5" 
        cx={ cidx - 0.5 } 
        cy={ ridx - 0.5 } 
        fill={ filling() } 
        stroke="black" 
        stroke-width="0.025"
        on:click={ () => move_clicks.click(ref) }
    />
{/if}

