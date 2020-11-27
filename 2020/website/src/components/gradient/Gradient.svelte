
<script>
    export let rows = 4
    export let cols = 4
    export let selection = []
    export let rankings = []

    let graident = []
    let focused = -1
    let total = cols * rows

    const focus = (index) => {
        if(focused === -1) {
            focused = index
        } else {
            // swap color with previously focused
        }
    }

    
    $: {
        
    }
</script>

<div class="gradient">
    {#each graidient as color, idx } 
        <div class="cell" on:click={ () => focus(idx) } style={ 'background-color:' + color + ' ;' }>
        </div>    
    {#each}
</div>

<!-- show selection and name, dismiss color action -->
<div class="rankings">
    
</div>
