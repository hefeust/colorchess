
export const get_board_utils = (pov, size) => {

    const is_v_bound = (cidx, ridx) => {
        return cidx * (cidx - 9) === 0
    }

    const is_h_bound = (cidx, ridx) => {
        return ridx * (ridx - 9) === 0
    }

    const is_corner = (cidx, ridx) => {
        return is_v_bound(cidx, ridx) && is_h_bound(cidx, ridx)
    }

    const is_board = (cidx, ridx) => {
        return !is_v_bound(cidx, ridx) && !is_h_bound(cidx, ridx)
    }

    const get_coords = (cidx, ridx) => {
        let x = (cidx - 1) * size 
        let y = (ridx - 1) * size 

        if(cidx === 0) x += 0.5 * size
        if(ridx === 0) y += 0.5 * size

        return { x, y }
    }

    const get_dims = (cidx, ridx) => {
        let width = size
        let height = size

        if(is_v_bound(cidx, ridx)) {
            width /= 2
        }

        if(is_h_bound(cidx, ridx)) {
            height /= 2
        }

        return { width, height }
    }

    const get_tile_color = (cidx, ridx) => {
        switch(pov) {
            case 'north':
            case 'south':
                if((cidx + ridx) % 2) {
                    return 'is-black'
                } else {
                    return 'is-white'
                }
            break

            case 'east':
            case 'west':
                if(((cidx + ridx) % 2) === 0) {
                    return 'is-black'
                } else {
                    return 'is-white'
                }
            break
        }
    }

    const get_label_coords = (cidx, ridx) => {
        const coords = get_coords(cidx, ridx)
        const dims = get_dims   (cidx, ridx)
        let x = 0
        let y = 0

//        console.log({ coords, dims })

        if(is_board(cidx, ridx)) {
            x = coords.x + 0 * dims.width
            y = coords.y + 0 * dims.height
        } else if(is_corner(cidx, ridx)) {
            x = coords.x + 0.50 * dims.width   
            y = coords.y + 0.50 * dims.height
        } else if(is_h_bound(cidx, ridx)) {
            x = coords.x + 0.50 * dims.width
            y = coords.y + 0.50 * dims.height
        } else if(is_v_bound(cidx, ridx)) {
            x = coords.x + 0.50 * dims.width
            y = coords.y + 0.50 * dims.height
        }

        return { x, y }
    }

    return {
        is_h_bound,
        is_v_bound,
        is_corner,
        is_board,
        get_dims,
        get_coords,
        get_tile_color,
        get_label_coords
    }
}


