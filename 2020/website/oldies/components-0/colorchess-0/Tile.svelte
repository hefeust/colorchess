
<script>
    export let ref = '**'
    export let ridx = 0
    export let cidx = 0

    const DIMS = 1.0

    const is_vertical_bound = () => {
        if(cidx === 0) return true
        if(cidx === 9) return true
    
        return false
    }

    const is_horizontal_bound = (cidx, ridx) => {
        if(ridx === 0) return true
        if(ridx === 9) return true
    
        return false
    }

    const get_html_class = (cidx, ridx) => {
        if(is_vertical_bound(cidx, ridx)) return 'is-bound'
        if(is_horizontal_bound(cidx, ridx)) return 'is-bound'

       if((cidx + ridx) % 2) {
            return 'is-black'
        } else {
            return 'is-white'
        }
    }

    const get_coords = (cidx, ridx) => {
        let x = (cidx - 1) * DIMS
        let y = (ridx - 1) * DIMS

        if(cidx === 0) x += 0.5 * DIMS
        if(ridx === 0) y += 0.5 * DIMS

        return { x, y }
    }

    const get_dimensions = (cidx, ridx) => {
        let width = DIMS
        let height = DIMS

        if(is_vertical_bound(cidx, ridx)) {
            width /= 2
        }

        if(is_horizontal_bound(cidx, ridx)) {
            height /= 2
        }

        return { width, height }
    }

    const coords = get_coords(cidx, ridx)
    const dims = get_dimensions(cidx, ridx)
    const rx = 0.0125 * DIMS
    const ry = 0.0125 * DIMS

    const cell = { 
        ref, 
        class: get_html_class(cidx, ridx), 
        x: coords.x, 
        y: coords.y, 
        width: dims.width, 
        height: dims.height, 
        rx, 
        ry
    }
    
</script>

<rect {...cell} />

<style>
    .is-white {
        stroke: black;
        stroke-width: 0.025;
        fill: #999999;
    }

    .is-black {
        stroke-width: 0.025;
        stroke: white;
        fill: #666666;
    }

    .is-bound {
        fill: #7f7f7f;
    }
</style>
