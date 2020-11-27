
export const SILENT = 0
export const LOG = 1
export const DEBUG = 2

export const setup_log_level = (mode) => {
    level = mode    
    counter = 0
}

export const log = (something) => {
    if (level === SILENT) return null

    counter++

    if(level === DEBUG) console.log()
    console.log ('[' + counter + ']: ' + something)
    if(level === DEBUG) console.log()
}

export const debug = (something) => {
    if (level === SILENT) return null
    if (level === LOG) return null

    console.log('## DEBUG ##')
    console.log(something)
    console.log( '===========')
}

let counter = 0
let level = SILENT
