<h1>Settings Creatures Rename Subalias<img align="right" src="../../../../Data/main.png" width="100px"></h1>

Subalias that allows staff members to rename creatures in the tamable list

## Help
`tame settings creatures rename [old creature name] [new creature name]`

### Required Arguments
- `old creature name`: Old creature name
- `new creature name`: New creature name

## Important Notes
- Any current tamings in process that use the creature removed will have their name updated via a mapping table.
    - Try not to rename creatures too often as it will limit creature storage capacity and potentially slow down the taming alias.
    - Alias automatically cleans up unused mapping
- This subalias can only be run by users who are admin or who has the dragonspeaker role (or its equivalent)