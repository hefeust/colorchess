<script>
	import Nav from '../components/Nav.svelte';
    import 'bulma/css/bulma.css'

	export let segment;
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 0em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<svelte:head>
    <title>Colorchess: welcome players !</title>
    <meta name="description" value="Colorchess: colored chess game tactical helper" />
    <meta name="keywords" value="chess, colors, tactical, game, helper" />
    <meta name="author" value="hefeust" />
</svelte:head>

<Nav {segment}/>

<main>
	<slot></slot>
</main>
