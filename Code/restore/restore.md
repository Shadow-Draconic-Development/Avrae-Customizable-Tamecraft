<h1>Tame Restore Subalias<img align="right" src="../../Data/main.png" width="100px"></h1>

Subalias that allows a user to restore a taming session from backup

## Help
`tame restore`

## Important Notes
- Taming sessions cannot be restored if they no longer exist in the SVAR
- If you have an existing taming session, you will place your backup into your active taming and your active taming into backup.
    - If you do get a pro-rate refund, the following is the calculation on getting money back
        - ![LaTex Equation](https://latex.codecogs.com/png.image?\inline&space;\large&space;\dpi{150}\bg{white}&space;moneyBack=cost*(1-((\frac{succVal}{succMax}*.5)&plus;(\frac{failVal}{failMax})*.5))*.5)
            - cost = Cost of taming
            - succVal = Success CC Value
            - succMax = Success CC Max
            - failVal = Failure CC Value
            - failMax = Failure CC Max

- If you do not have enough funds to repay the money you received (if any) when clearing, you will not be able to restore.

