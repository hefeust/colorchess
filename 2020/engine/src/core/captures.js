
export const create_captures = (options) => {
 
    const pieces = []
 
    const submit = (piece) => {
        if(!piece) return null
    
        pieces.push ( piece )
    }
 
    const list = (side) => {
        return pieces.filter ((piece) => piece.side === side)
    }
 
    const _each = ((cb) => {
        pieces.map ((c, cidx) => cb(cidx, c))
    })

    const fork = () => {
        const forked = create_captures()
    
        pieces.forEach((piece) =>  forked.submit(piece))
        
        return forked
    }

    const toString = () => {
        const texts = ['### CAPTURES ###']
        
        
        
        return texts.join ('\n') + '\n'
    }
 
    return {
        submit, list,  fork, toString
    }   
}