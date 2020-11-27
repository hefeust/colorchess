
# this is on old work

Chessmen modules set
====================

This set of modules are concrete implementations of chessmen

- King
- Queen
- Rook
- knight
- Bishop
- Pawn
- WeakKing : a dummy chessman, with kings delta moving abilities, only for computations

According to src/core/Chessman.js "abstract" super class, chessmen are resposible of emiting rays through two methods like :

    casts(ref) {
      return []  
        .concat(this.deltaCasts(refs))
        .concat(this.specialCasts(refs))
    }

where deltaCast(ref) compute rays emittted from a given ref, using a basic formula, using directional deltas (dcol, drow) and iterative characteristics (true or false) for the considered chessman

and specialCast(ref) is for pawns, rooks and king (castling), rays are obteined with a more complicated algorithm, for instancz the pawn :

    specialCasts(ref) {
      return []
        .concat(this.simpleMoveCast(ref))  
        .concat(this.firstMoveCast(ref))  
        .concat(this.caputreCast(ref))  
        .concat(this.promoteCast(ref))  
        .concat(this.enPassantCast(ref))  
    }

No matter where the pawn is on board, a cast can return an empty array, and pawn.side (Sides.BLACK or Sides.WHITE) holds the necessary to compute rays.

For all other chessmen, but not King, special casts returns an empty array :

    specialCasts(ref) {
      return []
    }

Rays can be cated for any valid ref, their application (possible or not) is computed by the RayCaster (src/engine/RayCaster), which mixes all rays and according to flags state at each game turn.

    |QUALITY |ITERATIVE|DELTA MOVES|SPECIAL MOVES                   |
    |King    |no       |yes        |castlings (king and queen sides)|
    |Queen   |yes      |yes        |no                              |
    |Rook    |yes      |yes        |castlings support               |
    |Bishop  |yes      |yes        |no                              |
    |Knight  |no       |yes        |no                              |
    |Pawn    |no       |no         |simple,first,promote, en passant|
    |WeakKing|yes      |yes        |no                              |

