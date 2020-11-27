
<script>
    import { onMount } from 'svelte'

    import SVGDefs from './SVGDefs.svelte'
    import Tiles from './Tiles.svelte'
    import Sprites from './Sprites.svelte'

    const w = 8
    const h = 8
    const viewBox = [-0.5, -0.5, w + 1, h + 1].join(' ')    

    // from the white (south) point-of-view
    const dims = 1.0

    // point-of-view
    let pov = 'south'  
//    let pov = 'south'  

    onMount(() => {
        console.log('# mounting board...')
    })      
</script>

<section class="section">
    <svg viewBox={viewBox} 
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        version="1.1">
        <SVGDefs />
        <Tiles />
        <Sprites />
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

