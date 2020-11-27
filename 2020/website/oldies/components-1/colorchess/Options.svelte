
<script>
    import { onMount } from 'svelte'
    import { stored_pov, pov_names } from '@game/stored-pov.js'

</script>

<section class="section">
    <h1 class="title is-3">
        Point of View
    </h1>
    <div>
        {#each pov_names as pov_name }
            <button class="button" 
                on:click={ () => stored_pov.setup(pov_name) }
                class:is-selected={ pov_name === $stored_pov }>
                { pov_name }
            </button>
        {/each}
   </div>

    <span> { $stored_pov } </span>
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

