
<script>
    import { onMount } from 'svelte'
    import { get_pov_def } from '@game/board-povs.js'
    import { get_board_utils } from '@game/board-utils.js'
    import Tile from './Tile.svelte'

    export let pov_name = 'south'

    let tiles = []

    const draw = () => {
        console.log({ pov_name })
        const pov = get_pov_def(pov_name)          
        const utils = get_board_utils(pov_name, 1.0)

        pov.iterate((def) => {
            const {
                ref, cidx, ridx, col, row
            } = def

            const tile = {
                ref, cidx, ridx, col, row                
            }

            tiles = [...tiles, tile]
        })

        console.log({ tiles })
    }

    onMount(() => {
        draw()
    })
</script>

<g class="tiles-group">
    {#each tiles as tile}
        <Tile {...tile} />
    {/each}
</g>

