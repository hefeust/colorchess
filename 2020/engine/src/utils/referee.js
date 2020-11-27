
export const create_referee = () => {
    const state =  { 
        sequence_counter: 0, 
        action_counter: 0,
        sequence_name: null,
        messages: []
    }
    
    const format_stamps = () => {
        const sc = state.sequence_counter.padStart(4, ' ')
        const ac = state.action_counter.padStart(2, '0')

        return `[${sc}:${ac}]`
    }

    const open = (sequence_name) => {

        const message = 'Opening sequence'                
    }

    const close = () => {

    }

    const step = (action) => {}

    const debug = (soemthing) => {}

    const success = (message) => {

    }

    const failure = (message) => {
    
    }


    const flush = () => {}

    // clear messages
    const clear = () => {}

    // reset stamps
    const reset = () => {}

    return {
        open, close, success, failure
    }
}
