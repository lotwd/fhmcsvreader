import React from 'react'
import { Grid, Typography } from '@material-ui/core'

const PlayerInfo = ({player}) => {
    const playerHeight = `${Math.floor(player.height / 12)}'${Math.floor(player.height % 12)}"`
    const data = [
        {
            name:'Height',
            value:playerHeight
        },
        {
            name:"Weight",
            value:`${player.weight}lbs`
        },
        {
            name:"Birth",
            value:`${player.birthCity}, ${player.birthState} on ${player.dob}`
        }
    ]
    return (
    <Grid item xs={12}>
        {
            <>
                <Typography variant="body2" align="center">
                {
                    `${playerHeight}  ${player.weight}lbs  ${player.birthCity}, ${player.birthState}` 
                }
                </Typography>
                <Typography variant="body2" align="center">
                {
                    `${player.positions}` 
                }
                </Typography>
            </>
        }
    </Grid>
    )
}

export default PlayerInfo
