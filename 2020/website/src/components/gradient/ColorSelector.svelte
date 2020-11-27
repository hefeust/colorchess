
<script>
    // values are clamped in the range [0..255]
    const dec = (value, amount) => (value >= 0 + amount) ? (value - amount) : 0
    const inc = (value, amount) => (value < 256 - amount) ? (value + amount) : 255

    const invert = () => {
        red = 255 - red
        green  = 255 - green
        blue = 255 - blue
    }
    
    export let red = 186
    export let green = 218
    export  let blue = 85

    let hovered
    let style = 'background-color: rgb(0, 0, 0);'
   
    $: style = `background-color: rgb(${red},${green},${blue});`
    $: hexa = '#' + ((1<<24) + (red<<16) + (green<<8)+ blue).toString(16).slice(1)
</script>


<div style="{ style }" 
    on:mouseover={ () => hovered = true} 
    on:mouseleave={ () => hovered  = false }>

    <p> 
        <span style="background-color: black; width: 8em;">
            Hex : { hexa }
        </span>

        <button on:click={ invert }>Inverse</button>
    </p>


    {#if  hovered }
        <hr />  

        <!-- red part -->
        <p>
            <button on:click={ () => red = dec(red, 16) }> -16 </button>
            <button on:click={ () => red = dec(red, 1) }> -1 </button>
            <span style="background-color: red;"> { ('' + red).padStart(' ', 2) } </span>
            <button on:click={ () => red = inc(red, 1) }> +1 </button>
            <button on:click={ () => red = inc(red, 16) }> +16 </button>
        </p>
        <!-- green part -->
        <p>
            <button on:click={ () => green = dec(green, 16) }> -16 </button>
            <button on:click={ () => green = dec(green, 1) }> -1 </button>
            <span style="background-color: green;"> { ('' + green).padStart(' ', 2) } </span>
            <button on:click={ () => green = inc(green, 1) }> +1 </button>
            <button on:click={ () => green = inc(green, 16) }> +16 </button>
        </p>
        <!-- blue part -->
        <p>
            <button on:click={ () => blue = dec(blue, 16) }> -16 </button>
            <button on:click={ () => blue = dec(blue, 1) }> -1 </button>
            <span style="background-color: blue;"> { ('' + blue).padStart(' ', 2) } </span>
            <button on:click={ () => blue = inc(blue, 1) }> +1 </button>
            <button on:click={ () => blue = inc(blue, 16) }> +16 </button>
        </p>
    {/if}
</div>

<style>
    div {
/*        position: abolsute; */
        width: 210px;
        height: 210px;
        padding: 5px;
    }

    p {
        margin: 0;
    }

    button {
        padding: 1px;
        font-size: 0.5em;
        text-align: left;
    }

    span {
        color: white;
        display: inline-block;
        width: 3em;
        font-family: "Courier New", mon,ospaced;
        font-size: 0.8em;
        text-align: right;
    }
</style>
