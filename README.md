## Solution

### Real Time

We decided to implement real time messaging between clients using Server Sent Events (SSE).

### Randomness

When a session is created, a random seed is generated using API3 QRNG. This seed is then used to pick random cards during the game.

Cards are saved on disk, in order, but shuffled using the Knuth shuffle algorithm base on the seed when requested.

This way we have a deterministic but fully random card combinations per session.
