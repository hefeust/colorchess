
<script>
    import { onMount } from 'svelte'
    import Sprite from './Sprite.svelte'
    import { 
        get_pov_def,
        get_coords,
    } from '@stores/board.js'

    const DIMS = 1.0    

    const  pov ='south'
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
                    ridx
//                    x: coords.x, 
//                    y: coords.y,
//                    draggable: true
                }

                tiles = [...tiles, tile]
            })
        })

        console.log('SpritesGroup mount: ', tiles)
    })

</script>

<g class="sprites">
    {#each tiles as tile }
        <Sprite { ...tile } />
    {/each}
</g>

