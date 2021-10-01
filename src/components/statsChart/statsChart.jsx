import React, {useState} from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts'
import { Grid, FormControl, FormGroup, Checkbox,FormControlLabel  } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import useStyles from './styles'

const StatsChart = ({data, chartKey, buttonsData}) => { 
    const theme = useTheme()
    const { checkboxes, checked, unchecked, checkboxesContainer, bar, chart } = useStyles()
    const statsData = data
   
    const [checkboxesState, setCheckboxesState] = useState(()=>{
        const state = {}
        for(let checkbox of buttonsData){
            state[checkbox.field] = chartKey === checkbox.field ? true : false
        }
        return state
    })
    const [teamCheckboxesState, setTeamCheckboxesState] = useState(()=>{
        const state = {}
        let totalSelected = 0
        for(let checkbox of data){
            state[checkbox.name] = totalSelected < 3
            totalSelected++
        }
        return state
    })
    const handleCheckboxesChange = (e, isFor) => {
        if(!["stats","teams"].includes(isFor))return
        const payload = {[e.target.name]:e.target.checked}
        isFor==="stats" && setCheckboxesState({...checkboxesState, ...payload})
        isFor==="teams" && setTeamCheckboxesState({...teamCheckboxesState, ...payload})
    }
    const barColors = [theme.palette.secondary.light, theme.palette.secondary.contrastText, theme.palette.secondary.dark, 'purple', 'darkgreen', 'darkbrown', 'orange']
    const ChartButtons = () => {
        const colorsCopy = barColors.filter(bc=>bc)
        return (
                buttonsData.map(button=>(
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
    const TeamButtons = () => {
        return (
            data.map(team=>(
                <FormControlLabel 
                    key={team.nickname}
                    className={teamCheckboxesState[team.name] ? checked : unchecked}
                    control={
                        <Checkbox 
                            checked={
                                teamCheckboxesState[team.name]
                            } 
                            onChange={e=>handleCheckboxesChange(e, "teams")} 
                            name={team.name}
                        />
                    } 
                    label={team.name} />
            ))
        )
    }
    const ChartBars = () => {
        const colorsCopy = barColors.filter(bc=>bc)
        return(
            Object.keys(checkboxesState).map((checkbox)=>(
                checkboxesState[checkbox]
                &&
                <Bar key={checkbox} className={bar} dataKey={checkbox} fill={barColors.length ? colorsCopy.shift() : 'green'}/>
            ))
        )
    }
    const reponsiveContainerHeight = Array.from(Object.keys(teamCheckboxesState)).filter(checkboxKey=>(
        teamCheckboxesState[checkboxKey]
    )).length * 100
    return (
        <Grid className={chart} container justifyContent="center">
            <Grid item xs={12}>
                <FormControl className={checkboxesContainer} component="fieldset">
                        <FormGroup row className={checkboxes}>
                            <TeamButtons/>
                        </FormGroup>       
                </FormControl>
            </Grid>
            <Grid item xs={11}>
                <ResponsiveContainer width="100%" minHeight={`${reponsiveContainerHeight}px`} maxHeight={`${reponsiveContainerHeight}px`}>
                    <BarChart layout="vertical" data={statsData.filter(stat=>teamCheckboxesState[stat.name])}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="nickname" width={150} type="category"/>
                        <Tooltip/>
                        {
                            ChartBars()
                        }
                    </BarChart>
                </ResponsiveContainer>
            </Grid>
            <Grid item xs={12}>
                <FormControl className={checkboxesContainer} component="fieldset">
                        <FormGroup row className={checkboxes}>
                           <ChartButtons/>
                        </FormGroup>       
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default StatsChart
