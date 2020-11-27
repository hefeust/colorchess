
<script>
    import { onMount } from 'svelte'
    import { get_pov_def } from '@game/board-povs.js'
    import { get_board_utils } from '@game/board-utils.js'
    import Sprite from './Sprite.svelte'

    export let pov_name = 'south'

    let sprites = []

    let pov, utils
//    const draw = (pn) => {
    $: {    
        pov = get_pov_def(pov_name)          
        utils = get_board_utils(pov_name, 1.0)

        sprites = []

        pov.iterate((tile) => {
           sprites = [...sprites, { ...tile, pov_name }]
        })

     }


</script>

<g class="sprites">
    {#each sprites as sprite }
        <Sprite { ...sprite } />
    {/each}
</g>

