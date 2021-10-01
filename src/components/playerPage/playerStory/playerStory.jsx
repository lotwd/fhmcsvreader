import React from 'react'
import { Grid, Typography } from '@material-ui/core'

const PlayerStory = ({player}) => {
    const positionMapper = {
        C:"centermen",
        RW:"right winger",
        LW:"left winger",
        RD:"right defensemen",
        LD:"left defensemen",
        G:"goaltender"
    }
    const position = player.positions.split(',')[0]
    const playerHeight = `${Math.floor(player.height / 12)}'${Math.floor(player.height % 12)}"`
    return (
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <Typography variant="body2" align="center">
                    {
                        `${player.firstName} is a ${playerHeight} ${player.weight} pound ${positionMapper[position]} born ${new Date(player.dob).toDateString().substr(4,)} in ${player.birthCity}, ${player.birthState}`
                    }
                </Typography>
            </Grid>
        </Grid>
    )
}

export default PlayerStory
