import React, {useState} from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts'
import { Grid, FormControl,FormGroup, Checkbox, FormControlLabel } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import useStyles from './styles'

const PlayerStatsChart = ({data, chartKey, buttonsData, activeSet}) => {
    const theme = useTheme()
    const { checkboxes, checked, unchecked, chart } = useStyles()
    const chartData = data.map(player=>(
        {firstName:player?.firstName, lastName:player?.lastName, fullName:player?.fullName, ...player?.stats?.[activeSet]}
    ))
    const [checkboxesState, setCheckboxesState] = useState(()=>{
        const state = {}
        for(let checkbox of buttonsData){
            state[checkbox.field] = chartKey === checkbox.field ? true : false
        }
        return state
    })
    const [playerCheckboxesState, setPlayerCheckboxesState] = useState(()=>{
        const state = {}
        let totalSelected = 0
        for(let checkbox of chartData){
            state[checkbox.fullName] = totalSelected < 3
            totalSelected++
        }
        return state
    })
    const handleCheckboxesChange = (e, isFor) => {
        if(!["stats","players"].includes(isFor))return
        const payload = {[e.target.name]:e.target.checked}
        isFor==="stats" && setCheckboxesState({...checkboxesState, ...payload})
        isFor==="players" && setPlayerCheckboxesState({...playerCheckboxesState, ...payload})
    }
    const barColors = [theme.palette.secondary.light, theme.palette.secondary.contrastText, theme.palette.secondary.dark, 'purple', 'darkgreen', 'darkbrown', 'orange']
    const ChartButtons = () => {
        const colorsCopy = barColors.filter(bc=>bc)
        return (
                buttonsData
                .filter(button=>(!['POS'].includes(button.headerName)))
                .map(button=>(
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
    const PlayerButtons = () => {
        return (
            chartData.map(player=>(
                <FormControlLabel 
                    key={player.fullName}
                    className={playerCheckboxesState[player.fullName] ? checked : unchecked}
                    control={
                        <Checkbox 
                            checked={
                                playerCheckboxesState[player.fullName]
                            } 
                            onChange={e=>handleCheckboxesChange(e, "players")} 
                            name={player.fullName}
                        />
                    } 
                    label={`${player.firstName[0]}. ${player.lastName}`} />
            ))
        )
    }
    const ChartBars = () => {
        const colorsCopy = barColors.filter(bc=>bc)
        return(
            Object.keys(checkboxesState).map((checkbox, key)=>(
                checkboxesState[checkbox]
                &&
                <Bar key={checkbox} dataKey={checkbox} fill={colorsCopy.length ? colorsCopy.shift() : 'green'}/>
            ))
        )
    }
    const reponsiveContainerHeight = Array.from(Object.keys(playerCheckboxesState)).filter(checkboxKey=>(
        playerCheckboxesState[checkboxKey]
    )).length * 100
        
    return (
        <Grid container className={chart} justifyContent="center">
            <Grid item xs={12}>
                <FormControl component="fieldset">
                        <FormGroup row className={checkboxes}>
                            <PlayerButtons/>
                        </FormGroup>       
                </FormControl>
            </Grid>
            <Grid item xs={11}>
                <ResponsiveContainer width="100%" minHeight={`${reponsiveContainerHeight}px`} maxHeight={`${reponsiveContainerHeight}px`}>
                    <BarChart layout="vertical" data={chartData.filter(stat=>playerCheckboxesState[stat.fullName])}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="fullName" width={175} type="category"/>
                        <Tooltip/>
                        {
                            ChartBars()
                        }
                    </BarChart>
                </ResponsiveContainer>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                        <FormGroup row className={checkboxes}>
                           <ChartButtons/>
                        </FormGroup>       
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default PlayerStatsChart
