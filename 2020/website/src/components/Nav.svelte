
<script>
//    imported Fa from 'svelte-fa'
//    imported { faMugHot } from '@fortawesome/free-solid-svg-icons'
	
    export let segment;

    const handle_burger_click = (evt) => {
        burger_is_active = ! burger_is_active
    }

    const reset_burger = () => burger_is_active = false

    let burger_is_active = false
</script>

<nav class="navbar is-black" role="navigation">
    <div class="navbar-brand">
        <a href="/" class="navbar-item"  on:click={ reset_burger }>
            <span class="title is-3 has-text-light"> Colorchess</span>
        </a>

        <p class="navbar-burger"  
            role="button"
            href=""
            aria-label="menu" 
            aria-expanded="false" 
            on:click={ handle_burger_click } 
            class:is-active={ burger_is_active }>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </p>
    </div>

    <div class="navbar-menu { burger_is_active ? 'is-active' : '' }">

      	<div class="navbar-item has-background-dark">
            <a  href="/"
                class="has-text-light"
                on:click={ reset_burger } 
                aria-current="{segment === undefined ? 'page' : undefined}"  >
                Play !
            </a>
        </div>

      	<div class="navbar-item has-background-dark">
            <a  href="/options"
                class="has-text-light"
                on:click={ reset_burger } 
                aria-current="{segment === 'options' ? 'page' : undefined}"  >
                Options
            </a>
        </div>

      	<div class="navbar-item has-background-dark">
            <a  href="/guides"
                class="has-text-light"
                on:click={ reset_burger } 
                aria-current="{segment === 'guides' ? 'page' : undefined}"  >
                Guides
            </a>
        </div>
    </div>
</nav>
