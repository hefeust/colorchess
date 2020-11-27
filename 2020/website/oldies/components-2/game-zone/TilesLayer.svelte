
<script>
    import { onMount } from 'svelte'
    import { get_pov_def } from '@helpers/board-povs.js'
    import { get_board_utils } from '@helpers/board-utils.js'
    import Tile from '@game-zone/Tile.svelte'

    export let pov_name = null

    let tiles = []
    let pov = get_pov_def(pov_name, true)          
    let utils = get_board_utils(pov_name, 1.0)

    pov.iterate((def) => {
        const {
           ref, cidx, ridx, col, row
        } = def

        const tile = {
           ref, cidx, ridx, col, row, pov_name                
        }

        tiles = [...tiles, tile]
    })

    onMount(() => {
        console.log('   mounting board-area tileslayer...')
    })

//    $: console.log(tiles)
</script>
<g class="tiles-group">
    {#each tiles as tile }
        <Tile {...tile } />
    {/each}
</g>

