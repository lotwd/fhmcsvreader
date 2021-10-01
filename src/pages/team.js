import React, {useContext, useEffect} from 'react'
import { navigate } from 'gatsby'
import TeamPage from '../components/teamPage/teamPage'
import { DataManagerContext } from '../components/dataManager/dataManager'

const Team = ({location}) => {
    const state = location?.state
    const id = state ? state?.id : undefined
    const leagueId = state ? state?.leagueId : undefined
    const { getTeamFromDataCache, getPlayersForTeam, getLeagueAbbrFromId } = useContext(DataManagerContext)
    const team = id && leagueId ? getTeamFromDataCache(id, leagueId ) : undefined
    const leagueAbbr = leagueId ? getLeagueAbbrFromId(leagueId) : undefined
    useEffect(()=>{
        if(!team){
            navigate('/');
          }
    },[team])
    if(!team)return <div>There is no team data loaded, redirecting home</div>
    team['players'] = getPlayersForTeam(id)
    return (
        <TeamPage team={team} leagueAbbr={leagueAbbr}/>
    )
}

export default Team
