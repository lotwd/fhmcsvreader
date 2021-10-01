import React, {useContext, useState} from 'react'
import { PieChart, Pie, Cell } from 'recharts';
import { Grid, Select, MenuItem, FormGroup, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';
import { DataManagerContext } from '../../dataManager/dataManager'
import ChartHeading from '../../chartHeading/chartHeading'
import { useTheme } from '@material-ui/core/styles'
import useStyles from './styles'

const PlayerVsTeamChart = ({player}) => {
    const { checkboxesContainer, checkboxes, checked, unchecked, dropdown } = useStyles()
    const stats = player?.vs
    const theme = useTheme()
    const { getPlayerVsTeamRows, getPlayerVsTeamColumns, getGoalieVsTeamColumns } = useContext(DataManagerContext)
    const activeSet = 'rs'
   // const [ activeSet, setActiveSet ] = useState('rs')
    const [ activeStat, setActiveStat ] = useState('games')
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
    const data = rows
    .filter(row=>(row?.[activeStat] && checkboxesState[row?.league]))
    .map(row=>(
        {name:row?.team, value:row?.[activeStat]}
    ))
    const barColors = [theme.palette.secondary.light, theme.palette.secondary.contrastText, theme.palette.secondary.dark, 'purple', 'darkgreen', 'darkbrown', 'darkred', 'orange', 'rust', 'darkblue']
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, name, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.75;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text style={{fontSize:'12px'}} x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${name} ${value}`}
            </text>
        );
    };       
    const handleActiveSelectChanged = (e) => {
        setActiveStat(e.target.value)
    }
    const dropdownOptions = (player.positions.includes('G') ? getGoalieVsTeamColumns(120) : getPlayerVsTeamColumns(120))?.map(dropdown=>({display:dropdown.headerName, value:dropdown.field}))
    return (
        <Grid container justifyContent="center">
            <ChartHeading 
                title={`${player.fullName}'s Vs Teams Stats Pie Chart`} 
                description={`This pie chart provides a visual representation of ${player.firstName}'s stats versus other teams in the league.  Use the dropdown below the chart to select which stat to display.`}
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
            <Grid item className={dropdown} xs={12}>
                <Select style={{width:"300px"}} onChange={handleActiveSelectChanged} displayEmpty labelId="label" id="select" renderValue={()=>(dropdownOptions.find(option=>option.value === activeStat)?.display)} value={activeStat}>
                    {
                        dropdownOptions.map(option=>(
                            <MenuItem key={option.value} value={option.value}>{option.display}</MenuItem>
                        ))
                    }
                </Select>
            </Grid>
            <Grid item xs={12} style={{display:"flex", justifyContent:"center"}}>
            <PieChart width={500} height={600}>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={250} fill="#8884d8" labelLine={false} label={renderCustomizedLabel} >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                    ))}
                </Pie>
            </PieChart>
            </Grid>
        </Grid>
    )
}

export default PlayerVsTeamChart
