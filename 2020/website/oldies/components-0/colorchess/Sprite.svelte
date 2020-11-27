
<script>
    import { onMount } from 'svelte'
    import { create_stored_sprite } from '@stores/sprites.js'
    import { fullname } from '@stores/fullnames.js'
    import { move_clicks } from '@stores/move_clicks.js'

    import { 
        get_pov_def,
        get_coords,
    } from '@stores/board.js'

    const DIMS = 1.0    

    export let ref = '**'
    export let cidx = -1
    export let ridx = -1

    const sprite = create_stored_sprite(ref)

    const filling = (fen) => {
        const name = fullname(fen)

        if(fen) {
            return `url(#${ name }-sprite)`
        } else {
            return 'transparent'
        }
    }

    onMount(() => {
       console.log('mouniting sprite...-')
    })

    $: ref = ref
</script>

<circle r="0.5" 
    cx={ cidx - 0.5 } 
    cy={ ridx - 0.5 } 
    fill={ filling($sprite) } 
    stroke="black" 
    stroke-width="0.05"
    on:click={ () => move_clicks.click(ref) }
/>

<text font-size="0.2" x={ cidx - 0.85 } y={ ridx - 0.5 } > { $sprite } </text>

