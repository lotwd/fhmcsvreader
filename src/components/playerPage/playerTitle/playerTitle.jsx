import React from 'react'
import { Grid, Typography } from '@material-ui/core'

const PlayerTitle = ({name}) => {
    return (
        <Grid item xs={12}>
            {
                <Typography variant="h3" align="center">
                {
                    name 
                }
                </Typography>
            }
        </Grid>
    )
}

export default PlayerTitle