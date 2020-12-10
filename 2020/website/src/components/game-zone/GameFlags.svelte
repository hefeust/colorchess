
<script>
    import { FlagStores } from '@stores/FlagStores.js'

    let show_flags_modal = false

    const castlings = (oo, ooo) => {
        if(oo && ooo) {
            return 'Both king and queen sides'
        } else if(oo) {
            return 'only king side (O-O)'
        } else if(ooo) {
            return 'only queen side (O-O-O)'
        } else {
            return 'no more castling abilities'
        }
    }
</script>

<div class="container">
<div class="columns is-mobile has-background-light">
    <div class="column is-one-third">
        <p class="content is-size-3 is-size-6-mobile">
            <span>{ ($FlagStores)('ply-turn') }. </span>
            <span>{ ($FlagStores)('half-turn') === 0 ? '' : '...' }</span>            
            <span>{ ($FlagStores)('current-player') }</span>
        </p>
    </div>
    <div class="column is-one-third">
        <p class="content is-size-3 is-size-6-mobile">
            <span>{ ($FlagStores)('is-check') ? '[check]' : '' } </span>
            <span>{ ($FlagStores)('is-end') ? '[end]' : '' } </span>
        </p>
    </div>
    <div class="column is-one-third">
        <p class="content">
            <button class="button is-info" on:click={ () => show_flags_modal = true }>
                show all flags
            </button>
        </p>
    </div>
</div>
</div>

<div class="modal { show_flags_modal ? 'is-active' : '' }">
    <div class="modal-background"></div>
    <div class="modal-card is-light">
        <header class="modal-card-head">
            <h1 class="title is-3">
                All game flags
            </h1>
        </header>
        <section class="modal-card-body">

            <h2 class="title is-4">
                Game globals
            </h2>

            <p class="content is-large">
                Ply-Turn: { $FlagStores('ply-turn')}
            </p>
            
            <p class="content is-large">
                Helf-Turn: { $FlagStores('half-turn')}
            </p>

            <p class="content is-large">
                Current-Player: { $FlagStores('current-player')}
            </p>

            <p class="content is-large">
                Game-Status: 
                { $FlagStores('is-check') ? 'is-checked' : ''}
                { $FlagStores('is-end') ? 'is-end' : 'still-playing'}
            </p>

            <p class="content is-large">
                En-Passant: { $FlagStores('en-passant') || 'not-active-now'}
            </p>

            <h2 class="title is-4 is-large">
                Castling abilities
            </h2>

            <p class="content is-medium">
                White side: 
                { castlings( $FlagStores('white-O-O'), $FlagStores('white-O-O-O'))}
            </p>

            <p class="content is-medium">
                Black side: 
                { castlings( $FlagStores('black-O-O'), $FlagStores('black-O-O-O'))}
            </p>
        </section>

        <footer class="modal-card-foot">
            <button class="button is-info" on:click={ () => show_flags_modal = false }>
                Close flags
            </button>
        </footer>
    </div>
    <button class="modal-close is-large" 
        aria-label="close"
        on:click={ () => show_flags_modal = false }></button>
</div>


