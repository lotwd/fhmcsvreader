import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import TeamBlock from '../teamBlock/teamBlock'
import TeamStatsHeading from '../../teamStatsHeading/teamStatsHeading'
import useStyles from './styles'

const DivisionBlock = ({division, teams}) => {
    const { container } = useStyles()
    return (
        <>
            <Grid className={container} item xs={12}>
                <Typography varaint="h5">
                    {division.name}
                </Typography>
                <TeamStatsHeading/>
                {
                    division.teams.map((team)=>(
                        <TeamBlock team={team}/>
                    ))
                }
            </Grid>
        </>
    )
}

export default DivisionBlock
