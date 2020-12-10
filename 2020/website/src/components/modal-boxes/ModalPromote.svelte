
<script>
    import { FlagStores } from '@stores/FlagStores.js'
    import { ShowPromoteModal } from '@stores/ModalStores.js'
    import { promote_pieces } from '@helpers/promote-pieces.js'

    const promote_choices = (current_player) => {
        let results = []

        if(current_player === 'black') {
            results = promote_pieces.black
        }

        if(current_player === 'white') {
            results = promote_pieces.white
        }

        results = results.map((piece) => {
            piece.path = 'chess-sprites/' + piece.name + '.png'

            return piece
        })

        return results
    }

    const handle_submit = () => {
       ShowPromoteModal.update((state) => false)
    }

    let show_promote_modal = false       
    let user_choice = null
    let user_select = -1

</script>

<div class="modal { $ShowPromoteModal ? 'is-active' : ''}">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <h1 class="title is-3">
                pawn promotion
            </h1>
            <h2 class="subtitle is-4">
                select piece promote with...
            </h2>
        </header>
        <div class="modal-card-body">
            <div class="columns centered is-mobile">
                {#each promote_choices($FlagStores('current-player')) as piece, index}
                    <div class="colmuns is-3">
                        <div class="box { index === user_select ? 'has-background-danger' : '' }">
                            <figure on:click={() => { user_choice = piece.fen; user_select = index; } } class="image is-rounded is-64x64">
                                <img src={ piece.path } title={ piece.name } />
                            </figure>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        <footer class="modal-card-foot">
            <button class="button is-info" on:click={ () => handle_submit() } >
                Validate
            </button>
        </footer>
    </div>
</div>

