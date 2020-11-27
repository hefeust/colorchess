
<script>
    import { onMount } from 'svelte'
    import SVGDefs from '@game-zone/SVGDefs.svelte'  

    const w = 15
    const h =  2
    let viewBox = [0, 0, w, h].join(' ')

    let innerWidth = 0
    let innerHeight = 0
    let style = ''

    onMount(() => {
        console.log('# creating captures area...')
    })

    $: if(innerWidth < innerHeight) {
        // mobile
        style = 'width:' + innerWidth + 'px;'
              + 'height:' + (innerWidth * h /w) + 'px;'

//        viewBox = [-0.05, -0.05, w + 0.05, h + 0.05].join(' ')    
    } else {
        // desktop or mobile landscape
        style = 'width:' + (0.66 * innerHeight) + 'px;'
              + 'height:' + (0.66 * innerHeight * h /w) + 'px;'
        
  //      viewBox = [-0.5, -0.5, w + 1, h + 1].join(' ')    
    }
</script>

<svelte:window bind:innerHeight={ innerHeight} bind:innerWidth={ innerWidth} />


<svg { style } viewBox={viewBox} 
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    version="1.1">
 
   <SVGDefs />
</svg>

<style>
    svg {
        background-color: #bada55;
    }
</style>
