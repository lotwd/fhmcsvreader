import React, {useContext, useState} from 'react'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from 'recharts'
import { FormControlLabel, Checkbox, Grid, FormControl, FormGroup } from '@material-ui/core'
import { DataManagerContext } from '../../dataManager/dataManager'
import ChartHeading from '../../chartHeading/chartHeading'
import useStyles from './styles'
import { useTheme } from '@material-ui/core/styles'

const PlayerGameByGameChart = ({player}) => {
const theme  = useTheme()
const { getPlayerGamesColumns, getPlayerGamesRows, getGoalieGamesColumns } = useContext(DataManagerContext)
const { checkboxes, checkboxesContainer, checked, chart, chartContainer, unchecked } = useStyles()
const columns = (player.positions.includes('G') ? getGoalieGamesColumns(120, true) : getPlayerGamesColumns(120, true)).filter(column=>!['teamHome', 'outcome', 'teamAway','date', 'league', 'type'].includes(column.field))
const [ checkboxesState, setCheckboxesState ] = useState(()=>{
    const checkboxesObj = {}
    columns?.map(column=>(
        column.field
        ?
        {[column.field]:column.field === 'points' || column.field === 'savePercentage'}
        :
        null
    ))
    .filter(column=>column)
    .forEach(checkbox=>{
        checkboxesObj[Object.keys(checkbox)?.[0]] = Object.values(checkbox)?.[0]
    })
    return checkboxesObj
    })
const rows = getPlayerGamesRows(player?.boxscores)

const data = rows.map((game,key)=>{
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
const ChartButtons = () => {
    const colorsCopy = barColors.filter(bc=>bc)
    return (
            columns.map(button=>(
                <FormControlLabel 
                    key={button.field}
                    placement="bottom"
                    style={{backgroundColor: checkboxesState[button.field] ? colorsCopy?.shift() || 'green' : theme.palette.primary.light}}
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
    return(
        Object.keys(checkboxesState).map((checkbox, key)=>(
            checkboxesState[checkbox]
            &&
            <Line key={checkbox} type="monotone" dot={false} strokeWidth={2.5} dataKey={checkbox} stroke={barColors[key % barColors.length]}/>
        ))
    )
}
    return (
        <Grid container justifyContent="center">
            <ChartHeading 
                title={`${player.fullName}'s Game To Game Stats Line Chart`}
                description={`This line chart provides a visual representation of a ${player.firstName}'s game to game stats for the current season.  Use the buttons below the chart to toggle which stats to display.`}   
            />
        <div className={chartContainer}>
        <Grid item xs={12}>
        <ResponsiveContainer width="100%" height={500}>
        <LineChart className={chart} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {
                ChartLines()    
            }
        </LineChart>
        </ResponsiveContainer>
        </Grid>

        <Grid className={checkboxesContainer} item xs={12}>
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

export default PlayerGameByGameChart
