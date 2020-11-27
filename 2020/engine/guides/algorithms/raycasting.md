
Raycasting
==========

Raycasting designates the process of computing chessmen influences on the chess board, to validate and generate moves, from a given game position.

Each chessmen can emit rays from a given board reference according to its side and quality. I have identified three kinds of rays : normal (full, both cature and offset), capture-only and offset-only.

Rays can be generated either with a simple formula (aka delta casts), either than a more specific algorithm (aka special casts)

- All chessmen kind except pawns, produce delta casts
- Pawns have only special casts
- Kings and rooks have special OFFSET casts for castling

The RayCaster is resposible of storing rays and maange interactions (undergoing touches) between them.

It uses two JS Maps for storing rays:

- The first (startings) stores rays by origin ref
- The second (pathings) stores rays which path to the considered ref

Here's what does raycaster look like :

![raycaster](../schemas/raycasting.svg)

After all casting rays are obtained from a board, influences (touches) are computed as each ray is undergoing the others
