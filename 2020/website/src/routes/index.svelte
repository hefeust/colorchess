
<script>
    import BoardArea from '@game-zone/BoardArea.svelte'
    import CapturesBox from '@game-zone/CapturesBox.svelte'
    import GameFlags from '@game-zone/GameFlags.svelte'
    import ModalPromote from '@modal-boxes/ModalPromote.svelte'
</script>

<svelte:head>
	<title>ColorChess 2020</title>
</svelte:head>

<div class="columns is-mobile is-centered">
    <div class="column is-full">
        <ModalPromote />
        <GameFlags />
        <BoardArea />
       <CapturesBox />
    </div>
</div>

