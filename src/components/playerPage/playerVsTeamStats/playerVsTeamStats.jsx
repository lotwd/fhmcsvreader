import React, {useContext, useState} from 'react'
import { Grid, FormControl, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { DataManagerContext } from '../../dataManager/dataManager'
import ChartHeading from '../../chartHeading/chartHeading'
import useStyles from './styles'

const PlayerVsTeamStats = ({player}) => {
    const stats = player?.vs
    const activeSet = 'rs'
    const { getPlayerVsTeamRows, getPlayerVsTeamColumns, getGoalieVsTeamColumns } = useContext(DataManagerContext)
    const { dataGrid, checkboxesContainer, checkboxes, checked, unchecked } = useStyles()
    const isGoalie = player?.positions.includes('G')
    const columns = isGoalie ? getGoalieVsTeamColumns(120) : getPlayerVsTeamColumns(120)
    const rows = getPlayerVsTeamRows(stats, activeSet)?.filter(row=>row?.games)
    const leagues = [...new Set(rows?.map(row=>row?.league))]
    const [ checkboxesState, setCheckboxesState ] = useState(()=>{
        const state = {}
        leagues.forEach(league=>state[league]=true)
        return state
    })
    const handleCheckboxChange = (e) => {
        setCheckboxesState(Object.assign({}, checkboxesState, {[e.target.name]:e.target.checked}))
    }
    return (
        <>
            <ChartHeading 
                title={`${player.fullName}'s Vs Teams Stats`} 
                description={`Here you will find ${player.firstName}'s stats versus other teams in the league.  To sort, filter, or hide columns hover over the column heading and click the ellipsis (dot-dot-dot) to access the column menu.`}
            />
            <Grid item xs={12} className={checkboxesContainer}>
                <FormControl component="fieldset">
                        <FormGroup className={checkboxes}>
                            {
                                leagues
                                .map(league=>(
                                        <FormControlLabel 
                                        key={league}
                                        className={checkboxesState[league] ? checked : unchecked}
                                            control={
                                                <Checkbox 
                                                    checked={checkboxesState[league]} 
                                                    onChange={handleCheckboxChange} 
                                                    name={league}
                                                />
                                            } 
                                            label={league} />
                                    ))
                            }
                        </FormGroup>       
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <DataGrid
                    className={dataGrid}
                    rows={rows.filter(row=>(checkboxesState[row.league]))}
                    columns={columns}
                    rowHeight={38}
                    sortingOrder={['desc', 'asc']}
                    height={500}
                    hideFooterRowCount
                    hideFooterSelectedRowCount
                    hideFooterPagination
                />
            </Grid>
        </>
    )
}

export default PlayerVsTeamStats

