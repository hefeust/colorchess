
<script>
    import { onMount } from 'svelte'
    import { engine } from '@stores/engine.js'

    onMount(() => {
        console.log(engine)
    })
</script>

<h1 class="title is-1">
    Options
</h1>

<textarea cols="40" rows="40">
    { $engine }
</textarea>

<style>
    textarea {
        font-size: 1em;
        font-family: Courier;
        font-weight: bold;
    }
</style>

