import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import DivisionBlock from '../divisionBlock/divisionBlock'

const ConferenceBlock = ({conference}) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h5">
                    {
                        conference.name
                    }
                </Typography>
            </Grid>
            {
                conference.divisions.map((division)=>(
                    <DivisionBlock division={division}/>
                ))
            }
        </Grid>
    )
}

export default ConferenceBlock
