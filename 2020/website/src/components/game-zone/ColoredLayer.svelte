
<script>
    import { onMount } from 'svelte'
    import { get_pov_def } from '@helpers/board-povs.js'
    import { get_board_utils } from '@helpers/board-utils.js'
    import ColoredCell from '@game-zone/ColoredCell.svelte'

    export let pov_name = null

    let colors = []
    let pov = get_pov_def(pov_name)          
    let utils = get_board_utils(pov_name, 1.0)

    $: {    
        console.log('ColoredLayer POV=' + pov_name )

        pov = get_pov_def(pov_name)          
        utils = get_board_utils(pov_name, 1.0)

        pov.iterate((cell) => {
              colors = [...colors, cell]
        })
     }

    onMount(() => {
        console.log('   mounting colored layer...')
    })
</script>

<g class="gradient-group">
    {#each colors as cell }
        <ColoredCell { ...cell } />
    {/each}
</g>






