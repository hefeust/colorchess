

Rules pipeline
==============

    Turn (true|false
    DeltaMove (all except pawns)
    PawnsSimpleMove (pawns only)
    PawnsFirstMove (pawns only)
    PawnsCapture (pawns only)
    PawnsEnPassant (pawns only)
    PawnsPrumotion (pawns only)
    Castling (Kings and Rooks)
    Check
    SelfCheck
    ThreeMoveRepetion
    EndGame

Evaluating
----------

    let test = gs.clone()
    let context = { test.board, test.box, test.flags}

    for (let rule of rules)
      rule.evaluate(context)

        # ThreeMoveRepetition needs history.digest
        # EndGame.evaluate to assert generate result.length > 0


Generating
----------
    let tests = []
     let test = gs.clone()
     let context = { test.board, test.box, test.flags}

    for (let rule of rules)
      tests.push(rule.generate(context))

        # all rules generated moves need evaluate()
