
# this is an old work

Nice to have : access time constant, either considering :
- refs
- side
- quality
- side & quality

    class Board {

      constructor() {
        this.byRef = new Map()
        this.bySide = new Map()
        this.byQuality = new Map()
        this.byID = new Map()
        // or, by ObtainRef

      }

      drop(ref, chessman) {
        let refKey = ref.key
        let sideKey = chessman.side.name
        let qualityKey = chessman.quality

        // by ref
        this.byRef.set(refKey, chessman)

        // by side
        if(!this.bySide.has(sideKey))
          this.bySide.set(sideKey, new Set())

       this.bySide.get(sideKey).add(chessman)

        // by quality
        // by side
        if(!this.byQuality.has(qualityKey))
          this.bySide.set(qualityKey, new Set())

        this.byQuality.get(sideKey).add(chessman)
      }
    }
