
<script>
    import { UserDebugStore } from '@stores/UserDebugStore.js'

    const levels = [
        { name: 0, label: 'hidden' },
        { name: 1, label: 'lite' },
        { name: 2, label: 'verbose' }
    ]

    const set_user_level = (debug_level) => {
//        alert(pov_name)
        UserDebugStore.update((state) => debug_level)
    }
</script>

<h2 class="title is-3">
    Debug level
</h2>

<div class="columns is-mobile is-multiline">
    {#each levels as level }
        <div class="column is-3">
            <button class="button is-medium" on:click={ () => set_user_level(level.name) } 
                class:is-info={ level.name === $UserDebugStore}>
                { level.label}
            </button>
        </div>
    {/each}
</div>

<style>
    .selected {
        background-color: #db6925;
    }
</style>

