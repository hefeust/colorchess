
~ This is an old work 

Engine modules set
==================

Engine contains all the mechanic useful to generate possible moves and determioning moving capabilities of chessmen for each turn.

The RayCaster is responsible of mixing rays and detecting interactions between them (crossing or shadowing), crossing exprims the fact that two rays refs sequences have a common ref : it's useful to determine castling ability and en-passant capturing; shadowing denotes the fact that a Ray sequence contains a strting ref of another ray (this means that another chessman is on the ray path) and this affects the moving ability of the chessman who have emitted it.

ES2015 Maps are used for implementing the RayCaster since their access is time-constant (hash maps) so they maintain two maps of arrays :

- starting : rays are ordered by starting reference
- endings : rays are ordered by sequence

    class RayCaster {
      constructor() {

        // <ref> --> <list of rays starting at ref>
        this.startings = rew Map()

        // <ref> --> <list of rays pathing at ref>
        this.endings = new Map()

        this.counters = { rays:0, touches: 0 }
      }

      casts(board) [
        this.counters.rays = this.addRaysFrom(board)
        this.counters.touches = this.computeTouches()
      ]
    }
