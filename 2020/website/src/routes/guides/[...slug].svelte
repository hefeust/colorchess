
<script context="module">
    import { get_component } from '@guides/index.js'

    let md_component = ''
   
    export const preload = async({ params }) => {
        const [guide] = params.slug

        console.log({ guide })
        
        return { md_component: get_component(guide) }
    } 
</script>

<script>
    export let md_component
</script>

<section class="section">
    <div class="content">
        <svelte:component this={ md_component } 	/>
    </div>
</section>

