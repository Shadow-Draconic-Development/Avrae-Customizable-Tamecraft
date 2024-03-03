<h1>Tame Alias<img align="right" src="../Data/main.png" width="100px"></h1>

Main content library alias that allows players to tame creatures.

## Help:
`tame <creature name> <-s> <-b> <-i> <prof> <expert> <-succ> <-fail> <-c> <dis/adv/eadv>`

- Arguments that are used only at starting taming session
    - `creature name`: Name of creature to tame `(Required)`
    - `-succ`: Alters the number of successes required (Minimum: 1)
    - `-fail`: Alters the number of maximum failures (Minumum: 1)
    - `-c`: Alters the cost of taming

- Arguments that can be used with any taming session
    - `prof`: Proficiency override to standard proficiency
    - `expert`: Proficiency override to double proficiency (overrules `prof` argument)
    - `s`: Skill to be used for taming
        - Automatically picks skill with highest bonus, no regard for advantage
        - Retained taming session to taming session, but not creature to creature
        - Must be a skill within allowed skills
    - `b`: Misc. bonus to be applied to roll
    - `i`: Ignore cost and/or cooldown `Note: It does record you using this bypass for audit purposes`
    - `dis/adv/eadv`: (Respectively)
        - Disadvantage
        - Advantage
        - Double advantage

### Subaliases
- `clear`
- `edit`
- `history`
- `list`
- `restore`
- `settings`
    - `creatures`
        - `add`
        - `edit`
        - `import`
        - `remove`
        - `rename`
    - `jack`
    - `lfg`
    - `nat1`
    - `nat20`
    - `parent`
    - `refund`
    - `reliable`
    - `skills`
        - `add`
        - `remove`
    - `success`
        - `add`
        - `edit`
        - `remove`
    - `whitelist`
        - `add`
        - `remove`