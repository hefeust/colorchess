
<script>
    import { UserPOVStore } from '@stores/POVStores.js'

    const povs = [
        { name: 'north', label: 'black' },
        { name: 'south', label: 'white' },
        { name: 'east', label: 'right' },
        { name: 'west', label: 'left' },
        { name: 'auto', label: 'automatic'}
    ]

    const set_user_pov = (pov_name) => {
//        alert(pov_name)
        UserPOVStore.update((state) => pov_name)
    }
</script>

<h2 class="title is-3">
    Point-Of-View
</h2>

<div class="columns is-mobile is-multiline">
    {#each povs as pov }
        <div class="column is-3">
            <button class="button is-medium" on:click={ () => set_user_pov(pov.name) } 
                class:is-info={ pov.name === $UserPOVStore}>
                { pov.label}
            </button>
        </div>
    {/each}
</div>

<style>
    .selected {
        background-color: #db6925;
    }
</style>

