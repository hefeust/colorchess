
<script>
    import { onMount } from 'svelte'
    import { stored_engine } from '@game/stored_engine.js'
    import { pov_name } from '@game/pov-options.js'

    import SVGDefs from './SVGDefs.svelte'
////  TilesGroup from './TilesGroup.svelte'
    import SpritesGroup from './SpritesGroup.svelte'

    const w = 8
    const h = 8
    const viewBox = [-0.5, -0.5, w + 1, h + 1].join(' ')    

    // from the white (south) point-of-view
    const dims = 1.0
  
    onMount(() => {
        console.log('# mounting board...')
    })      
</script>

<h1>POV { $pov_name }</h1>

<section class="section">
    <svg viewBox={viewBox} 
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        version="1.1">
        <SVGDefs />

        <SpritesGroup { $pov_name } />

    </svg>
</section>

<style>
    svg {
        display: block;
        position: relative;
        border: 1px dashed black;
        height: 400px;
        width: 400px;
        background-color: lightgrey;
    }


</style>

