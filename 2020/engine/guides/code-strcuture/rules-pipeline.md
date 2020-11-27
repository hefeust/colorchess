
# Rules pipeline

The move generator is divided in a few dozen of rules  to seaprate concerns and limit files sizes.

Each rule is  applied to a position or its futures :

* Cast (on futures)
* Make (on present position)
* Tests (either on present or on futures)

The context object stores positions, historized, present and futrres in a Trie (prefix tree) provided by the Colorchess toolkit.

## cast rules

compute raycasts for the actual position. 
Applied to immediate futures of the positions in present.

* cast-delta-moves
* cast-pawn-moves
* cast-castling-moves

## make rules

compute raycasts for the actual position. 
Applied to immediate futures of the positions in present.

* make-delta-moves
* make-pawn-moves
* make-castling-moves

## test moves

* test-checkings
* test-ending
* ply-turn

