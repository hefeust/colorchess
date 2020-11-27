
EDIT: Thanks to previouscomments of @Bergi and @MattEllen, I have progressed in my thougths, so I repost this question.

Suppose that we have two sorted lists with duplicated values

    // here arr1.length = arr2.length = 16
    ar11 = 0 0 0 0 1 1 1 1 2 2 2 2 3 3 4 5 
    arr2 = 0 0 1 1 1 1 2 2 2 2 3 4 5 6 7 8
    
and we want to compute their interesection (isect)

    // duplicates preserved !
    isect = 0 0 1 1 1 1 2 2 2 2 3 4 5
    
we can use a simple linear algorithm adapted from Python version described inside: https://stackoverflow.com/questions/37645053/intersection-of-two-lists-including-duplicates

    // basic intersection code
    // allows lists to handle duplicates
    const dumb_intersect = (arrays, intervals, params) => {
        const { arr1, arr2, results }  = arrays
        const { matches} = params
        const { i1, i2 } = intervals
    
        ii_iterate(arr1, i1, (value, rank) => {    
            const count = matches.get(value) || 0
            matches.set(value, count + 1)
        })
    
        ii_iterate(arr2, i2, (value, rank) => {
            const count = matches.get(value) || 0
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

In this example: 
- matches is a global map, and it could be reused for later calls of dumb_intersect
- i1 = { min:0, max: 15 } and { min:0, max: 15 } (obvious!)
- ii_iterate takes a list and an interval, and applies  a callback to each element of the list when its index is bound to the interval

For the sake of simplicity I give you the code of ii_iterate:

    // apply a callback function to each element of a slice of an array
    const ii_iterate = (arr, ii, callback) => {
        return arr.slice(ii.min, ii.max + 1).map((val, idx) => {

            return callback(val, idx)
        })
    }

ALL THAT STUFF IS AWESOME, BUT I THINK I COULD DO BETTER AND FASTER !!!

Especially if we binary (dichotomic) serie of cuts of the intervals until a thresold:

    // THRESOLD = 4 elements
    cuts[0]: [0..15]                            # 1 interval * 16 elements
    cuts[1]: [0..7] [8..15]                     # 2 * 8
    cuts[2]: [0..3] [4..7] [8..11] [12..15]     # 4 * 4

... and apply dumb_intersect only of overlapping intervals

Normally, for huge lists thresold is computed easily:

    thresold = 1 + Math.floor(Math.log((1 + arr1.length) * (1 + arr2.length)))

    N = 1000    thresold = 15
    N = 1000000 thresold = 28
    
But this is a minor aspect of the problem. Bianry split process is also easy to do. Arr1 and Arr2 of the initial example becomes, with a thresold of 4 :


    ar11 = 0 0 0 0; 1 1 1 1; 2 2 2 2; 3 3 4 5
    arr2 = 0 0 1 1; 1 1 2 2; 2 2 3 4; 5 6 7 8
    
(remember that that could be large lists)




