
<script>
    const guides = [
        {
            title: 'Quick start',
            text: 'How to play ? Setting up game options',
            url: '/guides/quick-start',
            color: ''
        },
        {
            title: '[guide en français]',
            text: 'Démarrer avec ColorChess, options et concepts de base',
            url: '/guides/guide-en-francais',
            color: ''
        },
        {
            title: 'Colored glimps on board',
            text: 'Another look on chess gaming tactics',
            url: '/guides/colored-glimpse',
            color: ''
        },
        {
            title: 'Technical details',
            text: 'Move generation, raycasting and rules pipeline',
            url: '/guides/technical-details',
            color: ''
        },
        {
            title: 'Coding in-depth',
            text: 'Game engine logic: bidimaps, prefix trees, and memory pool',
            url: '/guides/code-in-depth',
            color: ''
        },
        {
            title: 'About Colorchess',
            text: 'The author, concept history and contributing',
            url: '/guides/about',
            color: ''
        },
    ]
</script>

<section class="section">
<div class="columns is-multiline">
    {#each guides as guide}    
        <div class="column is-4">
            <div class="box is-medium has-background-dark">
                <div class="block">
                    <h1 class="title is-4  has-text-light">
                        { guide.title}
                    </h1>
                    <h2 class="subtitle is-5 has-text-light">
                        { guide.text }
                    </h2>
                </div>
                <p class="has-text-right">
                    <a href={ guide.url } class="button is-info">Read guide...</a>
                </p>
            </div>
        </div>
    {/each}
</div>
</section>

<style>
    .box {
        height: 100%;
    }

    .block {
        height: 6em;
    }
</style>


