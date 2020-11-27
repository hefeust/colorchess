
const black = new Map()
const white = new Map()

black.set('name', 'black')
black.set('delta-row', -1)
black.set('start-row', 7)
black.set('promote-row', 1)
black.set('O-O-king', ['e8', 'f8', 'g8'])
black.set('O-O-rook', ['h8', 'g8', 'f8'])
black.set('O-O-O-king', ['e8', 'd8', 'c8'])
black.set('O-O-O-rook', ['a8', 'b8', 'c8', 'd8'])
   
white.set('name', 'white')
white.set('delta-row', 1)
white.set('start-row', 2)
white.set('promote-row', 8)
white.set('O-O-king', ['e1', 'f1', 'g1'])
white.set('O-O-rook', ['h1', 'g1', 'f1'])
white.set('O-O-O-king', ['e1', 'd1', 'c1'])
white.set('O-O-O-rook', ['a1', 'b1', 'c1', 'd1'])

const sides = { black, white }

export const get_side_param = (name, key) => {
    const side = sides[name]

    if(side) {
        return {
            name, key, value: side.get(key)
        }
    }
        
    return { error: 'no side named: ' + name}
}

/*
const next = (position, options) => {
    const CURRENT_PLAYER = 'current-player' 
    const gas = options.gas || false
    const cp = position.flags.value(CURRENT_PLAYER)
    
    if(!gas) {
        switch(cp) {
-            case 'black': 
                position.flags.setup(CURRENT_PLAYER, 'white')
            break            
            case 'white': 
                position.flags.setup(CURRENT_PLAYER, 'black')
                break            
        }
    
    }
}

export const sides = {
    black, white, 
    next
}
*/
