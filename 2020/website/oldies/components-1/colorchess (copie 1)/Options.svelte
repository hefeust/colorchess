
<script>
    import { onMount } from 'svelte'
    import { pov_names, pov_options } from '@game/pov-options.js'

    let selected
</script>

<section class="section">
    <h1 class="title is-1">
        Options
    </h1>
    <div>
        {#each pov_names as pov_name }
            <button class="button" 
                on:click={ () => pov_options.setup(pov_name) }
                class:is-selected={ pov_name === $pov_options }>
                { pov_name }
            </button>
        {/each}
   </div>

    <span> { $pov_options } </span>
</section>

<style>
    textarea {
        font-size: 1em;
        font-family: Courier;
        font-weight: bold;
    }

    .is-selected {
        background-color: #bada55;
    }
</style>

