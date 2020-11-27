
export const real_pov = (pov_name, side_to_move) => {
    console.log({ real_pov : pov_name })

    if(pov_name === 'auto') {
        if(side_to_move === 'black') return 'north'
        if(side_to_move === 'white') return 'south'
    } else { 
        return  pov_name
    }
 }
