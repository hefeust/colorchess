
Colorchess old version (aka ChessHighLight)
===========================================

play
----

run index.html in your web browser with javascript enabled. That's it !

source
------

this source code was written in 2007 with Firefox as navigator and FireBug design tools.

The code is in french. I tried to refactor it a bit in an more international way (english names), but this task is unfeasible easily so I let it apart for the moment

The main goal of refactorization was to correct some bugs while dealing with DOM/onload events.

game
----

You do not really play chess actually with this since castling, promotion and en passant moves are not implemented.

You have to play manually.

concepts available
------------------

"OBNK gradient" a coloring palette to enhance the chess gameplay
  - 0 : neutral tile, 0-0 on side pressure balace (appear in green)
  - Blancs (White) : 3-0 (fade to white)
  - Noirs (Blacks) : 3-0 (fade to black)  
  - K (Honflict) from 0-0 to (3+)-(3+) green-yellow-orange-red
  


hefeust - demeber 2013


