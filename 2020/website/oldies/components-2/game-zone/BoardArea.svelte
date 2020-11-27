<script>
    import { onMount } from 'svelte'    
    import { RealPOVStore } from '@stores/POVStores.js'
    import { ClickedStore, ClickMoveStore } from '@stores/ClickMoveStore.js'
    import { FlagsStore } from '@stores/FlagsStore.js'

    import SVGDefs from '@game-zone/SVGDefs.svelte'
    import TilesLayer from '@game-zone/TilesLayer.svelte'
    import SpritesLayer from '@game-zone/SpritesLayer.svelte'

    const w = 8
    const h = 8
    const viewBox = [-0.5, -0.5, w + 1, h + 1].join(' ')    

    const current_player = FlagsStore('current-player')

    onMount(() => {
        console.log('# creating board area...')
    })
</script>
<section class="section">
    <p> clicked: { $ClickedStore.past } { $ClickedStore.now } </p>
    <p> message: { $ClickMoveStore }  </p>
    <p> POV: { $RealPOVStore }  </p>
    <p> current-player: { $current_player }  </p>
    <svg viewBox={viewBox} 
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        version="1.1">

        <SVGDefs />
        <TilesLayer pov_name={ $RealPOVStore } />
        <SpritesLayer pov_name={ $RealPOVStore } />
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

