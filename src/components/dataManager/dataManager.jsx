import React, {useState, createContext} from 'react'
import Papa from 'papaparse'
import { playerColumns } from './playerColumns'
import { playerRows } from './playerRows'
import { playerCareerColumns } from './playerCareerColumns'
import { goalieCareerColumns } from './goalieCareerColumns'
import { playerCareerRows } from './playerCareerRows'
import { PlayerGamesRows } from './playerGamesRows'
import { playerGamesColumns } from './playerGamesColumns'
import { goalieGamesColumns } from './goalieGamesColumns'
import { playerStatsOffenseColumns } from './playerStatsOffenseColumns'
import { playerStatsDefenseColumns } from './playerStatsDefenseColumns'
import { playerStatsOtherColumns } from './playerStatsOtherColumns'
import { playerVsTeamRows } from './playerVsTeamRows'
import { playerVsTeamColumns } from './playerVsTeamColumns'
import { goalieVsTeamColumns } from './goalieVsTeamsColumns'
import { goalieStatsColumns } from './goalieStatsColumns'
import { teamStatsColumns } from './teamStatsColumns'
import { teamStatsRows } from './teamStatsRows'
import { teamStatsOffenseColumns } from './teamStatsOffenseColumns'
import { teamStatsOffenseRows } from './teamStatsOffenseRows'
import { teamStatsDefenseColumns } from './teamStatsDefenseColumns'
import { teamStatsAfterPeriodColumns } from './teamStatsAfterPeriodColumns'
import { verifyFilesUploaded } from './verifyFilesUploaded'

export const DataManagerContext = createContext({
    data:{},
    setData:()=>{},
    selectedLeague:'',
    getTeamData:()=>{},
    getTeamStats:()=>{},
    getTeamRecords:()=>{},
    getTeam:()=>{},
    getTeamsForLeague:()=>{},
    getConferences:()=>{},
    getDivisions:()=>{},
    getConferenceTeams:()=>{},
    getLeague:()=>{},
    teamSortBy:null,
    setTeamSortBy:()=>{},
    getLeagueTeams:()=>{},
    getPlayerById:()=>{},
    getPlayerColumns:()=>{},
    getPlayerStatsOffenseColumns:()=>{},
    getPlayerStatsDefenseColumns:()=>{},
    getPlayerStatsOtherColumns:()=>{},
    getPlayerVsTeamRows:()=>{},
    getPlayerVsTeamColumns:()=>{},
    getGoalieVsTeamColumns:()=>{},
    getGoalieStatsColumns:()=>{},
    getPlayerRows:()=>{},
    getPlayerCareerRows:()=>{},
    getPlayerCareerColumns:()=>{},
    getGoalieCareerColumns:()=>{},
    getTeamAbbr:()=>{},
    getBoxScoresForPlayer:()=>{},
    getPlayerGamesRows:()=>{},
    getPlayerGamesColumns:()=>{},
    getGoalieGamesColumns:()=>{},
    totalPlayerGameColumns:()=>{},
    getLeagueAbbrFromTeamAbbr:()=>{},
    leagueDataCache:{},
    setLeagueDataCache:()=>{},
    getTeamFromDataCache:()=>{},
    getTeamStatsColumns:()=>{},
    getTeamStatsRows:()=>{},
    getTeamStatsOffenseColumns:()=>{},
    getTeamStatsOffenseRows:()=>{},
    getTeamStatsDefenseColumns:()=>{},
    getTeamStatsAfterPeriodColumns:()=>{},
    getTeamFullNameFromAbbr:()=>{},
    getPlayersForTeam:()=>{},
    getLeagueAbbrFromId:()=>{},
    handleFileUpload:()=>{},
    getTeamIdFromAbbr:()=>{}
})

const DataManager = ({demoData, children}) => {
    const [data, setData] = useState()
    const [selectedLeague, setSelectedLeague] = useState(null)
    // const selectedLeague = {selected:false}
    const [teamSortBy, setTeamSortBy] = useState('wins')
    const [leagueDataCache, setLeagueDataCache] = useState({})
    const handleFileUpload = (e) => {
        setLeagueDataCache([])
        const promises = []
        const verified = verifyFilesUploaded(e.target.files)
        if(!verified.success)return verified.errors
        for(let file of e.target.files){
            promises.push(
                new Promise((resolve, reject)=>{
                    const reader = new FileReader()
                    const name = file.name.replace('.csv', '')
                    reader.onloadend = (e) => {
                        const filesObject = {}
                        filesObject[name] = Papa.parse(reader.result, {encoding:"UTF-8"}).data
                        resolve(filesObject)
                    }
                    reader.readAsBinaryString(file)
                })
            )
        }
        Promise.all(promises)
        .then(
            (results)=>{
                const resultObject = {}
                for(let result of results){
                    resultObject[Object.keys(result)[0]] = Object.values(result)[0]
                }
                setData(resultObject)
            }
        )
        return []
    }
    const getTeamData = (id) => (
        data?.team_data?.filter(team=>team[0] === id)[0]
    )
    const getTeamStats = (id, season) => (
        {
            regular:data?.team_stats?.filter(team=>team[0] === id)[0],
            playoffs:data?.team_stats_playoffs?.filter(team=>team[0] === id)[0]
        }[season]
    )
    const getTeamRecords = (id) => (
        data?.team_records?.filter(team=>team[1] === id)[0]
    )
    const getLeagueName = (id) => (
        data?.league_data.filter(league=>league[0] === id)?.[0]?.[1]
    )
    const getLeagueAbbrFromTeamAbbr = (abbr) => {
        const leagueId = data?.team_data?.find(team=>team[4]===abbr)?.[1]
        const leagueAbbr = data?.league_data?.find(league=>league[0] === leagueId)?.[2]
        return( leagueAbbr || 'UNK' )  
    }
    const getLeagueAbbrFromTeamId = (id) => {
        const leagueId = data?.team_data?.find(team=>team[0]===id)?.[1]
        const leagueAbbr = data?.league_data?.find(league=>league[0] === leagueId)?.[2]
        return leagueAbbr || ''
    }
    const getLeagueAbbrFromId = (id) => (
        data?.league_data?.find(league=>league[0] === id)?.[2]
    )
    const getLeague = (id) => {
        if(leagueDataCache[id])return leagueDataCache[id]
        const conferences = getConferences(id)
        const divisions = getDivisions(id)
        const teams = getTeamsForLeague(id)
        setSelectedLeague(getLeagueAbbrFromId(id))
        const teamsData = data.team_data?.filter(team=>team[1] === id).map(team=>team[0])
        const playersData = data?.player_master?.filter(player=>teamsData.includes(player[1]))
        const players = []//getPlayersForLeague(id)
        const league = (
            conferences.length
            ?
            {
                id:id,
                abbr:getLeagueAbbrFromId(id),
                leagueName:getLeagueName(id),
                playersData:playersData,
                teamCount:teams.length + 1,
                conferences:conferences.map((conference)=>{
                    return (
                    {
                        ...conference,
                        
                        divisions:divisions.filter((division)=>(
                            division.conferenceId === conference.id
                        ))                
                        .map((division)=>{
                            const tms = teams.filter(team=>(
                                team.divisionId === division.id
                                && team.conferenceId === conference.id
                            ))
                            .map(team=>(
                                {
                                    ...team,
                                    players:players?.filter(player=>(
                                         player.teamId === team.id
                                    ))
                                }
                            ))
                            const rows = getTeamStatsRows(tms, id)
                            return (
                            {
                                ...division,
                                rows:rows,
                                teams:tms
                            }
                        )}),
                    }
                )
            }
            )
            }  
            :
            divisions.length
            ?
            {
                id:id,
                abbr:getLeagueAbbrFromId(id),
                leagueName:getLeagueName(id),
                teamCount:teams.length + 1,
                divisions:divisions.map(division=>{
                    const tms = teams.filter(team=>(
                        team.divisionId === division.id
                    ))
                    .map(team=>(
                        {
                            ...team,
                            players:players?.filter(player=>(
                                player.teamId === team.id
                            ))
                        }
                    ))
                    const rows = getTeamStatsRows(tms, id)
                    return (
                        {
                            ...division,
                            teams:tms,
                            rows:rows
                        }
                    )
            })
            }
            :
            {
                id:id,
                abbr:getLeagueAbbrFromId(id),
                leagueName:getLeagueName(id),
                teamCount:teams.length + 1,
                teams:teams.map(team=>(
                    {
                        ...team,
                        players:players?.filter(player=>(
                             player.teamId === team.id
                        )),
                    }
                ))
            }
        )
        setLeagueDataCache({...leagueDataCache, [id]:league})
        return league
    }
    const getTeamsForLeague = (id) => (
        data?.team_data?.filter(team=>team[1] === id)
            .map((team=>(
                getTeam(team[0])
            )))
    )
    const getPlayerStats = (id) => {
        const rsIndex = data?.player_skater_stats_rs?.findIndex(player=>player[0] === id)
        const poIndex = data?.player_skater_stats_po?.findIndex(player=>player[0] === id)
        const psIndex = data?.player_skater_stats_ps?.findIndex(player=>player[0] === id)
        const grsIndex = data?.player_goalie_stats_rs?.findIndex(player=>player[0] === id)
        const gpoIndex = data?.player_goalie_stats_po?.findIndex(player=>player[0] === id)
        const gpsIndex = data?.player_goalie_stats_ps?.findIndex(player=>player[0] === id)
        const careerSeasons = data?.player_skater_career_stats_rs?.filter(player=>player[0] === id)
        const careerSeasonsPre = data?.player_skater_career_stats_ps?.filter(player=>player[0] === id)
        const careerSeasonsPost = data?.player_skater_career_stats_po?.filter(player=>player[0] === id)
        const goalieCareerSeasons = data?.player_goalie_career_stats_rs?.filter(player=>player[0] === id)
        const goalieCareerSeasonsPre = data?.player_goalie_career_stats_ps?.filter(player=>player[0] === id)
        const goalieCareerSeasonsPost = data?.player_goalie_career_stats_po?.filter(player=>player[0] === id)
        const statsToJSON = (propertyName, statsData, propertyType) => {
            if(!statsData)return null
            const playerStats = (propertyName, statsData) => {
                const stats = {}
                stats[propertyName] = propertyType === 'player'
                ?
                {
                    games:parseInt(statsData[3]),
                    goals:parseInt(statsData[4]),
                    goalsPerGame:(parseInt(statsData[4]) / parseInt(statsData[3])).toFixed(2),
                    assists:parseInt(statsData[5]),
                    assistsPerGame:(parseInt(statsData[5]) / parseInt(statsData[3])).toFixed(2),
                    points:parseInt(statsData[4]) + parseInt(statsData[5]),
                    pointsPerGame:((parseInt(statsData[4]) + parseInt(statsData[5])) / parseInt(statsData[3])).toFixed(2),
                    plusMinus:parseInt(statsData[6]),
                    penalties:parseInt(statsData[7]),
                    penaltyMinutesPerGame:(parseInt(statsData[7]) / parseInt(statsData[3])).toFixed(2),
                    powerplayGoals:parseInt(statsData[8]),
                    powerplayAssists:parseInt(statsData[9]),
                    powerplayPoints:parseInt(statsData[8]) + parseInt(statsData[9]),
                    shorthandedGoals:parseInt(statsData[10]),
                    shorthandedAssists:parseInt(statsData[11]),
                    shorthandedPoints:parseInt(statsData[10]) + parseInt(statsData[11]),
                    fights:parseInt(statsData[12]),
                    fightsWon:parseInt(statsData[13]),
                    fightWinPercent:parseInt(statsData[12]) > 0 ? ((parseInt(statsData[13]) / parseInt(statsData[12])) * 100).toFixed(2) : 0,
                    hits:parseInt(statsData[14]),
                    hitsPerGame:(parseInt(statsData[14]) / parseInt(statsData[3])).toFixed(2),
                    giveaways:parseInt(statsData[15]),
                    giveawaysPerGame:(parseInt(statsData[15]) / parseInt(statsData[3])).toFixed(2),
                    takeaways:parseInt(statsData[16]),
                    takeawaysPerGame:(parseInt(statsData[16]) / parseInt(statsData[3])).toFixed(2),
                    shotsBlocked:parseInt(statsData[17]),
                    shotsBlockedPerGame:(parseInt(statsData[17]) / parseInt(statsData[3])).toFixed(2),
                    gameRating:parseInt(statsData[18]),
                    gameRatingOffense:parseInt(statsData[19]),
                    gameRatingDefense:parseInt(statsData[20]),
                    shots:parseInt(statsData[21]),
                    shotsPerGame:(parseInt(statsData[21]) / parseInt(statsData[3])).toFixed(2),
                    timeOnIce:parseInt(statsData[22]),
                    timeOnIcePerGame:new Date((parseInt(statsData[22]) / parseInt(statsData[3])) * 1000),
                    powerplayTimeOnIce:parseInt(statsData[23]) || '00:00',
                    powerplayTimeOnIcePerGame:new Date((parseInt(statsData[23]) / parseInt(statsData[3])) * 1000),
                    shorthandedTimeOnIce:parseInt(statsData[24]),
                    shorthandedTimeOnIcePerGame:new Date((parseInt(statsData[24]) / parseInt(statsData[3])) * 1000),
                    pdo:parseFloat(statsData[25]),
                    goalsFor60:parseFloat(statsData[26]),
                    goalsAgainst60:parseFloat(statsData[27]),
                    shotsFor60:parseFloat(statsData[28]),
                    shotsAgainst60:parseFloat(statsData[29]),
                    cf:parseInt(statsData[30]),
                    ca:parseInt(statsData[31]),
                    cfPercent:parseFloat(statsData[32]),
                    cfPercentRel:parseFloat(statsData[33]),
                    ff:parseFloat(statsData[34]),
                    fa:parseFloat(statsData[35]),
                    ffPercent:parseFloat(statsData[36]),
                    ffPercentRel:parseFloat(statsData[37]),
                    gameWinningGoals:parseInt(statsData[38]),
                    faceoffs:parseInt(statsData[39]),
                    faceoffsWon:parseInt(statsData[40]),
                    faceoffWinPercent:parseInt(statsData[39]) > 0 ? (parseInt(statsData[40]) / parseInt(statsData[39]) * 100).toFixed(2) : 0.00
                }
                :
                propertyType === 'goalie'
                ?
                {
                    games:parseInt(statsData[3]),
                    minutes:parseInt(statsData[4]),
                    minutesPerGame:(parseInt(statsData[4]) / parseInt(statsData[3])).toFixed(1),
                    wins:parseInt(statsData[5]),
                    losses:parseInt(statsData[6]),
                    ot:parseInt(statsData[7]),
                    shotsAgainst:parseInt(statsData[8]),
                    shotsAgainstPerGame:(parseInt(statsData[8]) / parseInt(statsData[3])).toFixed(1),
                    saves:parseInt(statsData[9]),
                    savesPerGame:(parseInt(statsData[9]) / parseInt(statsData[3])).toFixed(1),
                    goalsAgainst:parseInt(statsData[10]),
                    goalsAgainstPerGame:(parseInt(statsData[10]) / parseInt(statsData[3])).toFixed(1),
                    goalsAgainstAverage:parseFloat(statsData[11]).toFixed(2),
                    shutouts:parseInt(statsData[12]),
                    savePercentage:statsData[13],
                    gameRating:parseInt(statsData[14])
                }
                :
                propertyType === 'career'
                ?
                {
                    id:`${statsData[1]}-${statsData[2]}`,
                    year:parseInt(statsData[1]),
                    team:getTeamAbbr(statsData[2]),
                    league:getLeagueName(statsData[3]),
                    games:parseInt(statsData[4]),
                    goals:parseInt(statsData[5]),
                    assists:parseInt(statsData[6]),
                    points:parseInt(statsData[5]) + parseInt(statsData[6]),
                    plusMinus:parseInt(statsData[8]),
                    penalties:parseInt(statsData[7]),
                    powerplayGoals:parseInt(statsData[9]),
                    powerplayAssists:parseInt(statsData[10]),
                    powerplayPoints:parseInt(statsData[9]) + parseInt(statsData[10]),
                    shorthandedGoals:parseInt(statsData[11]),
                    shorthandedAssists:parseInt(statsData[12]),
                    shorthandedPoints:parseInt(statsData[11]) + parseInt(statsData[12]),
                    fights:parseInt(statsData[25]),
                    fightsWon:parseInt(statsData[26]),
                    fightWinPercent:parseInt(statsData[25]) > 0 ? ((parseInt(statsData[26]) / parseInt(statsData[25])) * 100).toFixed(2) : 0,
                    hits:parseInt(statsData[18]),
                    giveaways:parseInt(statsData[19]),
                    takeaways:parseInt(statsData[20]),
                    shotsBlocked:parseInt(statsData[21]),
                    gameRating:statsData[13],
                    shots:parseInt(statsData[15]),
                    timeOnIce:new Date(parseInt(statsData[22]) * 1000).toISOString().substr(11, 8),
                    timeOnIcePerGame:parseInt(statsData[4]) ? new Date((parseInt(statsData[22]) / statsData[4]) * 1000) : 0,
                    timeOnIcePerGameSeconds:(parseInt(statsData[22]) / parseInt(statsData[4])),
                    goalsFor60:parseInt(statsData[22]) > 0 ? ((parseInt(statsData[5]) / (parseInt(statsData[22]) / 60)) * 60).toFixed(3) : 0,//parseInt(statsData[5]) / (parseInt(statsData[22]) / 60) : 0,
                    shotsFor60:parseInt(statsData[22]) > 0 ? ((parseInt(statsData[15]) / (parseInt(statsData[22]) / 60)) * 60).toFixed(3) : 0,
                    gameWinningGoals:parseInt(statsData[14]),
                    faceoffs:parseInt(statsData[16]),
                    faceoffsWon:parseInt(statsData[17]),
                    faceoffWinPercent:parseInt(statsData[16]) > 0 ? (parseInt(statsData[17]) / parseInt(statsData[16]) * 100).toFixed(2) : 0.00,
                    powerplayTimeOnIce:new Date(parseInt(statsData[23]) * 1000).toISOString().substr(11, 8),
                    powerplayTimeOnIcePerGame:parseInt(statsData[4]) > 0 ? new Date(parseInt((parseInt(statsData[23]) * 1000 / parseInt(statsData[4])))).toISOString().substr(11, 8) : 0,
                    shorthandedTimeOnIce:new Date(parseInt(statsData[24])*1000).toISOString().substr(11, 8),
                    shorthandedTimeOnIcePerGame:new Date((parseInt(statsData[24]) / parseInt(statsData[3])) * 1000),
                }
                :
                propertyType === "career-goalie"
                ?
                {
                    id:`${statsData[1]}-${statsData[2]}`,
                    year:parseInt(statsData[1]),
                    team:getTeamAbbr(statsData[2]),
                    league:getLeagueName(statsData[3]),
                    games:parseInt(statsData[4]),
                    minutes:parseInt(parseInt(statsData[5]) / 60),
                    wins:parseInt(statsData[6]),
                    losses:parseInt(statsData[7]),
                    ot:parseInt(statsData[8]),
                    emptyNetGoals:parseInt(statsData[9]),
                    shutouts:parseInt(statsData[10]),
                    goalsAgainst:parseInt(statsData[11]),
                    shotsAgainst:parseInt(statsData[12]),
                    saves:parseInt(statsData[12]) - parseInt(statsData[11]),
                    gameRating:parseInt(statsData[13]),
                    savePercentage:(((parseInt(statsData[12]) - parseInt(statsData[11])) / parseInt(statsData[12])) * 100).toFixed(2),
                    goalsAgainstAverage:(parseInt(statsData[11]) / parseInt(parseInt(statsData[5]) / 3600)).toFixed(2)
                }
                :
                {}
                return propertyType === 'career' || propertyType === 'career-goalie' ? stats.crs : stats
            }
            return {...playerStats(propertyName, statsData)}
       }
       const stats = {}
       if(rsIndex)Object.assign(stats, statsToJSON('rs', data?.player_skater_stats_rs[rsIndex], 'player'))
       if(poIndex)Object.assign(stats, statsToJSON('po', data?.player_skater_stats_po[poIndex], 'player'))
       if(psIndex)Object.assign(stats, statsToJSON('ps', data?.player_skater_stats_ps[psIndex], 'player'))
       if(grsIndex)Object.assign(stats, statsToJSON('rs', data?.player_goalie_stats_rs[grsIndex], 'goalie'))
       if(gpoIndex)Object.assign(stats, statsToJSON('po', data?.player_goalie_stats_po[gpoIndex], 'goalie'))
       if(gpsIndex)Object.assign(stats, statsToJSON('ps', data?.player_goalie_stats_ps[gpsIndex], 'goalie'))
       if(careerSeasons.length){
            stats.career = careerSeasons.map(season=>statsToJSON('crs', season,'career'))
        }
        if(careerSeasonsPre.length){
            stats.careerPre = careerSeasonsPre.map(season=>statsToJSON('crs', season,'career'))
        }
        if(careerSeasonsPost.length){
            stats.careerPost = careerSeasonsPost.map(season=>statsToJSON('crs', season,'career'))
        }
        if(goalieCareerSeasons.length){
            stats.career = goalieCareerSeasons.map(season=>statsToJSON('crs', season, 'career-goalie'))
        }
        if(goalieCareerSeasonsPre.length){
            stats.careerPre = goalieCareerSeasonsPre.map(season=>statsToJSON('crs', season, 'career-goalie'))
        }
        if(goalieCareerSeasonsPost.length){
            stats.careerPost = goalieCareerSeasonsPost.map(season=>statsToJSON('crs', season, 'career-goalie'))
        }
        return stats
        
    }
    const getPlayerStatsVsTeams = (boxscores, goalie) => {
        const teams = {}
        boxscores.forEach(boxscore=>{ 
            const team = boxscore?.vs
            const fields 
            = 
            !goalie
            ?
            {
                league:boxscore.league,
                games:0,
                goals:0, 
                assists:0, 
                points:0, 
                goalsFirst:0, 
                goalsSecond:0, 
                goalsThird:0, 
                goalsOT:0,
                assistsFirst:0, 
                assistsSecond:0, 
                assistsThird:0, 
                assistsOT:0,
                shots:0,
                missedShots:0,
                shifts:0,
                takeaways:0,
                giveaways:0,
                hits:0,
                plusMinus:0,
                faceoffs:0,
                faceoffWins:0,
                faceoffLosses:0,
                penalties:0
            }
            :
            {
                league:boxscore.league,
                games:0,
                shotsAgainst:0,
                saves:0,
                goalsAllowed:0,
                timeOnIce:0,
                penalties:0,
                W:0,
                L:0,
                T:0
            }
            const stats = {rs:{...fields},ps:{...fields}, po:{...fields}}
            if(!teams[team])teams[team] = {...stats, league:boxscore.league}
            const keyMap = [{name:"Regular Season", value:"rs"},{name:"Pre-Season", value:"ps"},{name:"Playoffs", value:"po"}]
            const key = keyMap.find(key=>key.name===boxscore.gameType)
            if(key?.value){
                if(!goalie)
                {
                    teams[team][key.value].games++
                    teams[team][key.value].goals += boxscore.goals
                    teams[team][key.value].assists += boxscore.assists
                    teams[team][key.value].points += (boxscore.goals + boxscore.assists)
                    teams[team][key.value].goalsFirst += boxscore.goalsFirst
                    teams[team][key.value].goalsSecond += boxscore.goalsSecond
                    teams[team][key.value].goalsThird += boxscore.goalsThird
                    teams[team][key.value].goalsOT += boxscore.goalsOT
                    teams[team][key.value].assistsFirst += boxscore.primaryAssistsFirst + boxscore.secondaryAssistsFirst
                    teams[team][key.value].assistsSecond += boxscore.primaryAssistsSecond + boxscore.secondaryAssistsSecond
                    teams[team][key.value].assistsThird += boxscore.primaryAssistsThird + boxscore.secondaryAssistsThird
                    teams[team][key.value].assistsOT += boxscore.primaryAssistsOT + boxscore.secondaryAssistsOT
                    teams[team][key.value].shots += boxscore?.shots 
                    teams[team][key.value].shifts += boxscore?.shifts
                    teams[team][key.value].takeaways += boxscore?.takeaways
                    teams[team][key.value].giveaways += boxscore?.giveaways 
                    teams[team][key.value].plusMinus += boxscore?.plusMinus
                    teams[team][key.value].missedShots += boxscore?.missedShots
                    teams[team][key.value].hits += boxscore?.hits 
                    teams[team][key.value].faceoffs += boxscore?.faceoffWins + boxscore?.faceoffLosses 
                    teams[team][key.value].faceoffWins += boxscore?.faceoffWins
                    teams[team][key.value].faceoffLosses += boxscore?.faceoffLosses
                    teams[team][key.value].penalties += boxscore?.penalties
                }
                else
                {
                    teams[team][key.value].games++
                    teams[team][key.value].shotsAgainst += boxscore.shotsAgainst
                    teams[team][key.value].saves += boxscore.saves
                    teams[team][key.value].goalsAllowed += boxscore.goalsAllowed
                    teams[team][key.value].timeOnIce += boxscore.timeOnIce
                    teams[team][key.value].penalties += boxscore.penalties
                    teams[team][key.value][boxscore.outcome] += 1
                }
        }
        })
        return teams
    }
    const handleTradedPlayerIncorrectTeamId = (preseasonTradeData, tradeData) => {
        const teamOrder = []
        const teamOrders = {}
        const gamesArray = [0]
        preseasonTradeData?.forEach((dat)=>{
            if(!teamOrder.includes(dat.team))teamOrder.push(dat.team)
            if(!teamOrders[dat.league])teamOrders[dat.league] = []
            if(!teamOrders[dat.league].includes(dat.team))teamOrders[dat.league].push(dat.team)
            
        })
        tradeData?.forEach((dat)=>{
            if(!teamOrder.includes(dat.team))teamOrder.push(dat.team)
            if(!teamOrders[dat.league])teamOrders[dat.league] = []
            if(!teamOrders[dat.league].includes(dat.team))teamOrders[dat.league].push(dat.team)
        })
        const gamesData = () => {
            let gameCarryOver = 0
            let gamesAssigned = 0
            preseasonTradeData?.forEach((dat, key)=>{
                if(key===preseasonTradeData.length - 1){
                    gameCarryOver = dat.games
                }
                else
                {
                    gamesAssigned += dat.games
                    gamesArray.push(gamesAssigned)
                }
            })
            tradeData?.forEach((dat, key)=>{
                if(key===0){
                    gamesAssigned += dat.games + gameCarryOver
                    gamesArray.push(gamesAssigned)
                }
                else
                {
                    gamesAssigned += dat.games
                    gamesArray.push(gamesAssigned)
                }
            })
            gamesArray.pop()
            return {teamOrder:teamOrder, gamesArray:gamesArray, leagues:teamOrders}
        }
        return gamesData()
        
    }
    const getPlayer = (player) => { 
        const playerStats = getPlayerStats(player[0])      
        const checkForTrades = (stats) => (
            stats?.filter(season=>season?.year === playerStats?.career?.[0]?.year)
            .sort((season1, season2)=>(season2.id.split('-')[1] - season1.id.split('-')[1])))
        const tradedData = checkForTrades(playerStats?.career)
        const tradedDataPre = checkForTrades(playerStats?.careerPre)
        const tradeGamesArray = (tradedData?.length > 1 || tradedDataPre?.length > 1) ? handleTradedPlayerIncorrectTeamId(tradedDataPre, tradedData) : null
        const playerRatings = getPlayerRatings(player[0])
        const positions = getPlayerPositions(playerRatings)
        const playerBoxscores 
        = 
        (positions.includes('G') 
        ? 
        getBoxscoresForGoalies(player[0]).filter(boxscore=>boxscore.gameRating !== 0) 
        : 
        getBoxScoresForPlayer(player[0], tradeGamesArray)
        )
        .sort((boxscore1, boxscore2)=>{return new Date(boxscore1.date) - new Date(boxscore2.date)})
        if(tradeGamesArray){
            tradeGamesArray.teamOrder.forEach((team, key)=>{
                if(key !== tradeGamesArray.length - 1){
                    for(let i = tradeGamesArray.gamesArray[key]; i < tradeGamesArray.gamesArray[key + 1]; i++)
                    {
                            if(playerBoxscores[i]){
                                playerBoxscores[i].teamId = getTeamIdFromAbbr(team)
                                playerBoxscores[i].isHomeTeam = tradeGamesArray.teamOrder.includes(playerBoxscores[i].teamHome)
                                playerBoxscores[i].vs = playerBoxscores[i].isHomeTeam ? playerBoxscores[i].teamAway : playerBoxscores[i].teamHome
                            }
                    }
                }
            })
        }
        const statsVsTeams = getPlayerStatsVsTeams(playerBoxscores, positions.includes('G'))
        const rows = getPlayerGamesRows(playerBoxscores)
        const totals = totalPlayerGameColumns(rows, 
            [
                'goals',
                'goalsFirst',
                'goalsSecond',
                'goalsThird',
                'goalsOT',
                'assists',
                'assistsFirst',
                'assistsSecond',
                'assistsThird',
                'assistsOT',
                'primaryAssistsFirst',
                'primaryAssistsSecond',
                'primaryAssistsThird',
                'primaryAssistsOT',
                'secondaryAssistsFirst',
                'secondaryAssistsSecond',
                'secondaryAssistsThird',
                'secondaryAssistsOT',
                'points',
                'plusMinus',
                'shots',
                'missedShots',
                'blockedShots',
                'penalties',
                'hits',
                'takeaways',
                'giveaways',
                'faceoffWins',
                'faceoffLosses',
            ]);
            ['ps', 'rs', 'po'].forEach(statSet=>{
            if(playerStats[statSet])
                {
                    playerStats[statSet]['goalsFirst'] = totals[statSet]?.['goalsFirst']
                    playerStats[statSet]['goalsSecond'] = totals[statSet]?.['goalsSecond']
                    playerStats[statSet]['goalsThird'] = totals[statSet]?.['goalsThird']
                    playerStats[statSet]['goalsOT'] = totals[statSet]?.['goalsOT']
                    playerStats[statSet]['assistsFirst'] = totals[statSet]?.['goalsFirst']
                    playerStats[statSet]['assistsSecond'] = totals[statSet]?.['goalsSecond']
                    playerStats[statSet]['assistsThird'] = totals[statSet]?.['goalsThird']
                    playerStats[statSet]['assistsOT'] = totals[statSet]?.['goalsOT']
                    playerStats[statSet]['primaryAssistsFirst'] = totals[statSet]?.['primaryAssistsFirst']
                    playerStats[statSet]['primaryAssistsSecond'] = totals[statSet]?.['primaryAssistsSecond']
                    playerStats[statSet]['primaryAssistsThird'] = totals[statSet]?.['primaryAssistsThird']
                    playerStats[statSet]['primaryAssistsOT'] = totals[statSet]?.['primaryAssistsOT']
                    playerStats[statSet]['secondaryAssistsFirst'] = totals[statSet]?.['secondaryAssistsFirst']
                    playerStats[statSet]['secondaryAssistsSecond'] = totals[statSet]?.['secondaryAssistsSecond']
                    playerStats[statSet]['secondaryAssistsThird'] = totals[statSet]?.['secondaryAssistsThird']
                    playerStats[statSet]['secondaryAssistsOT'] = totals[statSet]?.['secondaryAssistsOT']
                }
            })    
        return {
            id:player[0],
            positions:positions,
            teamId:player[1],
            franchiseId:player[2],
            firstName:player[3],
            lastName:player[4],
            fullName:`${player[3]} ${player[4]}`,
            nickName:player[5],
            height:player[6],
            weight:player[7],
            dob:player[8],
            birthCity:player[9],
            birthState:player[10],
            nationality:player[11],
            nationality2:player[12],
            nationality3:player[13],
            retired:player[14],
            stats:playerStats,
            boxscores:playerBoxscores,
            ratings:playerRatings,
            vs:statsVsTeams
        }
    }
    const getTeamIdFromPlayerId = (id) => (
        data?.player_master?.find(player=>player[0] === id)?.[1]
    )
    const getPlayerById = (id) => {
        const player = data?.player_master?.find(player=>player[0] === id)
        return(
            player
            ?
            getPlayer(player)
            :
            {}
        )
    }
    const getTeamIdFromAbbr = (abbr) => (
        data.team_data?.find(team=>team[4]===abbr)?.[0]
    )
    const getPlayerColumns = (width) => (
        playerColumns(width)
    )
    const getPlayerStatsOffenseColumns = (width) => (
        playerStatsOffenseColumns(width)
    )
    const getPlayerStatsDefenseColumns = (width) => (
        playerStatsDefenseColumns(width)
    )
    const getPlayerStatsOtherColumns = (width) => (
        playerStatsOtherColumns(width)
    )
    const getPlayerVsTeamRows = (stats, statSet) => (
        playerVsTeamRows(stats, statSet)
    )
    const getPlayerVsTeamColumns = (stats, statSet) => (
        playerVsTeamColumns(stats, statSet)
    )
    const getGoalieVsTeamColumns = (stats, statSet) => (
        goalieVsTeamColumns(stats, statSet)
    )
    const getGoalieStatsColumns = (width) => (
        goalieStatsColumns(width)
    )
    const getPlayerCareerColumns = (width, chart) => (
        playerCareerColumns(width, chart)
    )
    const getGoalieCareerColumns = (width) => (
        goalieCareerColumns(width)
    )
    const getPlayerGamesColumns = (width, chart) => (
        playerGamesColumns(width, chart)
    )
    const getGoalieGamesColumns = (width) => (
        goalieGamesColumns(width)
    )
    const getPlayerRows = (id, firstName) => (
        playerRows(id, firstName)
    )
    const totalPlayerGameColumns = (rows, fields) =>{
        const totals = {ps:{}, rs:{}, po:{}}
        fields?.forEach(field=>{
            totals.ps[field] = 0
            totals.rs[field] = 0
            totals.po[field] = 0
        })
        rows?.forEach(row=>{
            if(row.league !== selectedLeague)return
            fields?.forEach(field=>{
                
                if((row[field]) && (row.type === "Pre-Season")){totals.ps[field] += row[field]}
                if((row[field]) && (row.type === "Regular Season")){totals.rs[field] += row[field]}
                if((row[field]) && (row.type === "Playoffs")){totals.po[field] += row[field]}
            })
        })
        return totals
    }
    const getPlayerCareerRows = (player) => (
        playerCareerRows(player)
    )
    const getPlayerGamesRows = (games) => (
        PlayerGamesRows(games)
    )
    const getTeamStatsColumns = (width) => (
        teamStatsColumns(width)
    )
    const getTeamStatsRows = (teams, leagueId) => (
        teamStatsRows(teams, leagueId)
    )
    const getTeamStatsOffenseColumns = (width) => (
        teamStatsOffenseColumns(width)
    )
    const getTeamStatsOffenseRows = (teams) => (
        teamStatsOffenseRows(teams)
    )
    const getTeamStatsDefenseColumns = (teams) => (
        teamStatsDefenseColumns(teams)
    )
    const getTeamStatsAfterPeriodColumns = (teams) => (
        teamStatsAfterPeriodColumns(teams)
    )
    const getConferences = (id) => (
        data?.conferences?.filter(conference=>(
            conference[0] === id
        ))
        .map(conference=>(
                    {
                        id:conference[1],
                        name:conference[2]
                    }
                )
        )
    )
    const getConferenceTeams = (conferences) => {
        const teams = []
        conferences?.divisions?.forEach(division=>{
            division?.teams?.forEach(team=>teams.push(team))
        })
        return teams
    }
    const getLeagueTeams = (league) => {
        const teams = []
        league?.conferences?.forEach(conference=>{
            getConferenceTeams(conference)?.forEach(team=>teams.push(team))
        })
        return teams
    }
    const getConferencesView = (conferences) => (
        conferences.map((conference)=>{
            const conferenceCopy = Object.assign({}, conference)
            const tempTeams = []
            for(let division of conferenceCopy.divisions){
                for(let team of division.teams){
                    tempTeams.push(team)
                }
            }
            const tempDivision = {...conferenceCopy.divisions[0]}
            tempDivision.name = ""
            tempDivision.teams = tempTeams
                .sort(function compareFn(teamA, teamB){ 
                    return (parseFloat(teamB.stats[teamSortBy]) - parseFloat(teamA.stats[teamSortBy]))
                })
            conferenceCopy.divisions = [tempDivision]
            return conferenceCopy
        })
    )
    const getLeagueView = (conferences) => {
        const conferencesCopy = [...conferences]
        const tempTeams = []
        for(let conference of conferencesCopy){
            for(let division of conference.divisions){
                for(let team of division.teams){
                    tempTeams.push(team)
                }
            }
        }
        const tempConference = {...conferencesCopy[0]}
        tempConference.name = ""
        tempConference.divisions = [{...tempConference.divisions[0]}]
        tempConference.divisions[0].name=""
        tempConference.divisions[0].teams = tempTeams
            .sort(function compareFn(teamA, teamB){ 
                return (parseFloat(teamB.stats[teamSortBy]) - parseFloat(teamA.stats[teamSortBy]))
            })
        return [tempConference]
    }
    const getDivisions = (id) => (
        data?.divisions?.filter(division=>division[0] === id)
        .map(division=>(
            {
                id:division[2],
                conferenceId:division[1],
                name:division[3]
            }
        ))
    )
    const getTeamAbbr = (id) => (
        data?.team_data?.filter(team=>team[0] === id)?.[0]?.[4]
    )
    const getTeamFullNameFromAbbr = (abbr) => {
        const team =  data?.team_data?.find(team=>team[4] === abbr)
        return `${team?.[2]} ${team?.[3]}`
    }
    const getTeamFromDataCache = (id, leagueId) => {
        const league = leagueDataCache?.[leagueId]
        const data =
        league?.teams
        ?
        league?.teams?.find(team=>(team?.id === id))
        :
        league?.divisions
        ?
        league?.divisions?.filter(division=>(
            division?.teams?.find(team=>team?.id === id)
        ))?.[0]?.teams?.find(team=>team.id===id)
        :
        league?.conferences?.map(conference=>
            conference?.divisions?.filter(division=>
                division?.teams?.find(team=>team?.id === id)
            )?.[0]?.teams.find(team=>team.id===id)
        )?.find(team=>team)
        ||
        league?.conferences?.filter(conference=>
                conference?.teams?.find(team=>team?.id === id))?.[0]?.teams?.find(team=>team?.id===id)
        return data

    }
    const getTeam = (id, addPlayers) => {
        const teamData = getTeamData(id)
        const teamStats = getTeamStats(id, 'regular')
        const teamRecords = getTeamRecords(id)
        const boxscores = getBoxScoresForTeam(id)
        const { afterFirst, afterSecond, scoredFirst } = getBoxscoreAfterPeriodStats(boxscores, id)
        const players = addPlayers ? getPlayersForTeam(id) : []
        return(
            {
                id:teamData?.[0],
                league:teamData?.[1],
                name:teamData?.[2],
                nickname:teamData?.[3],
                fullName:`${teamData?.[2]} ${teamData?.[3]}`,
                abbr:teamData?.[4],
                parent:teamData?.[5],
                parents:[teamData?.[5],teamData?.[6],teamData?.[7],teamData?.[8],teamData?.[9],teamData?.[10],teamData?.[11],teamData?.[12]],
                colors:{
                    primary:teamData?.[13],
                    secondary:teamData?.[14],
                    text:teamData?.[15]
                },
                conferenceId:teamData?.[16],
                divisionId:teamData?.[17],
                stats:{
                    games:parseInt(teamStats?.[1]),
                    wins:parseInt(teamRecords?.[4]),
                    losses:parseInt(teamRecords?.[5]),
                    ties:parseInt(teamRecords?.[6]),
                    overtimeLosses:parseInt(teamRecords?.[7]),
                    shootoutWins:parseInt(teamRecords?.[8]),
                    shootoutLosses:parseInt(teamRecords?.[9]),
                    points:parseInt(teamRecords?.[10]),
                    percentage:teamRecords?.[13],
                    goals:parseInt(teamStats?.[2]),
                    goalsPerGame:(parseInt(teamStats?.[2]) / parseInt(teamStats?.[1])).toFixed(2),
                    goalsAllowed:parseInt(teamStats?.[3]),
                    goalsAllowedPerGame:(parseInt(teamStats?.[3]) / parseInt(teamStats?.[1])).toFixed(2),
                    goalsForVsGoalsAgainst:((parseInt(teamStats?.[2]) / parseInt(teamStats?.[1])) - (parseInt(teamStats?.[3]) / parseInt(teamStats?.[1]))).toFixed(2),
                    shots:parseInt(teamStats?.[4]),
                    shotsPerGame:(parseInt(teamStats?.[4]) / parseInt(teamStats?.[1])).toFixed(2),
                    shotsAllowed:parseInt(teamStats?.[5]),
                    shotsAllowedPerGame:(parseInt(teamStats?.[4]) / parseInt(teamStats?.[1])).toFixed(2),
                    faceoffs:parseFloat(teamStats?.[6])?.toFixed(1),
                    shotsBlocked:parseInt(teamStats?.[7]),
                    shotsBlockedPerGame:(parseInt(teamStats?.[7]) / parseInt(teamStats?.[1])).toFixed(2),
                    hits:parseInt(teamStats?.[8]),
                    hitsPerGame:(parseInt(teamStats?.[8]) / parseInt(teamStats?.[1])).toFixed(2),
                    takeaways:parseInt(teamStats?.[9]),
                    takeawaysPerGame:(parseInt(teamStats?.[9]) / parseInt(teamStats?.[1])).toFixed(2),
                    giveaways:parseInt(teamStats?.[10]),
                    giveawaysPerGame:(parseInt(teamStats?.[10]) / parseInt(teamStats?.[1])).toFixed(2),
                    injuries:parseInt(teamStats?.[11]),
                    penaltiesPerGame:parseFloat(teamStats?.[12]).toFixed(2),
                    powerplays:parseInt(teamStats?.[13]),
                    powerplaysPerGame:(parseInt(teamStats?.[13]) / parseInt(teamStats?.[1])).toFixed(2),
                    powerplayGoals:parseInt(teamStats?.[14]),
                    powerplayGoalsPerGame:(parseInt(teamStats?.[14]) / parseInt(teamStats?.[1])).toFixed(2),
                    powerplayPercent:parseInt(teamStats?.[13]) ? ((parseInt(teamStats?.[14]) / parseInt(teamStats?.[13])) * 100).toFixed(2) : 0,
                    penaltyKills:parseInt(teamStats?.[16]),
                    penaltyKillsGoalsAgainst:parseInt(teamStats?.[17]),
                    penaltyKillPercent:parseInt(teamStats?.[16]) ? ((parseInt(teamStats?.[17]) / parseInt(teamStats?.[16]))*100).toFixed(1) : 0,
                    shootingPercentage:parseInt(teamStats?.[4]) ? ((parseInt(teamStats?.[2]) / teamStats?.[4])*100).toFixed(2) : 0,
                    shootingPercentageAgainst:parseInt(teamStats?.[5]) ? ((parseInt(teamStats?.[3]) / teamStats?.[5])*100).toFixed(1) : 0,
                    shorthandedGoals:parseInt(teamStats?.[18]),
                    shortHandedGoalsPerGame:(parseInt(teamStats?.[18]) / parseInt(teamStats?.[1])).toFixed(2),
                    shorthandedGoalsAllowed:parseInt(teamStats?.[15]),
                    scoredFirstW:scoredFirst.W,
                    scoredFirstL:scoredFirst.L,
                    scoredFirstT:scoredFirst.T,
                    scoredFirstTotal:scoredFirst?.W + scoredFirst?.L + scoredFirst?.T,
                    upOneFirstW:afterFirst.upOne.W,
                    upOneFirstL:afterFirst.upOne.L,
                    upOneFirstT:afterFirst.upOne.T,
                    upTwoFirstW:afterFirst.upTwo.W,
                    upTwoFirstL:afterFirst.upTwo.L,
                    upTwoFirstT:afterFirst.upTwo.T,
                    upThreeFirstW:afterFirst.upThree.W,
                    upThreeFirstL:afterFirst.upThree.L,
                    upThreeFirstT:afterFirst.upThree.T,
                    upFourPlusFirstW:afterFirst.upFourPlus.W,
                    upFourPlusFirstL:afterFirst.upFourPlus.L,
                    upFourPlusFirstT:afterFirst.upFourPlus.T,
                    upOneSecondW:afterSecond.upOne.W,
                    upOneSecondL:afterSecond.upOne.L,
                    upOneSecondT:afterSecond.upOne.T,
                    upTwoSecondW:afterSecond.upTwo.W,
                    upTwoSecondL:afterSecond.upTwo.L,
                    upTwoSecondT:afterSecond.upTwo.T,
                    upThreeSecondW:afterSecond.upThree.W,
                    upThreeSecondL:afterSecond.upThree.L,
                    upThreeSecondT:afterSecond.upThree.T,
                    upFourPlusSecondW:afterSecond.upFourPlus.W,
                    upFourPlusSecondL:afterSecond.upFourPlus.L,
                    upFourPlusSecondT:afterSecond.upFourPlus.T,
                    tiedFirstW:afterFirst.tied.W,
                    tiedFirstL:afterFirst.tied.L,
                    tiedFirstT:afterFirst.tied.T,
                    downOneFirstW:afterFirst.downOne.W,
                    downOneFirstL:afterFirst.downOne.L,
                    downOneFirstT:afterFirst.downOne.T,
                    downTwoFirstW:afterFirst.downTwo.W,
                    downTwoFirstL:afterFirst.downTwo.L,
                    downTwoFirstT:afterFirst.downTwo.T,
                    downThreeFirstW:afterFirst.downThree.W,
                    downThreeFirstL:afterFirst.downThree.L,
                    downThreeFirstT:afterFirst.downThree.T,
                    downFourPlusFirstW:afterFirst.downThree.W,
                    downFourPlusFirstL:afterFirst.downFourPlus.L,
                    downFourPlusFirstT:afterFirst.downFourPlus.T,
                    downOneSecondW:afterSecond.downOne.W,
                    downOneSecondL:afterSecond.downOne.L,
                    downOneSecondT:afterSecond.downOne.T,
                    downTwoSecondW:afterSecond.downTwo.W,
                    downTwoSecondL:afterSecond.downTwo.L,
                    downTwoSecondT:afterSecond.downTwo.T,
                    downThreeSecondW:afterSecond.downThree.W,
                    downThreeSecondL:afterSecond.downThree.L,
                    downThreeSecondT:afterSecond.downThree.T,
                    downFourPlusSecondW:afterSecond.downFourPlus.W,
                    downFourPlusSecondL:afterSecond.downFourPlus.L,
                    downFourPlusSecondT:afterSecond.downFourPlus.T,
                },
                players:players
            }
        )
    }
    const getPlayersForTeam = (teamId) => {
        return data?.player_master?.filter(player=>{return(player[1] === teamId)}).map(player=>getPlayer(player))
    }
    const convertLeagueDataToChartData = (league) => {
        const data =
        league.teams
        ?
        {
            conferences:[{
                divisions:[{
                    teams:league.teams
                }]
            }]
        }
        :
        league.divisions
        ?
        {
            conferences:[{
                divisions:league.divisions
            }]
        }
        :
        {conferences:league.conferences}

        const chartData = []
        for(let conference of data.conferences){
            for(let division of conference.divisions){
                for(let team of division.teams){
                    chartData.push({name:team.name, abbr:team.abbr, nickname:team.nickname, ...team.stats})
                }
            }
        }
        return chartData
    }
    const getBoxscoreSummaryByGameId = (id) => (
        data?.boxscore_summary?.find(boxscore=>boxscore[0] === id)
    )
    const getBoxscorePeriodsByGameId = (id) => (
        data?.boxscore_period_scoring_summary?.filter(boxscore=>boxscore[0] === id)
    )
    const getPlayerPointsPerPeriod = (gameId, playerId) => {
        const goals = [0,0,0,0]
        const primaryAssists = [0,0,0,0]
        const secondaryAssists = [0,0,0,0]
        const data = getBoxscorePeriodsByGameId(gameId)
        data?.forEach(goal=>{
            const period = parseInt(goal[1]) ? parseInt(goal[1]) - 1 : 3
            if(goal[3] === playerId){goals[period]++}
            if(goal[4] === playerId){primaryAssists[period]++}
            if(goal[5] === playerId){secondaryAssists[period]++}
        })
        return {goals:goals, primaryAssists:primaryAssists, secondaryAssists:secondaryAssists}
    }
    const getPlayerPositions = (ratings) => {
        if(!ratings)return ''
        const positionsString = 
        [
            { position:'G', proficiency:ratings?.g },
            { position:'RD', proficiency:ratings?.rd },
            { position:'LD', proficiency:ratings?.ld },
            { position:'RW', proficiency:ratings?.rw },
            { position:'C', proficiency:ratings?.c },
            { position:'LW', proficiency:ratings?.lw }
        ]?.filter(position=>parseInt(position?.proficiency) > 14)
        .sort((a,b)=>b.proficiency - a.proficiency)
        .map(position=>position.position).toString()
        return positionsString || ''
    }

    const getPlayerRatings = (id) => {
        const playerRatings = data?.player_ratings?.find(player=>player[0] === id)
        if(!playerRatings)return {}
        return{
            g:playerRatings?.[1],
            ld:playerRatings?.[2],
            rd:playerRatings?.[3],
            lw:playerRatings?.[4],
            c:playerRatings?.[5],
            rw:playerRatings?.[6],
            aggressions:playerRatings?.[7],
            bravery:playerRatings?.[8],
            determination:playerRatings?.[9],
            teamplayer:playerRatings?.[10],
            leadership:playerRatings?.[11],
            temperament:playerRatings?.[12],
            professionalism:playerRatings?.[13],
            mentalToughness:playerRatings?.[14],
            goalieStamina:playerRatings?.[15],
            acceleration:playerRatings?.[16],
            agility:playerRatings?.[17],
            balance:playerRatings?.[18],
            speed:playerRatings?.[19],
            stamina:playerRatings?.[20],
            stength:playerRatings?.[21],
            fighting:playerRatings?.[22],
            screening:playerRatings?.[23],
            gettingOpen:playerRatings?.[24],
            passing:playerRatings?.[25],
            puckHandling:playerRatings?.[26],
            shootingAccuracy:playerRatings?.[27],
            shootingRange:playerRatings?.[28],
            offensiveRead:playerRatings?.[29],
            checking:playerRatings?.[30],
            faceoffs:playerRatings?.[31],
            hitting:playerRatings?.[32],
            positioning:playerRatings?.[33],
            shotBlocking:playerRatings?.[34],
            stickChecking:playerRatings?.[35],
            defensiveRead:playerRatings?.[36],
            gPositioning:playerRatings?.[37],
            gPassing:playerRatings?.[38],
            gPokecheck:playerRatings?.[39],
            blocker:playerRatings?.[40],
            glove:playerRatings?.[41],
            rebound:playerRatings?.[42],
            recovery:playerRatings?.[43],
            gPuckhandling:playerRatings?.[44],
            lowShots:playerRatings?.[45],
            gSkating:playerRatings?.[46],
            reflexes:playerRatings?.[47],
            skating:playerRatings?.[48],
            shooting:playerRatings?.[49],
            playmaking:playerRatings?.[50],
            defending:playerRatings?.[51],
            physicality:playerRatings?.[53],
            conditioning:playerRatings?.[54],
            character:playerRatings?.[55],
            hockeySense:playerRatings?.[56],
            goalieTechnique:playerRatings?.[57],
            goaliePositioning:playerRatings?.[58]
        }
    }
    const getBoxScoresForTeam = (id) => {
        const boxscores = data?.boxscore_summary
        ?.filter(game=>(
            game[6] === id || game[7] === id
        )).map(game=>(
            {...game, 
                summary:
                data
                ?.boxscore_period_scoring_summary
                ?.filter(goal=>goal[0] === game[0])
                ?.map(goal=>(
                    {
                        id:goal[0],
                        period:(goal[1].substr(0,2) === 'OT' ? parseInt(goal[1].substring(2,3)) + 3 : parseInt(goal[1])),
                        time:parseInt(goal[2]),
                        scorer:goal[3],
                        primaryAssist:goal[4],
                        secondaryAssist:goal[5],
                        team:goal[6],
                        note:goal[7]
                    }
                ))
                ?.sort((goal1, goal2)=>goal1.period - goal2.period || goal1.time - goal2.time )      
            }
        ))
        ?.map(game=>{
            const isHome = game[6] === id
            const outcome = 
                ((isHome && (parseInt(game[8]) > parseInt(game[9])))
                ||
                (!isHome && (parseInt(game[9]) > parseInt(game[8]))))
                ? 
                "W"
                :
                (parseInt(game[8]) === parseInt(game[9]))
                ?
                "T"
                :
                "L"
            const goalsFor = isHome ? parseInt(game[8]) : parseInt(game[9])
            const goalsAgainst = isHome ? parseInt(game[9]) : parseInt(game[8])
            return(
                {
                    gameType:game[47],
                    date:new Date(`${game[1]},${game[2]},${game[3]}`).toDateString().substr(4,),
                    goalsFor: goalsFor,
                    goalsAgainst: goalsAgainst,
                    teamHome:getTeamAbbr(game[6]),
                    teamAway:getTeamAbbr(game[7]),
                    scoreHome:parseInt(game[8]),
                    scoreAway:parseInt(game[9]),
                    isHome:isHome,
                    outcome:outcome,
                    team:parseInt(game[6]),
                    ...getStatusesAfterPeriods(game.summary, id, isHome ? game[7] : game[6], goalsFor, goalsAgainst)
                }
            )
    })
        return boxscores || []
    }
    const getBoxscoreAfterPeriodStats = (boxscores, teamId) => {
        const wlt = {W:0, L:0, T:0}
        const stats = 
        {
            afterFirst:{
                tied:{...wlt},
                upOne:{...wlt},
                upTwo:{...wlt},
                upThree:{...wlt},
                upFourPlus:{...wlt},
                downOne:{...wlt},
                downTwo:{...wlt},
                downThree:{...wlt},
                downFourPlus:{...wlt},
            },
            afterSecond:{
                tied:{...wlt},
                upOne:{...wlt},
                upTwo:{...wlt},
                upThree:{...wlt},
                upFourPlus:{...wlt},
                downOne:{...wlt},
                downTwo:{...wlt},
                downThree:{...wlt},
                downFourPlus:{...wlt},
            },
            scoredFirst:{...wlt}
        }
        boxscores
        .filter(boxscore=>boxscore.gameType === 'Regular Season')
        .forEach(boxscore=>{
            stats.afterFirst[boxscore.afterFirst][boxscore.outcome]++
            stats.afterSecond[boxscore.afterSecond][boxscore.outcome]++
            boxscore.scoredFirst && stats.scoredFirst[boxscore.outcome]++
        })
        return stats
}
    const getStatusesAfterPeriods = (summary, id, awayId, gF, gA) => {
        const scoresAfterPeriod = {1:{gf:0, ga:0}, 2:{gf:0, ga:0}, 3:{gf:0, ga:0}, scoredFirst:false }
            const statusMap = [
            {
                difference:0,
                status:'tied'
            },
            {
                difference:1,
                status:'upOne'
            },
            {
                difference:2,
                status:'upTwo'
            },
            {
                difference:3,
                status:'upThree'
            },
            {
                difference:-1,
                status:'downOne'
            },
            {
                difference:-2,
                status:'downTwo'
            },
            {
                difference:-3,
                status:'downThree'
            },
        ]
        summary.filter(goal=>parseInt(goal?.period) < 4)?.forEach((goal,key)=>{
            if(goal.team !== id && goal.team !== awayId){
                const scoreTeamID = getTeamIdFromPlayerId(goal.scorer)
                const pAssistTeamID = getTeamIdFromPlayerId(goal.primaryAssist)
                const sAssistTeamID = getTeamIdFromPlayerId(goal.secondaryAssist)
                if(scoreTeamID === id || pAssistTeamID === id || sAssistTeamID === id){
                    goal.team = id
                }
                if(scoreTeamID === awayId || pAssistTeamID === awayId || sAssistTeamID === awayId){
                    goal.team = awayId
                }
            }
            if(goal.team === id)
            {
                if(key===0)scoresAfterPeriod.scoredFirst = true
                for(let period = goal.period; period < 4; period++){
                    scoresAfterPeriod[period].gf++
                }
            }
            else
            if(goal.team === awayId)
            { 
                for(let period = goal.period; period < 4; period++){
                    scoresAfterPeriod[period].ga++
                }
            }
            else{
                scoresAfterPeriod['lost'] = goal
            }
        })
        if(scoresAfterPeriod.lost){
            const isGF = (parseInt(gF) - parseInt(scoresAfterPeriod[3].gf)) === 1
            if(isGF){
                for(let period = scoresAfterPeriod.lost.period; period < 4; period++){
                    scoresAfterPeriod[period].gf++
                }
            }
            else{
                for(let period = scoresAfterPeriod.lost.period; period < 4; period++){
                    scoresAfterPeriod[period].ga++
                }
            }
        }
        const afterFirst = 
        (scoresAfterPeriod[1].gf - scoresAfterPeriod[1].ga) > 3
        ?
        'upFourPlus'
        :
        (scoresAfterPeriod[1].ga - scoresAfterPeriod[1].gf) > 3
        ?
        'downFourPlus'
        :
        statusMap.find(status=>status.difference === (scoresAfterPeriod[1].gf - scoresAfterPeriod[1].ga))?.status
        const afterSecond = 
        (scoresAfterPeriod[2].gf - scoresAfterPeriod[2].ga) > 3
        ?
        'upFourPlus'
        :
        (scoresAfterPeriod[2].ga - scoresAfterPeriod[2].gf) > 3
        ?
        'downFourPlus'
        :
        statusMap.find(status=>status.difference === (scoresAfterPeriod[2].gf - scoresAfterPeriod[2].ga))?.status
        return {afterFirst:afterFirst, afterSecond:afterSecond, scoredFirst:scoresAfterPeriod.scoredFirst}
    }
    const getBoxscoresForGoalies = (id) => (
        data?.boxscore_goalie_summary?.filter(boxscore=>(
            boxscore[1] === id
        ))
        .map(boxscore=>{
            const boxscoreSummary = getBoxscoreSummaryByGameId(boxscore[0])
            const isHomeTeam = boxscoreSummary[6] === boxscore[2]
            const scoreHome = parseInt(boxscoreSummary[8])
            const scoreAway = parseInt(boxscoreSummary[9])
            const homeOutcome = scoreHome > scoreAway ? 'W' : scoreHome < scoreAway ? 'L' : 'T'
            const awayOutcome = scoreAway > scoreHome ? 'W' : scoreAway < scoreHome ? 'L' : 'T'
            const homeTeam = getTeamAbbr(boxscoreSummary[6])
            const awayTeam = getTeamAbbr(boxscoreSummary[7])
            const vsTeam = isHomeTeam ? awayTeam : homeTeam
            return{
                gameId:boxscore[0],
                gameType:boxscoreSummary[47],
                playerId:boxscore[1],
                league:getLeagueAbbrFromTeamAbbr(getTeamAbbr(boxscoreSummary[7])),
                date:new Date(`${boxscoreSummary[1]},${boxscoreSummary[2]},${boxscoreSummary[3]}`).toDateString().substr(4,),
                teamHome:homeTeam,
                teamAway:awayTeam,
                vs:vsTeam,
                scoreHome:parseInt(boxscoreSummary[8]),
                scoreAway:parseInt(boxscoreSummary[9]),
                outcome:isHomeTeam ? homeOutcome : awayOutcome,
                gameRating:parseInt(boxscore[3]),
                shotsAgainst:parseInt(boxscore[4]),
                goalsAllowed:parseInt(boxscore[5]),
                saves:parseInt(boxscore[6]),
                savePercentage:(parseFloat(boxscore[7]) * 100).toFixed(1),
                goalsAgainstAverage:(parseInt(boxscore[5]) * (Math.floor(parseInt(boxscore[8]) / 60000) / 60)).toFixed(2),
                timeOnIce:Math.floor(parseInt(boxscore[8]) / 60000),
                penaltyMinutes:boxscore[9]
            }
        })
    )
    const getBoxScoresForPlayer = (id, tradeArray) => {
        const bSData = data?.boxscore_skater_summary?.filter(boxscore=>(
            boxscore[1] === id
        ))
        return(
            bSData
            .map(boxscore=>{
                const boxscoreSummary = getBoxscoreSummaryByGameId(boxscore[0])
                const goalsPeriods = getPlayerPointsPerPeriod(boxscore[0], boxscore[1])
                const teamNotFound = boxscoreSummary[6] !== boxscore[2] && boxscoreSummary[7] !== boxscore[2]
                const isHomeTeam = !teamNotFound ? boxscoreSummary[6] === boxscore[2] : undefined
                const scoreHome = parseInt(boxscoreSummary[8])
                const scoreAway = parseInt(boxscoreSummary[9])
                const homeOutcome = scoreHome > scoreAway ? 'W' : scoreHome < scoreAway ? 'L' : 'T'
                const awayOutcome = scoreAway > scoreHome ? 'W' : scoreAway < scoreHome ? 'L' : 'T'
                const homeAbbr = getTeamAbbr(boxscoreSummary[6])
                const awayAbbr = getTeamAbbr(boxscoreSummary[7])
                const vsAbbr = isHomeTeam !== undefined ? isHomeTeam ? awayAbbr : homeAbbr : undefined
                const leagueAbbr = getLeagueAbbrFromTeamId(boxscoreSummary[6])
                return{
                    gameId:boxscore[0],
                    gameType:boxscoreSummary[47],
                    playerId:boxscore[1],
                    teamId:boxscore[2],
                    league:leagueAbbr,
                    date:new Date(`${boxscoreSummary[1]},${boxscoreSummary[2]},${boxscoreSummary[3]}`).toDateString().substr(4,),
                    teamHome:homeAbbr,
                    teamAway:awayAbbr,
                    vs:vsAbbr,
                    isHomeTeam:isHomeTeam,
                    scoreHome:parseInt(boxscoreSummary[8]),
                    scoreAway:parseInt(boxscoreSummary[9]),
                    outcome:isHomeTeam ? homeOutcome : awayOutcome,
                    gameRating:parseInt(boxscore[3]),
                    gameRatingOff:parseInt(boxscore[4]),
                    gameRatingDef:parseInt(boxscore[5]),
                    goals:parseInt(boxscore[6]),
                    goalsFirst:goalsPeriods.goals[0],
                    goalsSecond:goalsPeriods.goals[1],
                    goalsThird:goalsPeriods.goals[2],
                    goalsOT:goalsPeriods.goals[3],
                    assists:parseInt(boxscore[7]),
                    primaryAssists:goalsPeriods.primaryAssists[0] + goalsPeriods.primaryAssists[1] + goalsPeriods.primaryAssists[2] + goalsPeriods.primaryAssists[3],
                    primaryAssistsFirst:goalsPeriods.primaryAssists[0],
                    primaryAssistsSecond:goalsPeriods.primaryAssists[1],
                    primaryAssistsThird:goalsPeriods.primaryAssists[2],
                    primaryAssistsOT:goalsPeriods.primaryAssists[3],
                    secondaryAssists:goalsPeriods.secondaryAssists[0] + goalsPeriods.secondaryAssists[1] + goalsPeriods.secondaryAssists[2] + goalsPeriods.secondaryAssists[3],
                    secondaryAssistsFirst:goalsPeriods.secondaryAssists[0],
                    secondaryAssistsSecond:goalsPeriods.secondaryAssists[1],
                    secondaryAssistsThird:goalsPeriods.secondaryAssists[2],
                    secondaryAssistsOT:goalsPeriods.secondaryAssists[3],
                    points:parseInt(boxscore[6]) + parseInt(boxscore[7]),
                    pointsFirst:goalsPeriods.goals[0] + goalsPeriods.primaryAssists[0] + goalsPeriods.secondaryAssists[0],
                    pointsSecond:goalsPeriods.goals[1] + goalsPeriods.primaryAssists[1] + goalsPeriods.secondaryAssists[1],
                    pointsThird:goalsPeriods.goals[2] + goalsPeriods.primaryAssists[2] + goalsPeriods.secondaryAssists[2],
                    pointsOT:goalsPeriods.goals[3] + goalsPeriods.primaryAssists[3] + goalsPeriods.secondaryAssists[3],
                    plusMinus:parseInt(boxscore[8]),
                    shots:parseInt(boxscore[9]),
                    missedShots:parseInt(boxscore[10]),
                    blockedShots:parseInt(boxscore[11]),
                    penalties:parseInt(boxscore[12]),
                    hits:parseInt(boxscore[13]),
                    takeaways:parseInt(boxscore[14]),
                    giveaways:parseInt(boxscore[15]),
                    shifts:parseInt(boxscore[16]),
                    timeOnIce:new Date(parseInt(boxscore[17]) * 1000).toISOString().substr(14, 5),
                    timeOnIceSeconds:parseInt(boxscore[17]),
                    powerplayTimeOnIce:new Date(parseInt(boxscore[18]) * 1000).toISOString().substr(14, 5),
                    powerplayTimeOnIceSeconds:parseInt(boxscore[18]),
                    shorthandedTimeOnIce:new Date(parseInt(boxscore[19]) * 1000).toISOString().substr(14, 5),
                    shorthandedTimeOnIceSeconds:parseInt(boxscore[19]),
                    evenStrengthTimeOnIce:new Date(parseInt(boxscore[20]) * 1000).toISOString().substr(14, 5),
                    evenStrengthTimeOnIceSeconds:parseInt(boxscore[20]),
                    faceoffWins:parseInt(boxscore[21]),
                    faceoffLosses:parseInt(boxscore[22]),
                    faceoffPercent:parseFloat(boxscore[23]).toFixed(1),
                }
            })
    )}
    return (
        <DataManagerContext.Provider 
            value={
                {
                    data:data,
                    setData:setData, 
                    getTeamData:getTeamData, 
                    getTeamStats:getTeamStats,
                    getTeamRecords:getTeamRecords,
                    getTeam:getTeam,
                    getTeamsForLeague:getTeamsForLeague,
                    getConferences:getConferences,
                    getDivisions:getDivisions,
                    getLeague:getLeague,
                    setTeamSortBy:setTeamSortBy,
                    teamSortBy:teamSortBy,
                    getConferencesView:getConferencesView,
                    getLeagueView:getLeagueView,
                    convertLeagueDataToChartData:convertLeagueDataToChartData,
                    getConferenceTeams:getConferenceTeams,
                    getLeagueTeams:getLeagueTeams,
                    getPlayerById:getPlayerById,
                    getPlayerColumns:getPlayerColumns,
                    getPlayerStatsOffenseColumns:getPlayerStatsOffenseColumns,
                    getPlayerStatsDefenseColumns:getPlayerStatsDefenseColumns,
                    getPlayerStatsOtherColumns:getPlayerStatsOtherColumns,
                    getPlayerVsTeamRows:getPlayerVsTeamRows,
                    getPlayerVsTeamColumns:getPlayerVsTeamColumns,
                    getGoalieVsTeamColumns:getGoalieVsTeamColumns,
                    getGoalieStatsColumns:getGoalieStatsColumns,
                    getPlayerRows:getPlayerRows,
                    getPlayerCareerColumns:getPlayerCareerColumns,
                    getGoalieCareerColumns:getGoalieCareerColumns,
                    getPlayerCareerRows:getPlayerCareerRows,
                    getTeamAbbr:getTeamAbbr,
                    getBoxScoresForPlayer:getBoxScoresForPlayer,
                    getPlayerGamesColumns:getPlayerGamesColumns,
                    getGoalieGamesColumns:getGoalieGamesColumns,
                    getPlayerGamesRows:getPlayerGamesRows,
                    totalPlayerGameColumns:totalPlayerGameColumns,
                    getLeagueAbbrFromTeamAbbr:getLeagueAbbrFromTeamAbbr,
                    leagueDataCache:leagueDataCache,
                    setLeagueDataCache:setLeagueDataCache,
                    getTeamFromDataCache:getTeamFromDataCache,
                    getTeamStatsRows:getTeamStatsRows,
                    getTeamStatsColumns:getTeamStatsColumns,
                    getTeamStatsOffenseColumns:getTeamStatsOffenseColumns,
                    getTeamStatsOffenseRows:getTeamStatsOffenseRows,
                    getTeamStatsDefenseColumns:getTeamStatsDefenseColumns,
                    getTeamStatsAfterPeriodColumns:getTeamStatsAfterPeriodColumns,
                    getTeamFullNameFromAbbr:getTeamFullNameFromAbbr,
                    getPlayersForTeam:getPlayersForTeam,
                    getLeagueAbbrFromId:getLeagueAbbrFromId,
                    handleFileUpload:handleFileUpload,
                    getTeamIdFromAbbr:getTeamIdFromAbbr
                }
            }
            >
            {children}
        </DataManagerContext.Provider>
    )
}

export default DataManager
