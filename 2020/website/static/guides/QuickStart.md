
# What is ColorChess ?

Colorchess is a colored chess playing tactical helper.

Its  main principle is to highlight the board surface  during game *(re-)*play 
with a simple color code to denote the pression balance on every chess square for both sides. 

The original prototype project of 2010 was called ChessHighlight, here is one screen capture of this old game:

![The early 2010's prototype](guides/images/2010-prototype.png)

You can see on the above picture that board squares reflect the pression balance of the sides. 

To explain simply which code is used we have to consider a range of four values : [0, 1, 2, 3 and more]
of pressions counts for the two sides (black and white); this gives us a 4 * 4 = 16 cells matrix of colors.

![Colorchess colors gradient idea](guides/images/colors-gradient.png)

To understand what does this means:

* on "0-0" tiles, like those close to the center of the board at the beginning of the game, the squares are colored in GREEN;

* if white pression grows on a square, like 0, 1, 2, 3+ the square's color turn into WHITE;

* if black pression grows on a square, like 0, 1, 2, 3+ the square's color turn into BLACK;

* if the pression of both sides grows simultanously the tile's color varies from GREEN (0 vs 0), via YELLOW (1 vs 1), via ORANGE (2 vs 2), and finally RED (3+ vs 3+) denoting directly the intensity of  the conflicts on this square solely.

    




# Play with it



# Game options


