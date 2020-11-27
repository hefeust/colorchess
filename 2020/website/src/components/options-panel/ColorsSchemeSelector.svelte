
<script>
    import { UserColorStore } from '@stores/ColorStores.js'

    const colorschemes = [
        {
            name: 'none',
            label: 'standard'
        },
        {
            name: 'transparent',
            label: 'transparent'
        },
        {
            name: 'full',
            label: 'colored'
        }
    ]

    const set_user_colors_sceme = (cs_name) => UserColorStore.update((state) => cs_name)
</script>


<h2 class="title is-3">
    Color Scheme
</h2>

<div class="columns is-mobile is-multiline">
    {#each colorschemes as cs }
        <div class="column is-3">
            <button class="button is-medium" on:click={ () => set_user_colors_sceme(cs.name) } 
                class:is-info={ cs.name === $UserColorStore }>
                { cs.label}
            </button>
        </div>
    {/each}
</div>

