
/**
    This is an attempt to speed up the problem of computing two lists iintersection.
*/

/**
    Let's start quitely with some useful functions
*/

// what is the length of an interval defined with its min and max indices ?
const ii_length = (ii) => ii.max - ii.min + 1

// dump this interval, please !
const ii_dump  = (ii) => `interval length=${ii_length(ii)}: ${ii.min} ${ii.max} `

// do intervals taken inside two lists overlap ?
const ii_overlaps = (arrays, intervals) => {
    const { arr1, arr2 } = arrays
    const { i1, i2 } = intervals
    
//    console.log(intervals)
    
    const i1min = arr1[i1.min]
    const i1max = arr1[i1.max]
    const i2min = arr2[i2.min]
    const i2max = arr2[i2.max]
    
    return i1min <= i2max && i2min <= i1max
}

const ii_compare = (arrays, intervals) => {
    const { arr1, arr2 } = arrays
    const { i1, i2 } = intervals
    
//    console.log(intervals)
    
    const i1min = arr1[i1.min]
    const i1max = arr1[i1.max]
    const i2min = arr2[i2.min]
    const i2max = arr2[i2.max]
    
    if(i1min <= i2max && i2min <= i1max) {
        return 0
    } else {
        if(i1max < i2min) return -1
        if(i2max < i1min) return 1
    }
}


// apply a callback function to each element of a slice of an array
const ii_iterate = (arr, ii, callback) => {
    return arr.slice(ii.min, ii.max + 1).map((val, idx) => {

        return callback(val, idx)
    })
}

// cut an interval as clse as possible to its middle
const ii_dichotomy = (ii) => ii.min + Math.floor((ii.max - ii.min) / 2)

// given a list of intervals, cut them all one time
const binary_split = (intervals) => {
    const results = [];
        
    intervals.map((ii) => {
        const DICHO = ii_dichotomy(ii)
           
        results.push({ min: ii.min, max:      DICHO })
        results.push({ min: DICHO +1, max: ii.max })
    })
        
    return results
}

// basic intersection code
// allows lists to handle duplicates
const dumb_intersect = (arrays, intervals, params) => {
    const { arr1, arr2, results }  = arrays
    const { matches} = params
    const { i1, i2 } = intervals
    
    ii_iterate(arr1, i1, (value, rank) => {    
        const count = matches.get(value) || 0
        
  //      console.log({ matches: value })
        
        matches.set(value, count + 1)
    })
    
    ii_iterate(arr2, i2, (value, rank) => {
        const count = matches.get(value) || 0
   
//        console.log({ counts: value, count })   
        
        if(count > 0) {
            results.push(value)
            
            if (count > 1) {
                matches.set(value, count - 1)
            } else {
                matches.delete(value)
            }
        }
    })
}

// the slow version of intersect
export const intersect = (arr1, arr2, options) => {
    const results = []
    const arrays = { arr1, arr2, results }
    const matches = new Map()
    const params = { matches }
    
    const intervals = {
        i1: { min: 0, max: arr1.length - 1 },
        i2: { min: 0, max: arr2.length - 1 }
    }    

    dumb_intersect(arrays, intervals, params)
    
    return results
}

// the fast attempt version of intersect
// @TODO: does not work yet ptoperly, do no export !!!
const fast_intersect = (arr1, arr2, options) => {
    const results = []
    const arrays = { arr1, arr2, results }

    const matches = new Map()
    const params = { matches }
    
    const thresold = 5
    const ii_checked = new Map()

    let i1 = { min: 0, max: arr1.length - 1}
    let i2 = { min: 0, max: arr2.length - 1}    
    let b1 = [i1]
    let b2 = [i2]    
    let mins = Math.min(arr1.length, arr2.length)
    let cuts = 1
    
   
    // compute cuts
    while (mins > 2 * thresold) {
        b1 = binary_split(b1)
        b2 = binary_split(b2)
    
        mins /= 2
        cuts *= 2
    }
    
    let idx1 = 0
    let idx2 = 0
    let grow1 = 0
    let grow2 = 0    
    let test0 = false
    let test1 = false
    let test2 = false
    
    // arr1:  1   1   1   2   2   3   4   8   9   15
    // arr2:  1   1   2   2   3   4   5   6   10  11
    // racer: 0   0   1   0   1   1   1   -1  1   -1
    
   
    while( true )  {
        if(idx1 + grow1 >= cuts) break
        if(idx2 + grow2 >= cuts) break
            
        test0 = ii_compare(arrays, { i1: b1[idx1], i2: b2[idx2] })            
        test1 = ii_compare(arrays, { i1: b1[idx1 + grow1], i2: b2[idx2] })            
        test2 = ii_compare(arrays, { i1: b1[idx1], i2: b2[idx2 + grow2] })            
        
        switch(test0) {
            case 0:
                dumb_intersect(arrays, { i1: b1[idx1], i2: b2[idx2] }, params)
                idx1 += 
                grow1 = 0
                grow2 = 0
            break
            case -1:
                grow2++                
            break
            case 1:
                grow1++
            break
        }
        
        if(test1 === 0) {
            grow2--
        }

        if(test2 === 0) {
            grow1--
        }
    } 
           
    return results
}

