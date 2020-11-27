<script>
    import { fullnames_list } from '@stores/sprites.js'

    const folder = '/chess-sprites'
</script>

<defs>
    {#each fullnames_list as fullname}
        <pattern id={ `${fullname}-sprite` } 
            x="0" y="0" width="1" height="1"
            patternUnits="objectBoundingBox" >
            <image xlink:href={ `${folder}/${fullname}.png` } 
                x="0" y="0" width="1" height="1"
            />
        </pattern>
    {/each}
</defs>

