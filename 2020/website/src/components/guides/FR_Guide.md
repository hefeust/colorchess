
# Colorchess, avez vous dit ?

Colorchess est un assistant tactique coloré pour jouer aux échecs.

Il repose sur le principe de la mise en valeur de la surface du plateau pendant les phases de jeu, ou de son replay, par la coloration des cases en fonction de la balance de pressions des deux camps sur celles-ci.

Le premier prototype, appelé ChessHighlight a vu le jour au début des années 2010, vous pouvez voir une capture d'écran sur l'image ci-dessous:

![le prototype des s années 2010](guides/images/2010-prototype.png)

Considérez une valeur d'influence dans la plage de valeurs [0, 1, 2, 3 et plus] : 4 valeurs pour chacun des deux camps, cela fait 4 * 4 = 16 possibilités de couleurs pour les deux camps (noirs et blancs) pour chacune des 64 cases du plateau.

Si on place ces 16 codes couleurs sur une matrice d'analyse on obtient le dégradé (ou "gradient") suivant :

![codes coueleur deColorchess](guides/images/colors-gradient.png)

Ce dégradé  se lit comme ceci:

* 0 vs 0: les cases où il ne se passe rien de spécial, comme celles du milieu de plateau en début de partie, sont colorées en VERT;

* si l'influence des blancs sur cette cases augmente: 0, 1, 2, 3 et+, sa couleur vire progressivement à BLANC;

* si l'influence des noirs sur une case varie: 0, 1, 2, 3 et +, alors la couelru de cette case passe prgressivement à NOIR;

* pour les situation où la balance de pression croît simultanément pour les deux camps, on part de 0 v s0 (VERT), on passe par 1 vs 1 (JAUNE), 2 vs 2 (ORANGE), et on va jusque 3 et + VS 3 et + (ROUGE) c'est la diagonale descendante de cette grille;

* Enfin les autres cases sont ajustées pour que le dégradé paraisse le plus lisse possible.


# Jouer une partie

pn joue en cliquant sur le plateau. Un clic pour désigner la case de départ, et un autre pour la case d'arrivée. Si leu coup est validé par le moteur de règles, alors il est joué.

Pour le roque, il faut bouger le roi de deux cases côté où l'on souhaite effectuer ce mouvement.

# Guides détaillés en anglais

## Un coup d'oeil en couleurs

[Colored Glimpse on board](/guides/colored-glimpse)

## Détails techniques

[Techncial details](/guides/technical-details)

## Dans les abysses du programme

[Coding in-depth](/guides/code-in-depth)


