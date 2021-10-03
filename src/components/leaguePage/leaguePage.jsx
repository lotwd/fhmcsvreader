import React, {useContext, useEffect, useState} from 'react'
import { Helmet } from 'react-helmet'
import { Grid, Typography, IconButton } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { DataGrid } from '@material-ui/data-grid'
import { DataManagerContext } from '../dataManager/dataManager'
import { navigate } from 'gatsby'
import Navbar from '../navbar/navbar'
import StatsChart from '../statsChart/statsChart'
import LeagueToggles from './leagueToggles/leagueToggles'
import ChartHeading from './../chartHeading/chartHeading'
import useStyles from './styles'

const LeaguePage = ({id, name, abbr}) => {
    const 
    { 
        getLeague, 
        getLeagueTeams, 
        getConferenceTeams, 
        getTeamStatsOffenseColumns,
        getTeamStatsColumns,
        getTeamStatsRows,
        getTeamStatsDefenseColumns, 
        getTeamStatsAfterPeriodColumns,
        convertLeagueDataToChartData,
        teamSortBy,
        setTeamSortBy
    } 
    = useContext(DataManagerContext)
    const [view, setView] = useState("divisions")
    const [ league, setLeague ] = useState(undefined)
    const { dataGrid, root } = useStyles()
    // const league = getLeague(id)
    const columnWidth = 120
    const columns = getTeamStatsColumns(columnWidth)
    const offenseStatsColumns = getTeamStatsOffenseColumns(columnWidth)
    const defenseStatsColumns = getTeamStatsDefenseColumns(columnWidth)
    const afterPeriodStatsColumns = getTeamStatsAfterPeriodColumns(columnWidth)
    const columnsReduced = () => {
        const reducedArr = []
        const pushedKeys = []
        const reducedSet = [...columns, ...offenseStatsColumns, ...defenseStatsColumns, ...afterPeriodStatsColumns]
        reducedSet.forEach(column=>{
            if(!pushedKeys.includes(column.field) && column.field !== 'fullName'){
                reducedArr.push(column)
                pushedKeys.push(column.field)
            }
        })
        return reducedArr
    }
    const DGrid = ({rows, columns}) => (
        <DataGrid
            className={dataGrid}
            rows={rows}
            columns={columns}
            rowHeight={38}
            // onRowClick={(e)=>navigate('/team', {state:{id:e.row.id, leagueId:league.id}})}
            sortingOrder={['desc', 'asc']}
            height={300}
            hideFooterRowCount
            hideFooterSelectedRowCount
            hideFooterPagination
        />
    )
    const togglesDisabled = league?.teams
        ?
            ['conferences', 'divisions', 'league']
        :
            league?.divisions
            ?
                ['conferences']
            :
            []
    useEffect(()=>{
        if(!league && id){
            setLeague(getLeague(id))
        }
    },[id, league, setLeague, getLeague])
    return (
        <>
        <Helmet title={`${league?.leagueName} || Unofficial FHM CSV Reader`}/>
        {
        <Grid container className={root} justifyContent="center" style={{paddingBottom:'50px'}}>
            <Navbar backButton={<IconButton onClick={()=>navigate(-1)}><ArrowBack/>Leagues</IconButton>}/>
            <Grid item xs={12} style={{marginTop:"75px"}}>
                <Typography variant="h3" align="center">
                    {league && (league?.abbr || abbr)}
                </Typography>
            </Grid>
            <Grid item xs={3}></Grid>
            <ChartHeading
                title={league ? league?.leagueName : ''}
                description={league 
                    ? 
                    `Here you will find stats for the ${league.leagueName} teams.  To view a teams player stats click on the team name in the team column.  To sort, filter, or hide columns hover over the column heading and click the ellipsis (dot-dot-dot) to access the column menu.`
                    :
                    `Loading the ${name}`
                }
            />
            <Grid item xs={12} style={{display:"flex", justifyContent:"center", margin:"50px 0 25px 0"}}>
                {league && <LeagueToggles view={view} setView={setView} disabled={togglesDisabled}/>}
            </Grid>
            {
                league
                ?
                league.conferences
                ?
                    view === "divisions"
                    ? //conferences division view
                        league.conferences.map(conference=>(
                            <React.Fragment key={conference.id}>
                                <ChartHeading title={conference.name}/>
                                {
                                    conference.divisions.map(division=>{
                                        return(
                                            <React.Fragment key={division.id}>
                                                <ChartHeading title={`${division.name} - General Stats`}/>
                                                <Grid item xs={12}>
                                                    <DGrid rows={division.rows} columns={columns}/>
                                                </Grid>
                                                <ChartHeading title={`${division.name} - Offensive Stats`}/>
                                                <Grid item xs={12}>
                                                    <DGrid rows={division.rows} columns={offenseStatsColumns}/>
                                                </Grid>
                                                <ChartHeading title={`${division.name} - Defensive Stats`}/>
                                                <Grid item xs={12}>
                                                    <DGrid rows={division.rows} columns={defenseStatsColumns}/>
                                                </Grid>
                                                <ChartHeading title={`${division.name} - After Period Stats`}/>
                                                <Grid item xs={12}>
                                                    <DGrid rows={division.rows} columns={afterPeriodStatsColumns}/>
                                                </Grid>
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </React.Fragment>
                        ))
                    :
                        view === "conferences"
                        ?      
                            //conferences conference view
                            <React.Fragment>
                            {
                                league.conferences.map(conference=>(
                                    <React.Fragment key={conference.id}>
                                        <ChartHeading title={conference.name}/>
                                        <ChartHeading title="General Stats"/>
                                        <Grid item xs={12}>
                                            <DGrid rows={getTeamStatsRows(getConferenceTeams(conference), league.id)} columns={columns}/>
                                        </Grid>
                                        <ChartHeading title="Offensive Stats"/>
                                        <Grid item xs={12}>
                                            <DGrid rows={getTeamStatsRows(getConferenceTeams(conference), league.id)} columns={offenseStatsColumns}/>
                                        </Grid>
                                        <ChartHeading title="Defensive Stats"/>
                                        <Grid item xs={12}>
                                            <DGrid rows={getTeamStatsRows(getConferenceTeams(conference), league.id)} columns={defenseStatsColumns}/>
                                        </Grid>
                                        <ChartHeading title="After Period Stats"/>
                                        <Grid item xs={12}>
                                            <DGrid rows={getTeamStatsRows(getConferenceTeams(conference), league.id)} columns={afterPeriodStatsColumns}/>
                                        </Grid>
                                    </React.Fragment>
                                ))
                            }
                            </React.Fragment>
                        :
                            //conferences league view
                            <>
                            <ChartHeading title="General Stats"/>
                            <Grid item xs={12}>
                                <DGrid rows={getTeamStatsRows(getLeagueTeams(league), league.id)} columns={columns}/>
                            </Grid>
                            <ChartHeading title="Offensive Stats"/>
                            <Grid item xs={12}>
                                <DGrid rows={getTeamStatsRows(getLeagueTeams(league), league.id)} columns={offenseStatsColumns}/>
                            </Grid>
                            <ChartHeading title="Defensive Stats"/>
                            <Grid item xs={12}>
                                <DGrid rows={getTeamStatsRows(getLeagueTeams(league), league.id)} columns={defenseStatsColumns}/>
                            </Grid>
                            <ChartHeading title="After Period Stats"/>
                            <Grid item xs={12}>
                                <DGrid rows={getTeamStatsRows(getLeagueTeams(league), league.id)} columns={afterPeriodStatsColumns}/>
                            </Grid>
                            </>
                :
                    league.divisions
                    ?
                        view === "divisions"
                        ? // divisions division view
                        league.divisions.map(division=>(
                            <React.Fragment key={division.id}>
                                <ChartHeading title={division.name}/>2
                                <ChartHeading title="General Stats"/>
                                <Grid item xs={12} style={{height:`${(division.teams.length + 1) * 50}px`}}>
                                    <DGrid rows={division.rows} columns={columns}/>
                                </Grid>
                                <ChartHeading title="Offensive Stats"/>
                                <Grid item xs={12} style={{height:`${(division.teams.length + 1) * 50}px`}}>
                                    <DGrid rows={division.rows} columns={offenseStatsColumns}/>
                                </Grid>
                                <ChartHeading title="Defensive Stats"/>
                                <Grid item xs={12} style={{height:`${(division.teams.length + 1) * 50}px`}}>
                                    <DGrid rows={division.rows} columns={defenseStatsColumns}/>
                                </Grid>
                                <ChartHeading title="After Period Stats"/>
                                <Grid item xs={12} style={{height:`${(division.teams.length + 1) * 50}px`}}>
                                    <DGrid rows={division.rows} columns={afterPeriodStatsColumns}/>
                                </Grid>
                            </React.Fragment>
                        ))
                        : // divisions league view
                        <>
                        <ChartHeading title="General Stats"/>
                        <Grid item xs={12} style={{height:`${(getLeagueTeams({conferences:[{...league}]}).length + 1) * 45}px`}}>
                            <DGrid rows={getTeamStatsRows(getLeagueTeams({conferences:[{...league}]}), league.id)} columns={columns}/>
                        </Grid>
                        <ChartHeading title="Offensive Stats"/>
                         <Grid item xs={12} style={{height:`${(getLeagueTeams({conferences:[{...league}]}).length + 1) * 45}px`}}>
                            <DGrid rows={getTeamStatsRows(getLeagueTeams({conferences:[{...league}]}), league.id)} columns={offenseStatsColumns}/>
                        </Grid>
                        <ChartHeading title="Defensive Stats"/>
                        <Grid item xs={12} style={{height:`${(getLeagueTeams({conferences:[{...league}]}).length + 1) * 45}px`}}>
                            <DGrid rows={getTeamStatsRows(getLeagueTeams({conferences:[{...league}]}), league.id)} columns={defenseStatsColumns}/>
                        </Grid>
                        <ChartHeading title="After Period Stats"/>
                        <Grid item xs={12} style={{height:`${(getLeagueTeams({conferences:[{...league}]}).length + 1) * 45}px`}}>
                            <DGrid rows={getTeamStatsRows(getLeagueTeams({conferences:[{...league}]}), league.id)} columns={afterPeriodStatsColumns}/>
                        </Grid>
                        </>
                :
                <>
                <ChartHeading title="General Stats"/>
                <Grid item xs={12}>
                    <DGrid rows={getTeamStatsRows(getLeagueTeams({conferences:[{divisions:[{...league}]}]}), league.id)} columns={columns}/>
                </Grid>
                <ChartHeading title="Offensive Stats"/>
                <Grid item xs={12}>
                    <DGrid rows={getTeamStatsRows(getLeagueTeams({conferences:[{divisions:[{...league}]}]}), league.id)} columns={offenseStatsColumns}/>
                </Grid>
                <ChartHeading title="Defensive Stats"/>
                <Grid item xs={12}>
                    <DGrid rows={getTeamStatsRows(getLeagueTeams({conferences:[{divisions:[{...league}]}]}), league.id)} columns={defenseStatsColumns}/>
                </Grid>
                <ChartHeading title="After Period Stats"/>
                <Grid item xs={12}>
                    <DGrid rows={getTeamStatsRows(getLeagueTeams({conferences:[{divisions:[{...league}]}]}), league.id)} columns={afterPeriodStatsColumns}/>
                </Grid>
                </>
            :
            null
            } 
            {
                league && (
                <>
                    <ChartHeading title={"Team Stats Comparision Chart"} description={"This bar chart provides a visual presentation of a team, or multiple teams stats.  Use the buttons above the bar chart to toggle teams and the button below to toggle stats."}/>
                    <StatsChart data={convertLeagueDataToChartData(league)} buttonsData={columnsReduced()} chartKey={teamSortBy} setChartKey={setTeamSortBy}/>
                </>
                )   
            }
        </Grid>
    }
        </>
    )
}

export default LeaguePage
