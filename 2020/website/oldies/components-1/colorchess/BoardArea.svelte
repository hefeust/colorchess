
<script>
    import { onMount } from 'svelte'
    import { stored_game } from '@game/stored-game.js'
    import { stored_pov } from '@game/stored-pov.js'
    import { real_pov } from '@game/board-real-pov.js'

    import SVGDefs from './SVGDefs.svelte'
////  TilesGroup from './TilesGroup.svelte'
    import SpritesGroup from './SpritesGroup.svelte'

    const w = 8
    const h = 8
    const viewBox = [-0.5, -0.5, w + 1, h + 1].join(' ')    

    const stored_flags = stored_game.get_flags()

    // from the white (south) point-of-view
    const dims = 1.0
  
    onMount(() => {
        console.log('# mounting board...')
    })      
</script>

<h1>POV { $stored_pov }</h1>

<section class="section">
    <svg viewBox={viewBox} 
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        version="1.1">
        <SVGDefs />

        <SpritesGroup pov_name={ real_pov($stored_pov, $stored_flags.get_pair('current-player').value ) } />

    </svg>
</section>


