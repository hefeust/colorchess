
# Technical details

This is about chess moves generation inside ColorChess.

## the raycaster

First we consider indicidual pieces moves for all qualities.

Basically it appears that all major pieces emit rays of influence which propagate other the board. 

These rays are described by a simple formula with offsets regarding to their starting square: this is so called "DELTA" moves.

The major pieces are ITERATIVE: they move by somehow amount of squares, then stop;  knight and king are DELTA pieces, but not ITERATIVE.

Pawns move strangely and them seem to have only special moves; in fact they do : just they only cast OFFSETS and CAPTU%RE rays (special moves).

OFFSET move are also casts by kings and rook for castlings.

```
<pre>

| quality | iterative | DELTAS   | specials            |
| king    | NO        | 8        | castling offsets: 2 |
| queen   | yes       | 8        |                     |
| rook    | yes       | 4        | castling offsets: 1 |
| bishop  | yes       | 4        |                     |
| knight  | NO        | 8        |                     | 
| pawn    | NO        | 0 (none) | OFFSETS, CAPTURES   |
</pre>
```

## the rules pipeline

The rules are divided in 3 sets:

* cast-moves 
* make-moves
* test moves

** see code for details .... **
