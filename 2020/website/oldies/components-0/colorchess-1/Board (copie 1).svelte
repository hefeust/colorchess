

<script>
    import { onMount } from 'svelte'

    const w = 800
    const h = 800
    const viewBox = [0, 0, w, h].join(' ')    

    // from the white (south) point-of-view
    const DIMS = 100
    const COLS = 'abcdefgh'.split('')
    const ROWS = '12345678'.split('').reverse()

    const defs = []

    let board = []
  
    onMount(() => {
       ROWS.map((r, ridx) => {
            const cells = []

            COLS.map((c, cidx) => {
                const klass = ((cidx + ridx) % 2) ? 'is-black' : 'is-white' 
                const ref = [c, r].join('')
                const x = DIMS * cidx + 5
                const y = DIMS * ridx + 5
                const cell = { ref, klass, x, y }

                board = [...board, cell]
            })
        })
    })      
</script>

<section class="section">
    <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
        {#each board as cell }
            <rect class={cell.klass} 
                x={cell.x + 1.25}
                y={cell.y + 1.25}
                width={DIMS * 0.97}
                height={DIMS * 0.97}
                rx="15"
                ry="15"
            />
        {/each}
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

    .is-white {
        stroke: black;
        stroke-width: 1;
        fill: white;
    }

    .is-black {
        stroke-width: 1;
        stroke: white;
        fill: black;
    }
</style>

