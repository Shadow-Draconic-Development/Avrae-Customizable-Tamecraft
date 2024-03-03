<h1>Settings Creatures Edit Subalias<img align="right" src="../../../../Data/main.png" width="100px"></h1>

Subalias that allows staff members to edit creatures in the tamable list

## Help:
`tame settings creatures edit [creature name] <-succ> <-fail> <-cooldown> <-dc> <-lvl> <-cost> <-xp> <-color>`

Any current tamings in process that use the creature removed will have problems running.

Required arguments:
- `creature name`: Must be the first input

Optional arguments:
- `succ`: # of successes required (Minimum: 1)
- `fail`: # of failures allowed (Minumum: 1)
- `cooldown` Time before taming sessions (in seconds) (Minimum: 1)
- `lvl`: Character level requirement (Minimum: 1, Maximum: 20)
- `cost`: Taming cost (Can be negative so character gets paid to tame)
- `xp`: Experience gain (Can be negative so character pays experience when finishing tame)
- `color`: Color hex code (Supports 3-digit and 6-digit)