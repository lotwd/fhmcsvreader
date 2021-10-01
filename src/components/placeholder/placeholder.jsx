import React from 'react'
import { Grid, Typography } from '@material-ui/core'

const Placeholder = ({width, height}) => {
    return (
        <Grid container justifyContent="center">
            <Grid item>
                <Typography style={{width:width, height:height, border:'2px solid black', margin:"25px 0px"}} align="center" variant="h3">
                    {
                        `AD ${height} X ${width}`
                    }
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Placeholder
