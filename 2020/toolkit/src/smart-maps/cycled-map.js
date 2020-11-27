

/**
 * convert a linear list to a cycled list
 *
 * work with lists of primitie (scalar) types
 * work better if there a no doubles inside the list !!!
 *
 * @param { Array <any> } 
 * @returns Map
 */
export const create_cycled_map =  (list) => {
  const cm = new Map ()
  const last = list.length - 1
  
  list.map ((item, idx) => {
    const prev = idx > 0 ? list [idx - 1] : list [last]
    const next = idx < last ? list [idx + 1] : list [0]   
    const entry = { item, prev, next }
    
    // cm [item] = entry
    cm.set(item, entry)
  })
  
  return cm
}
