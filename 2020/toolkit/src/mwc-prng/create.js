
/**
 * create a new Multiply-With-Carry pseudo random number  generator
 * 
 * @param {number} a - the multiplier chaeacteristic of the MWC PRNG
 * @param {number} b - digits number of positions
 * @param {number} r - number of digits (generator lag)
 * @returns {Object} generator instance
 */
export const create_mwc = (a, b, r) => {

  const values = new Array (2 * r)
  let lag = 0
  let idx = (lag + r) % (2 * r)

  const init = (seeds) => {
    // if(!seeds.length) { throw new Error('seeds must be a lenfth of  2 * r = ' + 2 * r) }
//    console.log ('seeding...', seeds)

    
    seeds.map ((s, idx) => {
      values[idx] = s 
    })
  }
  
  /**
   * one generator step
   * 
   * adapted friom wikipeida:
   * 
   * https://en.wikipedia.org/wiki/Multiply-with-carry_pseudorandom_number_generator
   * 
   * @returns {Array}
   */
  const step = () => {

  // values and carries stored in the same array
    const result = new Array(r)
    const xn =            (a * values[idx] + values[lag]) % b
    const cn = Math.floor((a * values[idx] + values[lag]) / b)

    idx = (idx + 1) % (2 * r)
    lag = (lag + 1) % (2 * r)
    
    values[idx] = xn
    values[lag] = cn
          
    for(let i = 0; i < r; i++) {
      result[i] = values[(lag + i + 1) % (2 * r)]
    }

//    console.log ('step: ', result)
       
    return result    
  }
  
  /**
   * to avoid need of keeping lag in values array,
   * we invoke 2 * r  times the step() function 
   * so lag is always 0 through two consecutive next() calls
   * 
   * @returns {Array} 
   */
  const next = () => {
//    console.log ('next', values)
    let result = []
    
    for (let k = 0; k < 2 * r; k++) {
       result = step()
    }

    
    return result
  }

  /**
   * to save the state for future use
   * 
   * create and new MWC and init it with the getState() output
   * 
   * @returns {Array}
   */  
  const get_state = () => {
    return values
  }
  
  return { init, next, get_state }
}
