
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

            r_text = r_text.trim()
            g_text = g_text.trim()
            b_text = b_text.trim()
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

<section class="section">
    <h2 class="title is-3">
        Colors gradient maker
    </h2>
    <div class="columns has-background-dark has-text-light">
        <div class="column is-2">
            <h2 class="title is-4  has-text-light">
                RGB values
            </h2>
            <h3 class="subtitle is-6 has-text-light"> 
                RED [{ r_values.length }/16]
            </h3>
            <textarea bind:value={ r_text } cols="12" rows="4"></textarea>
    
            <h3 class="subtitle is-6 has-text-light"> 
                GREEN [{ g_values.length }/16]
            </h3>
            <textarea bind:value={ g_text } cols="12" rows="4"></textarea>
    
            <h3 class="subtitle is-6  has-text-light"> 
                BLUE [{ b_values.length }/16]
            </h3>
            <textarea bind:value={ b_text } cols="12" rows="4"></textarea>

            <p class=" has-text-light"> 
                Validation: { rgb_ok }/3
            </p>
        </div>

        <div class="column is-8">

            {#if ready}
                <div class="columns is-mobile is-multiline">
                    {#each hexes as hex }
                        <div class="column is-one-quarter">
                            <figure class="image is-rounded is-4by3" 
                                style={`background-color: ${hex};` }>
                                <p class="has-text-white has-background-black">
                                    {hex} 
                                </p>
                            </figure>
                        </div>
                    {/each}
    
                </div>
            {:else}
                <div class="content">
                    <h3 class="subtitle is-3">
                        Gradient here...
                    </h3>
                    <p>
                        Fill in the blancks hexcodes:
                    </p>
                    <ul>
                        <li>4 * 4 = 16 values for RED component</li>
                        <li>4 * 4 = 16 values for GREEN component</li>
                        <li>4 * 4 = 16 values for BLUE component</li>
                    </ul>
                </div>
            {/if}
        </div>
        <div class="column is-2">

            <h1 class="title is-5 has-text-light"> 
                HexCodes
            </h1>
            <p>
                { hexes.length } / 16 
            </p>
            <p>
                <textarea bind:value={ hex_text } cols="8" rows="16"></textarea>
            </p>
            <p>
                <button class="button is-info" on:click={ () => split_rgb() }> 
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
        </div>
    </div>
</section>

<style>

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
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;        padding: 0;
    }
</style>



