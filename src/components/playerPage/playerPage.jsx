import React from 'react'
import { Helmet} from 'react-helmet'
import { Grid, IconButton } from '@material-ui/core'
import { navigate } from 'gatsby'
import { ArrowBack } from '@material-ui/icons'
import Navbar from '../navbar/navbar'
import PlayerTitle from './playerTitle/playerTitle'
import PlayerCareerStats from './playerCareerStats/playerCareerStats'
import PlayerCareerChart from './playerCareerChart/playerCareerChart'
import PlayerGameByGameChart from './playerGameByGameChart/playerGameByGameChart'
import PlayerVsTeamStats from './playerVsTeamStats/playerVsTeamStats'
import PlayerVsTeamChart from './playerVsTeamChart/playerVsTeamChart'
import PlayerGameByGameStats from './playerGameByGameStats/playerGameByGameStats'
import PlayerStory from './playerStory/playerStory'
import useStyles from './styles'

const PlayerPage = ({player, teamAbbr}) => { 
    const { container } = useStyles()
    return (
        <>
        <Helmet title={`${player.fullName} - ${teamAbbr} || Unofficial FHM CSV Reader`}/>
        <Grid container className={container} justifyContent="center">
            <Navbar backButton={<IconButton onClick={()=>navigate(-1)}><ArrowBack/>{teamAbbr}</IconButton>}/>
            <PlayerTitle name={ `${player.firstName} ${player.lastName}` }/>
            <PlayerStory player={player}/>
            <PlayerCareerStats player={player}/>
            <PlayerCareerChart player={player}/>
            <PlayerGameByGameStats player={player}/>
            <PlayerGameByGameChart player={player}/>
            <PlayerVsTeamStats player={player}/>
            <PlayerVsTeamChart player={player}/>
        </Grid>
        </>
    )
}

export default PlayerPage
