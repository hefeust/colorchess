
export const create_referee = () => {

    const records = []

    // create a new action record 
    const begin = (action_name) => {

    }

    // close xurreznt action record
    const end = () => {}

    // add a generic step to current action
    const step = (description) => {}

    // add a success mark step to current action 
    const success = (text) => {}

    // add a failure mark step to current action 
    const failure = (text) => {}

    // flush actions
    const flush = () => {}

    // clear actions queue
    const clear = () => {}

    // dump memory as an array of actions
    const dump = () => {}

    // reset counters
    const reset = () => {}

    // stringification
    const toString  = () => {
        const texts = []

        texts.push('Colorchess Referee')
    }

    let current_action = {
        name: 'default-action',
        steps: []
    }

    return {
        begin, end, step, success, failure, flush, clear, dump, toString
    }
}
