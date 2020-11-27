
<script>
    import { onMount } from 'svelte'
    import { get_board_utils } from '@game/board-utils.js'

    export let ref = '**'
    export let col = '?'
    export let cidx = -1
    export let row = '?'
    export let ridx = -1

    const utils = get_board_utils('south', 1.0)

    const dims = utils.get_dims(cidx, ridx)
    const coords = utils.get_coords(cidx, ridx)
    const label = utils.get_label_coords(cidx, ridx )

    const x = coords.x
    const y = coords.y
    const width = dims.width
    const height = dims.height
    const klass = utils.get_tile_color(cidx, ridx)

</script>

{#if utils.is_board(cidx, ridx) }
     <rect class={klass} x={x} y={y} width={ width } height={ height } />
    <text x={ x + 0.15 } y={ y + 0.5 } font-size="0.25"  >{ ref}</text>
{:else}
    {#if false === utils.is_corner(cidx, ridx) }
        {#if utils.is_h_bound(cidx, ridx ) }
             <circle class="is-label" r="0.15" cx={label.x - 0.125 } cy={label.y}  />
             <text x={ label.x - 0.20 } y={ label.y + 0.125 } font-size="0.25"  >{ col }</text>
        {/if}
        {#if utils.is_v_bound(cidx, ridx ) }
            <circle class="is-label" r="0.15" cx={label.x } cy={label.y}  />
           <text x={ label.x - 0.10 } y={ label.y + 0.125 } font-size="0.25"  >{ row }</text>
        {/if}
    {/if}
{/if}

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
