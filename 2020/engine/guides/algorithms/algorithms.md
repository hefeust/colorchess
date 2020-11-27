
Algorithms
==========

Data needs
----------

Under the form of Game instance getters.

- current
-- board : #REF --> chessman
-- pressions : #REF --> #scores
-- metrics :
--- kings #coords * 2
--- mass center #coords * 2
--- attack center #coords * 2

- ghosts
  --> same needs as #current

- spies
  --> same needs as #current

- history


given a board B1, a set of flags F1, a box X1 and a move M1:

    let  S1 = { B1, F1, X1, M1 } be the state after the previous (M1) move.

after asking user interface or network sockets  or AI for a move (M2)

- compute raycasts RC1 for this board B1 :

     let RC1 = (new RayCaster()).casts(B1)

- create a new board (B2)

    let B2 = B1.clone()
    let F2 = B1.clone()
    let X2 = X1.clone()

    // and then define!
    let S2 = { B2, F2, X2 }

- compute history from owner game

    let digest1 = history.digest()

- move validation and application

   let ctx = { S1, S2, RC1, digest1 }

- compute raycasts (RC2) for the move M2



- compute flags F2 from F1 and board B2

    let S2 = { B2, F2, X2, M2 } be the news state



![game-state-dynamics](../schemas/game-state-dynamics.svg)

![rules-pipeline](../schemas/rules-pipeline.svg)
