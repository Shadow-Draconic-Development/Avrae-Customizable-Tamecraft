<h1>Settings Creatures Edit Subalias<img align="right" src="../../../../Data/main.png" width="100px"></h1>

Subalias that allows staff members to edit creatures in the tamable list

## Help
`tame settings creatures edit [creature name] <-succ> <-fail> <-cooldown> <-dc> <-lvl> <-cost> <-xp> <-color>`

### Required Arguments
- `creature name`: Creature name (Must be first input)

### Optional Arguments
- `succ`: # of successes required (Minimum: 1, default: No change)
- `fail`: # of failures allowed (Minumum: 1, default: No change)
- `cooldown` Time before taming sessions (in seconds) (Minimum: 1, default: No change)
- `lvl`: Character level requirement (Minimum: 1, Maximum: 20, default: No change)
- `cost`: Taming cost (Can be negative so character gets paid to tame, default: No change)
- `xp`: Experience gain (Can be negative so character pays experience when finishing tame, default: No change)
- `color`: Color hex code (Supports 3-digit and 6-digit, default: No change)

## Important Notes
- Any current tamings in process that do not have an override (i.e. cost, successes, failures) will be updated when SVAR settings are edited.
- This subalias can only be run by users who are admin or who has the dragonspeaker role (or its equivalent)