import React, {useContext, useEffect} from 'react'
import { DataManagerContext } from '../components/dataManager/dataManager'
import { navigate } from 'gatsby'
import PlayerPage from '../components/playerPage/playerPage'

const Player = ({location}) => {
    const state = location?.state
    const id = state ? state?.id : undefined
    const { getPlayerById, getTeamAbbr } = useContext(DataManagerContext)
    const player = id ? getPlayerById(location?.state?.id) : undefined
    useEffect(()=>{
        if(!player){
            navigate('/');
          }
    },[player])
    const teamAbbr = getTeamAbbr(player?.teamId)
    if(!player)return <div>There is no player data loaded, redirecting home...</div>
    return (
        <PlayerPage player={player} teamAbbr={teamAbbr}/>
    )
}

export default Player