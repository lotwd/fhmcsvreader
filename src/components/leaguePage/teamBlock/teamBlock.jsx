import React, {useContext} from 'react'
import { Grid, Typography, Hidden } from '@material-ui/core'
import { Link } from 'gatsby'
import { DataManagerContext } from '../../dataManager/dataManager'
import useStyles from './styles'

const TeamBlock = ({team}) => {
    const { cell, teamCell, cellsContainer } = useStyles()
    const { name, nickname, abbr } = team
    const { 
        games, 
        wins, 
        losses, 
        ties, 
        overtimeLosses, 
        points, 
        goals, 
        goalsAllowed, 
        shots, 
        shotsAllowed, 
        shootingPercentage, 
        shootingPercentageAgainst,
        hits,
        shotBlocks,
        takeaways,
        giveaways,
        powerplays,
        powerplayGoals,
        powerplayPercent,
        penaltyKills,
        penaltyKillsGoalsAgainst,
        penaltyKillPercent,
        shorthandedGoals,
        shorthandedGoalsAllowed,
        shorthandedGoalsPercent,
        shorthandedGoalsAllowedPercent
    } = team?.stats
    const { primary, secondary, text } = team?.colors
    const displayStats = [
        games,
        wins,
        losses,
        ties,
        overtimeLosses,
        points,
        goals,
        goalsAllowed,
        shots,
        shotsAllowed,
        shootingPercentage,
        shootingPercentageAgainst,
        hits,
        shotBlocks,
        giveaways,
        takeaways,
        powerplays,
        powerplayGoals,
        powerplayPercent,
        penaltyKills,
        penaltyKillsGoalsAgainst,
        penaltyKillPercent,
        shorthandedGoals,
        shorthandedGoalsAllowed,
        shorthandedGoalsPercent,
        shorthandedGoalsAllowedPercent
    ]
    return (
        <Grid 
            style={
                {
                    backgroundColor:primary + "20", 
                    borderLeft:"10px solid " + secondary,
                }
            } 
            container
            >
            <Grid className={teamCell} item>
                <Link 
                    to="/team"
                    state={{
                        team:team
                    }}
                >
                    <Typography variant="body2">
                        <Hidden mdDown>
                        {`${name} ${nickname}`}
                        </Hidden>
                        <Hidden lgUp>
                            {`${abbr}`}
                        </Hidden>
                    </Typography>
                </Link>
            </Grid>
            <div className={cellsContainer}>
            {
                
                displayStats.map((stat)=>(
                    <Grid className={cell} item>
                        <Typography variant="body2">
                            { stat }
                        </Typography>
                    </Grid>
                ))
            }
            </div>
        </Grid>
    )
}

export default TeamBlock
