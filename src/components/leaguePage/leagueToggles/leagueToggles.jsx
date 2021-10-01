import React from 'react'
import { FormControl, Radio, RadioGroup, FormControlLabel } from '@material-ui/core'
import useStyles from './styles'

const LeagueToggles = ({view, setView, disabled}) => {
    const { checkboxes, checked } = useStyles()
    if(disabled.includes('league')) return null
    return (
        <FormControl className={checkboxes} component="fieldset">
            <RadioGroup row aria-label="toggle divisions conference league" name="standingsToggle" value={view} onChange={(e)=>{setView(e.target.value)}}>
            {
                !disabled.includes('divisions') && <FormControlLabel className={view==='divisions' ? checked : null} value="divisions" control={<Radio />} label="Divisions" />
            }
            {
                !disabled.includes('conferences') && <FormControlLabel className={view==='conferences' ? checked : null} value="conferences" control={<Radio />} label="Conferences" />
            }
            {
                !disabled.includes('league') && <FormControlLabel className={view==='league' ? checked : null} value="league" control={<Radio />} label="League" />
            }      
            </RadioGroup>
        </FormControl>
    )
}

export default LeagueToggles
