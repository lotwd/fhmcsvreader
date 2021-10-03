import React, {useState, useContext} from 'react'
import { Helmet } from 'react-helmet'
import { Grid, Typography, FormControl, IconButton, RadioGroup, Radio, FormControlLabel } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { DataGrid } from '@material-ui/data-grid'
import { navigate } from 'gatsby'
import { DataManagerContext } from '../dataManager/dataManager'
import Navbar from '../navbar/navbar'
import ChartHeading from '../chartHeading/chartHeading'
import PlayerStatsChart from '../playerStatsChart/playerStatsChart'
import useStyles from './styles'

const TeamPage = ({team, leagueAbbr}) => {
    const [activeSet, setActiveSet] = useState('rs')
    const { getGoalieStatsColumns, getPlayerStatsDefenseColumns, getPlayerStatsOffenseColumns, getPlayerStatsOtherColumns, getPlayerRows } = useContext(DataManagerContext)
    const { dataGrid, checkboxes, checked, container, title } = useStyles()
    const columnWidth = '120'
    const columns = getPlayerStatsOffenseColumns(columnWidth)
    const defenseColumns = getPlayerStatsDefenseColumns(columnWidth)
    const otherColumns = getPlayerStatsOtherColumns(columnWidth)
    const goalieColumns = getGoalieStatsColumns(columnWidth)
    const rows = getPlayerRows(team?.players
            .filter(player=>!player.positions.includes('G') && player.stats[activeSet]?.games), 
            activeSet,
            team.id,
            team.leagueId
        )
    const goalieRows = getPlayerRows(team?.players
            .filter(player=>player.positions.includes('G') && player.stats[activeSet]?.games),
            activeSet,
            team.id,
            team.leagueId
        )
        const columnsReduced = () => {
            const reducedArr = []
            const pushedKeys = []
            const reducedSet = [...columns, ...defenseColumns, ...otherColumns, ...goalieColumns]
            reducedSet.forEach(column=>{
                if(!pushedKeys.includes(column.field) && !['fullName', 'timeOnIcePerGame', 'powerplayTimeOnIcePerGame','shorthandedTimeOnIcePerGame'].includes(column.field)){
                    reducedArr.push(column)
                    pushedKeys.push(column.field)
                }
            })
            return reducedArr
        }
    return (
        <>
        <Helmet title={`${team.fullName} || Unofficial FHM CSV Reader`}/>
        <Grid container className={container} justifyContent="center"> 
            <Navbar backButton={<IconButton onClick={()=>navigate(-1)}><ArrowBack/>{leagueAbbr}</IconButton>}/>
            <Typography className={title} variant="h3" align="center">
                {`${team?.abbr}`}
            </Typography>
            <ChartHeading
                title={`${team?.name} ${team?.nickname}`}
                description={`Here you will find stats for the ${team?.name} ${team.nickname}. To view a player stats click on the players name in the name column. To sort, filter, or hide columns hover over the column heading and click the ellipsis (dot-dot-dot) to access the column menu.`}
            />
            <ChartHeading title={`${team.name}'s Player Stats`}/>
            <Grid item xs={12}>
            <FormControl className={checkboxes} component="fieldset">
                <RadioGroup style={{display:"flex", flexDirection:"row", justifyContent:"center", margin:"50px 0 25px 0"}} aria-label="view standings" name="standingsToggle" value={activeSet} onChange={(e)=>{setActiveSet(e.target.value)}}>
                    <FormControlLabel className={activeSet==='rs' ? checked : null} value="rs" control={<Radio />} label="Regular Season" />
                    <FormControlLabel className={activeSet==='po' ? checked : null} value="po" control={<Radio />} label="Playoffs" />
                    <FormControlLabel className={activeSet==='ps' ? checked : null} value="ps" control={<Radio />} label="Preseason" />
                </RadioGroup>
            </FormControl>
            </Grid>
            <ChartHeading title={`Offensive Stats`}/>
            <Grid item xs={12} style={{height:"400px"}}>
                <DataGrid
                    className={dataGrid}
                    rows={rows}
                    columns={columns}
                    rowHeight={38}
                    sortingOrder={['desc', 'asc']}
                    scrollbarSize={25}
                    hideFooterRowCount
                    hideFooterSelectedRowCount
                    hideFooterPagination
                />
            </Grid>
            <ChartHeading title={`Defensive Stats`}/>
            <Grid item xs={12} style={{height:"400px"}}>
                <DataGrid
                    className={dataGrid}
                    rows={rows}
                    columns={defenseColumns}
                    rowHeight={38}
                    sortingOrder={['desc', 'asc']}
                    scrollbarSize={25}
                    hideFooterRowCount
                    hideFooterSelectedRowCount
                    hideFooterPagination
                />
            </Grid>
            <ChartHeading title={`Other Stats`}/>
            <Grid item xs={12} style={{height:"400px"}}>
                <DataGrid
                    className={dataGrid}
                    rows={rows}
                    columns={otherColumns}
                    rowHeight={38}
                    sortingOrder={['desc', 'asc']}
                    scrollbarSize={25}
                    hideFooterRowCount
                    hideFooterSelectedRowCount
                    hideFooterPagination
                />
            </Grid>
            <ChartHeading title={`Goalie Stats`}/>
            <Grid item xs={12}>
                <DataGrid
                    className={dataGrid}
                    rows={goalieRows}
                    columns={goalieColumns}
                    rowHeight={38}
                    sortingOrder={['desc', 'asc']}
                    scrollbarSize={25}
                    autoHeight
                    hideFooterRowCount
                    hideFooterSelectedRowCount
                    hideFooterPagination
                />
            </Grid>
            <ChartHeading title={"Player Stats Comparision Chart"} description={"This bar chart provides a visual presentation of a player, or multiple player stats.  Use the buttons above the bar chart to toggle players and the buttons below to toggle stats."}/>
            <PlayerStatsChart data={team?.players} buttonsData={columnsReduced()} chartKey="points" activeSet={activeSet}/>
        </Grid>
        </>
    )
}

export default TeamPage
