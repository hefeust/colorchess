                  
<script>
    import 'bulma/css/bulma.css'
    import Legend from './Legend.svelte'
    import Options from './Options.svelte'
    import Board from './Board.svelte'
</script>

<Board />

<section class="section">
    <h1 class="title is-1">
        ColorChess
    </h1>
    <h2 class="subtitle is-2">
        Colorized tactical helper for playing chess
    </h2>
    <Options />
    <Legend />
</section>


