import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './styles'

const ChartHeading = ({title, description}) => {
    const { subtitle, top, bottom } = useStyles()
    return (
        <>
            <Grid item xs={12} className={top}>
                <Typography variant="h5" className={subtitle} align="center" gutterBottom>
                    {title}
                </Typography>
            </Grid>
            {
                description && 
                <Grid item xs={6} className={bottom}>
                    <Typography variant="body2" className={subtitle} align="center" gutterBottom>
                        {description}
                    </Typography>
                </Grid>
            }
        </>
    )
}

export default ChartHeading
