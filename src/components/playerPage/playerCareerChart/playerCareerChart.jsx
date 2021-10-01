import React, {useContext, useState} from 'react'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from 'recharts'
import { FormControlLabel, Checkbox, Grid, FormControl, FormGroup, Radio, RadioGroup } from '@material-ui/core'
import { DataManagerContext } from '../../dataManager/dataManager'
import ChartHeading from '../../chartHeading/chartHeading'
import { useTheme } from '@material-ui/core/styles'
import useStyles from './styles'

const PlayerCareerChart = ({player}) => {
const theme = useTheme()
const { getPlayerCareerColumns, getPlayerCareerRows, getGoalieCareerColumns } = useContext(DataManagerContext)
const { checkboxes, checked, unchecked, chartContainer, chart, container} = useStyles()
const columns = (player.positions.includes('G') ? getGoalieCareerColumns(120, true) : getPlayerCareerColumns(120, true)).filter(column=>!['teamHome', 'teamAway','date', 'league', 'gameType', 'year', 'team'].includes(column.field))

const [ checkboxesState, setCheckboxesState ] = useState(()=>{
    const checkboxesObj = {}
    columns?.map(column=>(
        column.field
        ?
        {[column.field]:column.field === 'points' || column.field === 'games'}
        :
        null
    ))
    .filter(column=>column)
    .forEach(checkbox=>{
        checkboxesObj[Object.keys(checkbox)?.[0]] = Object.values(checkbox)?.[0]
    })
    return checkboxesObj
    })
const rows = getPlayerCareerRows(player)
const leagues = [...new Set(rows?.map(row=>row?.league))]
const [ activeLeague, setActiveLeague ] = useState(leagues[0])
const combineDuplicateYears = (rows) => {
    return(
    {
        assists:rows[0]?.assists + rows[1].assists,
        emptyNetGoals: rows[0].emptyNetGoals + rows[0].emptyNetGoals,
        faceoffWinPercent: rows[0].faceoffWinPercent + rows[1].faceoffWinPercent,
        faceoffs: rows[0].faceoffs + rows[1].faceoffs,
        faceoffsWon: rows[0].faceoffsWon + rows[1].faceoffsWon,
        fightWinPercent: rows[0].fightWinPercent + rows[1].fightWinPercent,
        fights: rows[0].fights + rows[1].fights,
        fightsWon: rows[0].fightsWon + rows[1].fightsWon,
        gameRating: parseInt((rows[0].gameRating + rows[1].faceoffs) / 2),
        gameWinningGoals: rows[0].gameWinningGoals + rows[1].gameWinningGoals,
        games: rows[0].games + rows[1].games,
        giveaways: rows[0].giveaways + rows[1].giveaways,
        goals: rows[0].goals + rows[1].goals,
        goalsAgainst: rows[0].goalsAgainst + rows[1].goalsAgainst,
        goalsAgainstAverage: parseFloat((rows[0].goalsAgainstAverage + rows[1].goalsAgainstAverage) / 2).toFixed(2),
        goalsFor60: parseFloat((parseFloat(rows[0].goalsFor60) + parseFloat(rows[1].goalsFor60)) / 2).toFixed(2),
        hits: rows[0].hits + rows[1].hits,
        id:`${rows[0].id}x2`,
        league: rows[0].league,
        losses: rows[0].losses + rows[1].losses,
        minutes: rows[0].minutes + rows[1].minutes,
        ot: rows[0].ot + rows[1].ot,
        penalties: rows[0].penalties + rows[1].penalties,
        plusMinus: rows[0].plusMinus + rows[1].plusMinus,
        points: rows[0].points + rows[1].points,
        powerplayAssists: rows[0].powerplayAssists + rows[1].powerplayAssists,
        powerplayGoals: rows[0].powerplayGoals + rows[1].powerplayGoals,
        powerplayPoints: rows[0].powerplayPoints + rows[1].powerplayPoints,
        powerplayTimeOnIce: '0:00',
        powerplayTimeOnIcePerGame: "0:00",
        savePercentage: "0.00",
        shorthandedAssists: rows[0].powerplayPoints + rows[1].powerplayPoints,
        shorthandedGoals: rows[0].powerplayPoints + rows[1].powerplayPoints,
        shorthandedPoints: rows[0].powerplayPoints + rows[1].powerplayPoints,
        shorthandedTimeOnIce: "0:00",
        shorthandedTimeOnIcePerGame: "0:00",
        shots: rows[0].shots + rows[1].shots,
        shotsAgainst: rows[0].shotsAgainst + rows[1].shotsAgainst,
        shotsBlocked: rows[0].shotsBlocked + rows[1].shotsBlocked,
        shotsFor60: parseFloat((parseFloat(rows[0].shotsFor60) + parseFloat(rows[1].shotsFor60)) / 2).toFixed(3),
        shutouts: rows[0].shutouts + rows[1].shutouts,
        takeaways: rows[0].takeaways + rows[1].takeaways,
        team: `${rows[0].team}/${rows[1].team}`,
        timeOnIce: "0:00",
        timeOnIcePerGame: "00:00",
        timeOnIcePerGameSeconds: rows[0].timeOnIcePerGameSeconds + rows[1].timeOnIcePerGameSeconds,
        wins: rows[0].wins + rows[1].wins,
        year: rows[0].year
    }

)}
const filteredRows = rows?.sort((row1, row2)=>(row1.year - row2.year)).filter(row=>activeLeague === row.league)

const handleDuplicateYears = (rows) => {
    const yearArr = {}
    rows.forEach(row=>{
        yearArr[row.year] = yearArr[row.year] ? combineDuplicateYears([yearArr[row.year], row]) : row
    })
    return Object.values(yearArr)
}
const test = handleDuplicateYears(filteredRows)

const data = test.map((game,key)=>{
    const gameObj = {name:game?.date}
    Object.keys(game).forEach(field=>{
        gameObj[field] = game[field]
    })
    return gameObj
})
const handleCheckboxesChange = (e) => {
    const payload = {[e.target.name]:e.target.checked}
    setCheckboxesState({...checkboxesState, ...payload})
}
const barColors = [theme.palette.secondary.light, theme.palette.secondary.contrastText, theme.palette.secondary.dark, 'purple', 'darkgreen', 'darkbrown', 'orange']
const LeagueButtons = () => {
    return(
        <FormControl className={checkboxes} component="fieldset">
            <RadioGroup style={{display:"flex", flexDirection:"row", justifyContent:"center", margin:"50px 0 25px 0"}} aria-label="toggle league" name="leagueToggle" value={activeLeague} onChange={(e)=>{setActiveLeague(e.target.value)}}>
                {
                    leagues.map(league=>(
                        <FormControlLabel key={league} className={activeLeague===league ? checked : unchecked} value={league} control={<Radio />} label={league} />
                    ))
                }
            </RadioGroup>
        </FormControl>
    )
}
const ChartButtons = () => {
    const colorsCopy = barColors.filter(bc=>bc)
    return (
        columns.map(button=>(
            <FormControlLabel 
                key={button.field}
                placement="bottom"
                style={checkboxesState[button.field] ? {backgroundColor:colorsCopy?.shift() || 'green'} : {}}
                className={checkboxesState[button.field] ? checked : unchecked}
                control={
                    <Checkbox 
                        checked={checkboxesState[button.field]} 
                        onChange={e=>handleCheckboxesChange(e, "stats")} 
                        name={button.field}
                        size="medium"
                        color="secondary"
                    />
                } 
                label={button.headerName} />
        ))
     )
}
const ChartLines = () => {
    const colorsCopy = barColors.filter(bc=>bc)
    return(
        Object.keys(checkboxesState).map((checkbox, key)=>(
            checkboxesState[checkbox]
            &&
            <Line key={checkbox} type="monotone" dot={false} strokeWidth={7.5} dataKey={checkbox} stroke={colorsCopy.length ? colorsCopy.shift() : 'green'}/>
        ))
    )
}
    return (
        <Grid container className={container} justifyContent="center">
            <ChartHeading 
                title={`${player.fullName}'s Career Stats Line Chart`}
                description={`This line chart provides a visual representation of ${player.firstName}'s stats throughout their career.  Use the buttons below the chart to toggle which stats to display.`}  
            />
            <div className={chartContainer}>
            <Grid item xs={12}>
                <LeagueButtons/>
            </Grid>
            <Grid className={chart} item xs={11}>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart className={chart} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    {
                        ChartLines()    
                    }
                </LineChart>
            </ResponsiveContainer>
        </Grid>

        <Grid item xs={12}>
            <FormControl component="fieldset">
                    <FormGroup row className={checkboxes}>
                    <ChartButtons/>
                    </FormGroup>       
            </FormControl>
        </Grid>
        </div>
        </Grid>
    )
}

export default PlayerCareerChart
