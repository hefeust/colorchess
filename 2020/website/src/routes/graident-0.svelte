
<script>
    let hex_text = ''
    let hexes = ""

    let r_text = ''
    let g_text = ''
    let b_text = ''

    let r_values = []
    let g_values = []
    let b_values = []

    let r_ok = 0
    let g_ok = 0
    let b_ok = 0

    let lines = []    
    let cleaned = []
    let ready = false

    const split_rgb = () => {
        let counter = 0        

        r_text = ''
        g_text = ''
        b_text = ''

        hex_text.split('\n')
            .slice(0, 16)
            .map((str) => {
                const separator = (counter < 3) ? ' ' : '\n'

                r_text += str.substr(1, 2) + separator
                g_text += str.substr(3, 2) + separator
                b_text += str.substr(5, 2) + separator

                counter = (counter + 1) % 4
            })
    }

    const reset_rgb = () => {}

    const use_palette = () => {}

    const clean_extract = (str) => {
        return str.replace(/\n/g, ':')
            .replace(/\s+/g, ':')
            .split(':')
            .filter((s) => s.length > 0)
            .slice(0, 16)
    }

    $: r_values = clean_extract(r_text)
    $: r_ok = (r_values.length === 16) ? 1 : 0

    $: g_values = clean_extract(g_text)
    $: g_ok = (g_values.length === 16) ? 1 : 0

    $: b_values = clean_extract(b_text)
    $: b_ok = (b_values.length === 16) ? 1 : 0

    $: rgb_ok = r_ok + g_ok + b_ok

    $: if(rgb_ok == 3) {
        hexes = []

        for(let i = 0; i < 16; i++) {
            hexes = [...hexes, '#' + r_values[i] + g_values[i] + b_values[i]]
        }

        hex_text = hexes.join('\n')
    }

    $: ready = hexes.length === 16
</script>

<section class="rgb-io">
    <h3>Separated hex RGB inputs</h3>

    <h2> RED [{ r_values.length } / 16]</h2>
    <textarea bind:value={ r_text } cols="16" rows="5"></textarea>

    <h2> GREEN [{ g_values.length } / 16]</h2>
    <textarea bind:value={ g_text } cols="16" rows="5"></textarea>

    <h2> BLUE [{ b_values.length } / 16]</h2>
    <textarea bind:value={ b_text } cols="16" rows="5"></textarea>

    <p> RGB validation: { rgb_ok } </p>
</section>

<section class="gradient-viz">
    <h3>Resulting gradient</h3>
    {#if ready}
        <div class="gradient">
            {#each hexes as hex }
                <div class="cell" style={ `background-color: ${hex};` }>
                    <p class="coord">{hex} </p>
                </div>
            {/each}
            <br class="clearfix" />
        </div>

    {:else}
        <h3> please enter 3 * 16 valid hex color codes in textareas</h3>
    {/if}
</section>

<section class="hex-io">
    <h3> Hex colors list</h3>
    <p>{ hexes.length } / 16 </p>
    <p>
        <textarea bind:value={ hex_text } cols="8" rows="16"></textarea>
    </p>
    <p>
       <button on:click={ () => split_rgb() }> 
            Split RGB 
       </button>
    </p>

    <p>
       <button on:click={ () => reset_rgb() }> 
            Reset RGB 
       </button>
    </p>

    <p>
       <button on:click={ () => use_palette() }> 
           Use for game
       </button>
    </p>
</section>

<style>
    h1,h2,h3,p {
        color: orange;
        background-color: black;

    }

    section {
        height: 420px;
        padding: 5px;
        color: yellow;
        background-color: black;
        font-size: 0.8em;
        float: left;
    }

    section.rgb-io { width: 160px; }

    section.gradient-viz { width: 420px; }

    section.hex-io { width: 120px; }

    textarea {
        color: yellow;
        background-color: black;
        font-size: 1em;
        font-family: monospace;
        font-weight: bold;
        letter-spacing: large;
    }

    .gradient { 

        position: absolute;
        display: block;
        height: 400px;
        width: 400px;
        padding: 0;
        margin: 0;        padding: 0;
    }

    .cell {
        display: block;
        height: 90px;
        width: 90px;
        float: left;
        border: 2.5px solid grey;
        margin: 0;
    }

    .coord {
        background-color: black;
        color: white;
        font-size: 2em;
    }
</style>



