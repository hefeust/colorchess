
<script>
    import { onMount } from 'svelte'    
    import { RealPOVStore } from '@stores/POVStores.js'
    import { ClickedStore, ClickMoveStore } from '@stores/ClickMoveStore.js'
    import { FlagStores } from '@stores/FlagStores.js'
    import { UserDebugStore } from '@stores/UserDebugStore.js'

    import { ShowPromoteModal } from '@stores/ModalStores.js'

    import SVGDefs from '@game-zone/SVGDefs.svelte'
    import TilesLayer from '@game-zone/TilesLayer.svelte'
    import SpritesLayer from '@game-zone/SpritesLayer.svelte'
//    importing MessageCurtains from '@game-zone/MessageCurtains.svelte'
    import ColoredLayer from '@game-zone/ColoredLayer.svelte'

    const w = 8
    const h = 8

    let innerWidth = 0
    let innerHeight = 0
    let viewBox = [-0.5, -0.5, w + 1, h + 1].join(' ')    

    let style = ''
//    let current_player = FlagStores('current-player')

    onMount(() => {
        console.log('# creating board area...')
    })

    $: if(innerWidth < innerHeight) {
        // mobile
        style = 'width:' + innerWidth + 'px;'
              + 'height:' + innerWidth + 'px;'

        viewBox = [-0.05, -0.05, w + 0.05, h + 0.05].join(' ')    
    } else {
        // desktop or mobile landscape
        style = 'width:' + (0.66 * innerHeight) + 'px;'
              + 'height:' + (0.66 * innerHeight) + 'px;'
        
        viewBox = [-0.5, -0.5, w + 1, h + 1].join(' ')    
    }

    const show_promote_modal = () => {
        ShowPromoteModal.update((state) => true)
    }
</script>

<svelte:window bind:innerHeight={ innerHeight} bind:innerWidth={ innerWidth} />

    <svg { style } viewBox={viewBox} 
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        version="1.1">

        <SVGDefs />
        <TilesLayer pov_name={ $RealPOVStore } />
        <ColoredLayer pov_name={ $RealPOVStore } />
        <SpritesLayer pov_name={ $RealPOVStore } />
    </svg>
{#if $UserDebugStore }
    <div style="background-color: #bada55;">
        <h3>DEBUG</h3>
        <p> clicked: { $ClickedStore.past } { $ClickedStore.now } </p>
        <p> message: { $ClickMoveStore }  </p>
        <p> POV: { $RealPOVStore }  </p>
        <p>
            <button class="button is-danger" on:click={ () => show_promote_modal() }>
                Show Promote Modal
            </button>
        </p>
    </div>
{/if}
<style>
    svg {
        display: block;
        position: relative;
        background-color: lightgrey;
    }
</style>

