

<script>
    import { onMount } from 'svelte'
    import  SVGDefs from './SVGDefs.svelte'
    import Tile from './Tile.svelte'
    import { fullname } from '@stores/sprites.js'

    import { engine } from '@stores/engine.js'

    const w = 8
    const h = 8
    const viewBox = [-0.5, -0.5, w + 1, h + 1].join(' ')    

    // from the white (south) point-of-view
    const DIMS = 1.0

    const get_pov_def = (name) => {
        const north = {
            rows: '-12345678+'.split(''),
            cols: '+hgfedcba-'.split('')
        }

        const south = {
            rows: '+87654321-'.split(''),
            cols: '-abcdefgh+'.split('')
        }

        return ({ north, south})[name]
    }

    let board = []

    // point-of-view
    let pov = 'south'  
//    let pov = 'south'  

    onMount(() => {
        const pov_def = get_pov_def(pov)

        pov_def.rows.map((r, ridx) => {
            const cells = []

            pov_def.cols.map((c, cidx) => {
                const ref = [c, r].join('')
                const cell = { ref, cidx, ridx }

                board = [...board, cell]
            })
        })
    })      
</script>

<section class="section">
    <svg viewBox={viewBox} 
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        version="1.1">
        <SVGDefs />
        <g class="tiles">
            {#each board as cell }
                <Tile {...cell}  />
            {/each}
        </g>
        <g class="sprites">
            {#each board as cell}
                {#if $engine.whois(cell.ref) }
                    <circle r="0.5" 
                        stroke="black" stroke-width="0.05"
                        cx={ cell.cidx - 0.5 } cy={ cell.ridx - 0.5 } 
                        fill={ 'url(#' + fullname($engine.whois(cell.ref)) + '-sprite' + ')' } />
                {/if}
            {/each}
        </g>
    </svg>
</section>

<style>
    svg {
        display: block;
        position: relative;
        border: 1px dashed black;
        height: 400px;
        width: 400px;
        background-color: grey;
    }


</style>

