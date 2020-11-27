
# Code In-Depth

## Appplication modules

The web applicatiion runs with the application framework Sapper which is build on top of the Svelte components library.

* single and simple components system
* delarative bindings
* reactive data stores
* helpers functions

## Graphical User Interface

* Bulma CSS: simple and elgant
* SVG for the board layers (tiles, pieces sprites, labels and metrics)
* Markdonwn components for guides pages

## The game engine

* Fine-grained API folder structure
* RayCaster for  casting rays, based on a group of Maps
* Pipelined rules application on a trie tree data structure for game context

## The Toolkit

* Bidrectional Maps for the board and pieces selection
** uses Maps, arrays and intersection functions

* Trie tree for the rules pipeline
** based on a Blocks Memory Pool
** baked with a Multply-With-Carry PRNG system



