
<script>
    import { onMount } from 'svelte'
////////////    import { stored_pov } from '@game/stored-pov.js'
    import { get_pov } from '@game/board-povs.js'
    import { get_board_utils } from '@game/board-utils.js'
    import Sprite from './Sprite.svelte'

    export let pov_name = null

    let pov, utils
    let sprites = []
    let debug

    $: {    
        console.log('SpriteGroup POV=' + pov_name    )

        pov = get_pov(pov_name)          
        utils = get_board_utils(pov_name, 1.0)

        sprites = []

        debug = []

        pov.iterate((cell) => {
            debug.push(cell.ref + cell.cidx + cell.ridx)

           sprites = [...sprites, { ...cell, pov_name }]
        })

//        console.log('sprites 0 ')
//        console.log( sprites[0] )
//        console.log(debug.join(' -'))
     }


</script>

<g class="sprites">
    {#each sprites as sprite }
        <Sprite { ...sprite } />
    {/each}
</g>

