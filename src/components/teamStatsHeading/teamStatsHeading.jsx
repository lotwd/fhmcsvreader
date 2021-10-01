import React, {useContext} from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import { DataManagerContext } from '../dataManager/dataManager'
import useStyles from './styles'

const TeamStatsHeading = () => {
    const { container, cell, teamCell } = useStyles()
    const { setTeamSortBy } = useContext(DataManagerContext)
    const headings = [
        {
            display:"Team"
        },
        {
            display:"GP",
            sort:"games"
        },
        {
            display:"W",
            sort:"wins"
        },
        {
            display:"L",
            sort:"losses"
        },
        {
            display:"T",
            sort:"ties"
        },
        {
            display:"OTL",
            sort:"overtimeLosses"
        },
        {
            display:"PTS",
            sort:"points"
        },
        {
            display:"GF",
            sort:"goals"
        },
        {
            display:"GA",
            sort:"goalsAllowed"
        },
        {
            display:"SF",
            sort:"shots"
        },
        {
            display:"SA",
            sort:"shotsAllowed"
        },
        {
            display:"S%",
            sort:"shootingPercentage"
        },
        {
            display:"SA%",
            sort:"shootingPercentageAgainst"
        },
        {
            display:"H",
            sort:"hits"
        },
        {
            display:"SB",
            sort:"shotBlocks"
        },
        {
            display:"GV",
            sort:"giveaways"
        },
        {
            display:"TA",
            sort:"takeaways"
        },
        {
            display:"PP",
            sort:"powerplays"
        },
        {
            display:"PPG",
            sort:"powerplayGoals"
        },
        {
            display:"PP%",
            sort:"powerplayPercent"
        },
        {
            display:"PK",
            sort:"penaltyKills"
        },
        {
            display:"PKGA",
            sort:"penaltyKillsGoalsAgainst"
        },
        {
            display:"PK%",
            sort:"penaltyKillPercent"
        },
        {
            display:"SHG",
            sort:"shorthandedGoals"
        },
        {
            display:"SHGA",
            sort:"shorthandedGoalsAllowed"
        },
        {
            display:"SHG%",
            sort:"shorthandedGoalsPercent"
        },
        {
            display:"SHGA%",
            sort:"shorthandedGoalsAllowedPercent"
        }
    ]
    return (
        <div className={container}>
            {
                headings.map((heading)=>(
                    <Grid  className={heading.display==="Team" ? teamCell : cell} item>
                        <Button disableRipple onClick={()=>{setTeamSortBy(heading.sort)}} key={heading.display}>
                            <Typography variant="body2">
                                {heading.display}
                            </Typography>
                        </Button>
                    </Grid>
                    
                ))
            }
        </div>
    )
}

export default TeamStatsHeading
