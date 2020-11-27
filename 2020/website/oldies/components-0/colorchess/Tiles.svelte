
<script>
    import { onMount } from 'svelte'
    import { 
        get_pov_def,
        get_coords,
        get_html_class,
        get_dimensions,
        is_vertical_bound,
        is_horizontal_bound
    } from '@stores/board.js'

    const DIMS = 1.0

    let tiles = []

    let pov = 'south'
//    let pov = 'south'

    onMount(() => {
        const pov_def = get_pov_def(pov)

        pov_def.rows.map((r, ridx) => {
            const cells = []

            pov_def.cols.map((c, cidx) => {
                const ref = [c, r].join('')
                const coords = get_coords(cidx, ridx)
                const dims = get_dimensions(cidx, ridx)
                const rx = 0.025 * DIMS
                const ry = 0.025 * DIMS

                const tile = { 
                    ref, 
                    class: get_html_class(cidx, ridx), 
                    x: coords.x, 
                    y: coords.y, 
                    width: dims.width, 
                    height: dims.height, 
                    rx, 
                    ry
                }

                tiles = [...tiles, tile]

            })
        })

        console.log({ tiles })
    })          
</script>

<g class="tiles">
    {#each tiles as tile }
            <rect {...tile } />
    {/each}
</g>

<style>
    .is-white {
        stroke: black;
        stroke-width: 0.025;
        fill: #999999;
    }

    .is-black {
        stroke-width: 0.025;
        stroke: white;
        fill: #666666;
    }
</style>
