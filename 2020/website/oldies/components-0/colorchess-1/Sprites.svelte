
<script>
    import { onMount } from 'svelte'
    import { engine } from '@stores/engine.js'
    import { fullname } from '@stores/sprites.js'
    import { board_moves+ } from '@stores/board-moves.js'
    import { 
        get_pov_def,
        get_coords,
    } from '@stores/board.js'

    const bm = board_moves()

    const tile_click_handler = (ref) => {
        bm.click(ref)
    }

    const tile_filling = (ref) => {
        const fen = $engine.whois(ref)

       if(fen) {
            return `url(#${ fullname(fen) }-sprite)`
        } else {
            return 'transparent'
        }
    }

    const DIMS = 1.0    
    let  pov ='south'
    let tiles = []

    onMount(() => {
        const pov_def = get_pov_def(pov)

        pov_def.rows.map((r, ridx) => {
            const cells = []

            pov_def.cols.map((c, cidx) => {
                const ref = [c, r].join('')
                const coords = get_coords(cidx, ridx)

                const tile = { 
                    ref, 
                    cidx,
                    ridx,
                    x: coords.x, 
                    y: coords.y,
                    draggable: true
                }

                tiles = [...tiles, tile]
            })
        })
    })
    
    $: tiles = tiles
</script>

<g class="sprites">
    {#each tiles as tile }
        <circle r="0.5" 
            cx={ tile.cidx - 0.5 } 
            cy={ tile.ridx - 0.5 } 
            fill={ tile_filling(tile.ref) } 
            stroke="black" 
            stroke-width="0.05"
            on:click={ () => tile_click_handler(tile.ref) }
            />
    {/each}
</g>

<style>

</style>
