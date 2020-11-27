
<script>
    import { fade } from 'svelte/transition'
    import { TurnStore } from '@stores/TurnStore.js'
    
    export let viewBox = '-0.5 -0.5 8.5 8.5'
    
    let show = true    
    let [ xmin, ymin, xmax, ymax ] = viewBox.split(' ')
    let x = xmin
    let y = ymin
    let width = xmax - xmin
    let height = ymax - ymin
</script>

{#if show }
    <g class="message-curtains">
        <rect  {x} {y} {width} { height } />
    </g>
{/if}

<style>
     rect {
        fill: #592682;
    }
</style>

