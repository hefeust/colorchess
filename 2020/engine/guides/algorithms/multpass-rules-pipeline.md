

# stages types

* cast
* make
* test

# from starting position

    # iteration 0
    source: each [#sart! one single element]
    apply: +cast +make +test
    produce: [array of spubpaths]
    side-effects: none

    # iteration 1
    source: each  [#start!/subpath]
    apply: +cast -make +test
    prodcuce: []
    side-effect: test legal --> futures.length of #start 'en-test)    

    # select variation @subpath
    # iteration 0:
    source: each [#start/subpath[level=1]]
    apply: -cast +make +test
    produce: [array of spubpaths[level=2]]
    side-effects: none

    source: each  [#start!/subpath]
    apply: +cast -make +test
    prodcuce: []
    side-effect: evaluate legallity --> futures length of #start 'en-test)    


# search with with 2 levels

    #[depth=0] from #start!
    0: +cast +make +test
    1: +cast +make +test  [0]

    #[depth=1] from selected [0]
    1: -cast +make +test
    2: +cast -make +9test [2] 


# search with with 4 levels

    #[depth=0] from #start!
    0: +cast +make +test
    1: +cast +make +test  [0]
    2: +cast +make +test  [1]
    3: +cast -make +test  [2]

    #[depth=0] from #start!
    1: -cast -make -test  
    2: -cast -make -test  
    3: -cast +make -test  
    4: +cast -make +test  [3]

# Evaluation order [DEPTH=4]
    
    [dmin=0, dmax=dim+DEPTH-1]
    0: skip-test
    1: skip-test
    2: skip-test
    3: skip-make
    3: just-test
    2: skip-cast skip-make (just-test)
    1: skip-cast skip-make (just-test)
    0: skip-cast skip-make (just-test)
     [dmin=1, dmax=dim+DEPTH-1]
    1: skip-cast skip-make skip-test (skip-all)
    2: skip-cast skip-make skip-test (skip-all)
    3: skip-cast skip-test (just-make)
    4: skip-make
    3: skip-cast skip-make (just-test)
    2: skip-cast skip-make spkip-test (skip-all)
    1: skip-cast skip-make skip-test (skip-all)

    []
    i: skip-all
    i+1: skip-all
    ...
    i+depth-2: just-make
    i+depth-1: skip-make
    i+depth-2: just-test
    ...
    i+1: skip-all
    i: skip-all

Algorithm:
    const DEPTH, a positive number, to be the propspection windw depth 
    let dmin and dmax, to be the current prospection bounds
    let i >= 0, the prespection step
    let d >= 0, the current prospection working depth
    let ops = [] the operations to operations to perform

    Initialisation time (i = 0)
        dmin = i
        dmax = i + DEPTH - 1
        for(k = 0, k <= 2 * DEPTH; k++) {
            d = (k < DEPTH) ? k : (DEPTH - k)

            if(k < DEPTH) ops[k] = 'skip-test'
            if(k == DEPTH) ops[k] = 'skip-make'
            if(k > DEPTH opd[k] = 'just-test'
        }

    Building steps (i > 0)




