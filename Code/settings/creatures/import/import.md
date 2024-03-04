<h1>Settings Creatures Import Subalias<img align="right" src="../../../../Data/main.png" width="100px"></h1>

Subalias that allows staff members to import creatures to the tamable list

## Help
`tame settings creatures import [JSON string]`

### Required Arguments
- `JSON string`: JSON string that is generated from Shadow's website

### Steps
1. Visit [Creature Import Generation Form](https://shadow-draconic-development.github.io/Avrae-Customizable-Tamecraft/)
2. Add creatures
    - Fill in required inputs
    - Fill in optional inputs
    - Repeat until all creatures desired are setup (Please limit to at most 5 creatures at a time due to Discord message limits)
3. Generate JSON
    - An output is automatically pasted to your clipboard
4. Run subalias command, pasting what is on your clipboard as the JSON string

## Important Notes
- This subalias requires you to visit one of my GitHub Pages in order to construct a JSON string. 
- Any creatures that match up when you import a JSON, will overwrite them.
- This subalias can only be run by users who are admin or who has the dragonspeaker role (or its equivalent)