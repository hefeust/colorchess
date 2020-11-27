
<script>
    import { onMount } from 'svelte'
    import { get_board_utils } from '@helpers/board-utils.js'

    export let pov_name = null

    export let ref = '**'
    export let col = '?'
    export let cidx = -1
    export let row = '?'
    export let ridx = -1

    const utils = get_board_utils(pov_name, 1.0)

    const coords = utils.get_coords(cidx, ridx)
    const dims = utils.get_dims(cidx, ridx)
    const label_coords = utils.get_label_coords(cidx, ridx )
    const klass = utils.get_tile_color(cidx, ridx)


//    $: console.log({ coords, dims, label })
</script>

<g class={ `tile_cidx_${ cidx }_ridx_${ ridx }`}>
    {#if utils.is_board(cidx, ridx) }
        <rect class={ klass } 
            x={ coords.x } y={ coords.y } width={ dims.width } height={ dims.height} />
        <text x={ label_coords.x + 0.15 } y={ label_coords.y + 0.25 } font-size="0.25"  >{ ref}</text>

    {:else if utils.is_corner(cidx, ridx) }
        <circle r="0.05" cx={ label_coords.x } cy={ label_coords.y } />

    {:else if utils.is_h_bound(cidx, ridx ) }
        <circle class="is-label" r="0.15" cx={ label_coords.x  } cy={ label_coords.y }  />
        <text x={label_coords.x - 0.125 * dims.width} 
            y={label_coords.y + 0.125 * dims.height} 
            font-size="0.25">
            { col }
        </text>

    {:else if utils.is_v_bound(cidx, ridx ) }
        <circle class="is-label" r="0.15" cx={ label_coords.x } cy={ label_coords.y }  />
        <text x={ label_coords.x - 0.10 } y={ label_coords.y + 0.125 } font-size="0.25"  >
            { row }
        </text>
    {/if}
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

    .is-label {
        fill: transparent;
        stroke: black;
        stroke-width: 0.01
    }
</style>
