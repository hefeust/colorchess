
<script>
    import { onMount } from 'svelte'
    import { ColorStore, UserColorStore } from '@stores/ColorStores.js'

    import { get_board_utils } from '@helpers/board-utils.js'
    import { fullname } from '@helpers/pieces-fullnames.js'

    const SIZE = 1.0    

    export let pov_name = null
    export let ref = null
    export let cidx = -1
    export let ridx = -1
    export let col = ''
    export let row = ''

    // @TODO: use board_utiks to compute coords and dimensions

    const opacity = (colorscheme) => {
        if(colorscheme === 'none') return 0.0
        if(colorscheme === 'transparent') return 0.55
        if(colorscheme === 'full') return 1.0

        return 0.5
    }

    
    let color

    $: color = ColorStore(ref)

</script>
<g class={ `color_${ ref }_col_${ cidx }_row_${ ridx}`}>
    <rect fill={ $color  }
        opacity={ opacity($UserColorStore ) }
        x={ (cidx - 1) * SIZE } 
        y={ (ridx - 1) * SIZE } 
        width={ SIZE } 
        height={ SIZE }  />
</g>

