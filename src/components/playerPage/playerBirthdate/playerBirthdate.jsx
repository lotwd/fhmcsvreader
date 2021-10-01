import React from 'react'
import { Grid, Typography } from '@material-ui/core'
const PlayerBirthdate = ({date}) => {
    const birthDate = new Date(date).toDateString().substr(3,)
    return (
        <Grid item xs={12} align="center">
            <Typography variant="body2" align="center">
                { birthDate }
            </Typography>
        </Grid>
    )
}

export default PlayerBirthdate
