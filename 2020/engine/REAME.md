
# README

This is the Colorchess engine program coded in JavaScript.

Its goal is to validate chess rules and perform move generation.

Work in Progress: see TODOS LIST and CHANGELOG when using it.

## Installation

Download and extract the project in ypur working folder, Then:


    npm install 

## Usage

    import { create_engine } from 'path/to/colorchess-folder/dist/index.js'

    const engine = create_engine( /* options */)

    const sequence = "e2:e4 e7:e5 f1:c4 d7:d6 g1:f3 c8:g4 b1:c3 g7:g6 f3:e5 g4:d1 c4:f7 e8:e7 c3:d5"

    let moves = sequence.split(' ')

    moves.map((move, midx) => {
        try {
            console.log('== playing: ' + midx + ' ' + move + ' ======')
            engine.play(move)
            console.log('' + engine)
        } catch(error) {
            console.log('ERROR!')
        }
    }) 
    
## API in brief

Some functions could move in the future. The minimum set is now:

    setup(options)

    // with move in Colorchess format SAN
    play(move)

    // start:end[=fen]
    // note: english fens, uppercase (white) or lowercased (black)
    // play('e2:e4')
    // play('h2:h1=q')

    // get the fen reference of chessman at square ref
    get_whois(ref)

    // get the list of possible moves from starting position
    get_futures()

    // return { key, value } pair
    get_flag_pair(flag_name)

    // get the pressions balance for a given square
    get_pressions(ref)

    // prettified output
    toString()

## Options    

    log_level (optional) in  [0, 1, 2]

## Documentation

Coding resources and guides are located in the guides folder.

[see guides](/guides)

## Author & Licence

Distributed under MIT licence.

The Colorchess Engine by hefeust, on november 2020.



