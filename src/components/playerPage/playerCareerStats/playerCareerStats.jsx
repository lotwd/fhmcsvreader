import React, {useState, useContext} from 'react'
import { Grid, FormControl,FormGroup, Checkbox, FormControlLabel } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { DataManagerContext } from '../../dataManager/dataManager'
import ChartHeading from '../../chartHeading/chartHeading'
import useStyles from './styles'

const PlayerCareerStats = ({player}) => {
    const { getPlayerCareerColumns, getGoalieCareerColumns, getPlayerCareerRows } = useContext(DataManagerContext)
    const { dataGrid, checkboxes, checked, unchecked, checkboxesContainer } = useStyles()
    const rows = getPlayerCareerRows(player)
    const leagues = [...new Set(rows?.map(row=>row?.league))]
    const [ checkboxesState, setCheckboxesState ] = useState(()=>{
        const state = {}
        leagues.forEach(league=>state[league]=true)
        return state
    })
    const columns = player?.positions?.includes('G') ? getGoalieCareerColumns('120') : getPlayerCareerColumns('120')
    const handleCheckboxChange = (e) => {
        setCheckboxesState(Object.assign({}, checkboxesState, {[e.target.name]:e.target.checked}))
    }
    const filteredRows = rows?.filter(row=>checkboxesState[row.league])?.sort((row1, row2)=>(parseInt(row2.year) - parseInt(row1.year)))
    return (
        <>
            <ChartHeading 
                title={`${player.fullName}'s Career Stats`}
                description={`Here you will find ${player.fullName}'s career stats.  To sort, filter, or hide columns hover over the column heading and click the ellipsis (dot-dot-dot) to access the column menu.`}
                />
            <Grid item xs={12} className={checkboxesContainer}>
                <FormControl component="fieldset">
                        <FormGroup className={checkboxes}>
                            {
                                leagues.map(league=>(
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
                    rows={filteredRows}
                    columns={columns}
                    rowHeight={38}
                    sortingOrder={['desc', 'asc']}
                    autoHeight
                    hideFooterRowCount
                    hideFooterSelectedRowCount
                    hideFooterPagination
                />
            </Grid>
        </>
    )
}

export default PlayerCareerStats
