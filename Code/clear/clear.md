<h1>Tame Clear Subalias<img align="right" src="../../Data/main.png" width="100px"></h1>

Subalias that clears the active taming counter

## Help
`tame clear`

## Important Notes
- If you clear a complete tame, the counters and information do not get put in backup
    - Meaning, if you stop taming one creature to tame another and finish, you can still restore the one in backup
- If you clear an incomplete tame, the counters and information do get put in backup
    - If you do get a pro-rate refund, the following is the calculation on getting money back
        - ![LaTex Equation](https://latex.codecogs.com/png.image?\inline&space;\large&space;\dpi{150}\bg{white}&space;moneyBack=cost*(1-((\frac{succVal}{succMax}*.5)&plus;(\frac{failVal}{failMax})*.5))*.5)
            - cost = Cost of taming
            - succVal = Success CC Value
            - succMax = Success CC Max
            - failVal = Failure CC Value
            - failMax = Failure CC Max