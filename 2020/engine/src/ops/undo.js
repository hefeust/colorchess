
export const ops_undo = (ctx) => {
    const gamestate = ctx.history.pop()
    let status = 'reverting: ok'

    ctx.futures.clear()
    
            

    return status
}
