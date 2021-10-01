export const playerVsTeamRows = (stats, statSet) => {
    const playerStats = Object.keys(stats).map(key=>(
        {team:key, ...stats[key]}
    ))
    const rows = playerStats?.map(sts=>{ 
        return(
        {
            id:sts.team,
            team:sts.team,
            league:sts.league,
            games:sts?.[statSet]?.games,
            goals:sts?.[statSet]?.goals,
            assists:sts?.[statSet]?.assists,
            points:sts?.[statSet]?.points,
            goalsPerGame:parseFloat((sts?.[statSet]?.goals / sts?.[statSet]?.games).toFixed(2)),
            assistsPerGame:parseFloat((sts?.[statSet]?.assists / sts?.[statSet]?.games).toFixed(2)),
            pointsPerGame:parseFloat((sts?.[statSet]?.points / sts?.[statSet]?.games).toFixed(2)),
            goalsFirst:parseInt(sts?.[statSet]?.goalsFirst),
            goalsSecond:parseInt(sts?.[statSet]?.goalsSecond),
            goalsThird:parseInt(sts?.[statSet]?.goalsThird),
            goalsOT:parseInt(sts?.[statSet]?.goalsOT),
            assistsFirst:sts?.[statSet]?.assistsFirst,
            assistsSecond:sts?.[statSet]?.assistsSecond,
            assistsThird:sts?.[statSet]?.assistsThird,
            assistsOT:sts?.[statSet]?.assistsOT,
            shots:sts?.[statSet]?.shots,
            shotsPerGame:parseFloat((sts?.[statSet]?.shots / sts?.[statSet]?.games).toFixed(2)),
            missedShots:sts?.[statSet]?.missedShots,
            shifts:sts?.[statSet]?.shifts,
            shiftsPerGame:parseFloat((sts?.[statSet]?.shifts / sts?.[statSet]?.games).toFixed(2)),
            takeaways:sts?.[statSet]?.takeaways,
            takeawaysPerGame:parseFloat((sts?.[statSet]?.takeaways / sts?.[statSet]?.games).toFixed(2)),
            giveaways:sts?.[statSet]?.giveaways,
            giveawaysPerGame:parseFloat((sts?.[statSet]?.giveaways / sts?.[statSet]?.games).toFixed(2)),
            hits:sts?.[statSet]?.hits,
            hitsPerGame:parseFloat((sts?.[statSet]?.hits / sts?.[statSet]?.games).toFixed(2)),
            plusMinus:sts?.[statSet]?.plusMinus,
            faceoffs:sts?.[statSet]?.faceoffs,
            faceoffWins:sts?.[statSet]?.faceoffWins,
            faceoffLosses:sts?.[statSet]?.faceoffLosses,
            faceoffPercent:parseFloat(((sts?.[statSet]?.faceoffWins / sts?.[statSet]?.faceoffs) * 100).toFixed(2)),
            penalties:sts?.[statSet]?.penalties,
            shotsAgainst:sts?.[statSet]?.shotsAgainst,
            goalsAllowed:sts?.[statSet]?.goalsAllowed,
            timeOnIce:sts?.[statSet]?.timeOnIce,
            W:sts?.[statSet]?.W,
            L:sts?.[statSet]?.L,
            T:sts?.[statSet]?.T,
    })
})
    return rows || []
}

// const test = {
//     gameId:boxscore[0],
// gameType:boxscoreSummary[47],
// playerId:boxscore[1],
// league:getLeagueAbbrFromTeamAbbr(getTeamAbbr(boxscoreSummary[7])),
// date:new Date(`${boxscoreSummary[1]},${boxscoreSummary[2]},${boxscoreSummary[3]}`).toDateString().substr(4,),
// teamHome:homeTeam,
// teamAway:awayTeam,
// vs:vsTeam,
// scoreHome:parseInt(boxscoreSummary[8]),
// scoreAway:parseInt(boxscoreSummary[9]),
// outcome:isHomeTeam ? homeOutcome : awayOutcome,
// gameRating:parseInt(boxscore[3]),
// shotsAgainst:parseInt(boxscore[4]),
// goalsAllowed:parseInt(boxscore[5]),
// saves:parseInt(boxscore[6]),
// savePercentage:(parseFloat(boxscore[7]) * 100).toFixed(1),
// goalsAgainstAverage:(parseInt(boxscore[5]) * (Math.floor(parseInt(boxscore[8]) / 60000) / 60)).toFixed(2),
// timeOnIce:Math.floor(parseInt(boxscore[8]) / 60000),
// penaltyMinutes:boxscore[9]
// }