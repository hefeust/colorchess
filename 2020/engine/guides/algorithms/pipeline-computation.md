
# Futures, and Ghosts and Spies algorithms 

##  Basic positions

A single position object is consisting of:
- a board, bked by a mapping <ref> => <piece>
- the game flags map <key> => <value> pairs
- the captures list of { piece }

## trie tree data structure for context

Trie trees allows to store data in a way that is accessible by a selector path.

In ColorChess path segments are move definitions string representation themselves. E.G :

    #int!/.../.../a2:a3/g2:g1=N
    
Each segment is a move, and segments are separated by a slah "/". 
Move are represented by start:end(=fen_promote). Castling are only denoted by start:end positions of the king.

Under each segment of the path lives a position (board, flags, captures, move?) and a whole game session is the sequence off positions given by the path.

## Rules pipeline

## Seup steps

setup base position under '#init!' selector (setup)

## Ply Turn process

compute raycasts for position N

iterate pipeline stafges and apply stage
- if stage generates futures, take N as base
- if stage computes spies take {N+1} as base
- if stage computes ghosts take {N-1} as base

when the current player ends his turn
- select future inside  {N+1} list items
- forget the {N} ghosts
- truncate {N} spies tree... they bacome ghosts for next turn
- recompute spies for the N+1 entry


SETUP NOW
rule.raycasts()
rule.generate()

F[1] F[2] ... F[max]

For each F[]
    compute raycasts RC[i]
    generate list { FF[i] }


