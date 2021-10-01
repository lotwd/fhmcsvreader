export const teamStatsOffenseRows = (teams) => {
    console.log("TEAMS", teams)
    const rows = teams.map(team=>(
        {
            id:team?.id,
            name:team?.name,
            nickname:team?.nickname,
            abbr:team?.abbr,
            games:team?.stats?.games,
            wins:team?.stats?.wins,
            losses:team?.stats?.losses,
            ties:team?.stats?.ties,
            overtimeLosses:team?.stats?.overtimeLosses,
            shootoutWins:team?.stats?.shootoutWins,
            shootoutLosses:team?.stats?.shootoutLosses,
            points:team?.stats?.points,
            percentage:team?.stats?.percentage,
            goals:team?.stats?.goals,
            goalsAllowed:team?.stats?.goalsAllowed,
            shots:team?.stats?.shots,
            shotsAllowed:team?.stats?.shotsAllowed,
            faceoffs:team?.stats?.faceoffs + '%',
            shotBlocks:team?.stats?.shotBlocks,
            hits:team?.stats?.hits,
            takeaways:team?.stats?.takeaways,
            giveaways:team?.stats?.giveaways,
            injuries:team?.stats?.injuries,
            penaltiesPerGame:team?.stats?.penaltiesPerGame,
            powerplays:team?.stats?.powerplays,
            powerplayGoals:team?.stats?.powerplayGoals,
            powerplayPercent:team?.stats?.powerplayPercent,
            penaltyKills:team?.stats?.penaltyKills,
            penaltyKillsGoalsAgainst:team?.stats?.penaltyKillsGoalsAgainst,
            penaltyKillPercent:team?.stats?.penaltyKillPercent,
            shootingPercentage:team?.stats?.shootingPercentage,
            shootingPercentageAgainst:team?.stats?.shootingPercentageAgainst,
            shorthandedGoals:team?.stats?.shorthandedGoals,
            shorthandedGoalsAllowed:team?.stats?.shorthandedGoalsAllowed,
            upOneFirstW:team?.stats?.upOneFirstW,
            upOneFirstL:team?.stats?.upOneFirstL,
            upOneFirstT:team?.stats?.upOneFirstT,
            upTwoFirstW:team?.stats?.upTwoFirstW,
            upTwoFirstL:team?.stats?.upTwoFirstL,
            upTwoFirstT:team?.stats?.upTwoFirstT,
            upThreeFirstW:team?.stats?.upThreeFirstW,
            upThreeFirstL:team?.stats?.upThreeFirstL,
            upThreeFirstT:team?.stats?.upThreeFirstT,
            upFourPlusFirstW:team?.stats?.upFourPlusFirstW,
            upFourPlusFirstL:team?.stats?.upFourPlusFirstL,
            upFourPlusFirstT:team?.stats?.upFourPlusFirstT,
            upOneSecondW:team?.stats?.upOneSecondW,
            upOneSecondL:team?.stats?.upOneSecondL,
            upOneSecondT:team?.stats?.upOneSecondT,
            upTwoSecondW:team?.stats?.upTwoSecondW,
            upTwoSecondL:team?.stats?.upTwoSecondL,
            upTwoSecondT:team?.stats?.upTwoSecondT,
            upThreeSecondW:team?.stats?.upThreeSecondW,
            upThreeSecondL:team?.stats?.upThreeSecondL,
            upThreeSecondT:team?.stats?.upThreeSecondT,
            upFourPlusSecondW:team?.stats?.upFourPlusSecondW,
            upFourPlusSecondL:team?.stats?.upFourPlusSecondL,
            upFourPlusSecondT:team?.stats?.upFourPlusSecondT,
            scoredFirstW:team?.stats?.scoredFirstW,
            scoredFirstL:team?.stats?.scoredFirstL,
            scoredFirstT:team?.stats?.scoredFirstT,
            downOneFirstW:team?.stats?.downOneFirstW,
            downOneFirstL:team?.stats?.downOneFirstL,
            downOneFirstT:team?.stats?.downOneFirstT,
            downTwoFirstW:team?.stats?.downTwoFirstW,
            downTwoFirstL:team?.stats?.downTwoFirstL,
            downTwoFirstT:team?.stats?.downTwoFirstT,
            downThreeFirstW:team?.stats?.downThreeFirstW,
            downThreeFirstL:team?.stats?.downThreeFirstL,
            downThreeFirstT:team?.stats?.downThreeFirstT,
            downFourPlusFirstW:team?.stats?.downFourPlusFirstW,
            downFourPlusFirstL:team?.stats?.downFourPlusFirstL,
            downFourPlusFirstT:team?.stats?.downFourPlusFirstT,
            downOneSecondW:team?.stats?.downOneSecondW,
            downOneSecondL:team?.stats?.downOneSecondL,
            downOneSecondT:team?.stats?.downOneSecondT,
            downTwoSecondW:team?.stats?.downTwoSecondW,
            downTwoSecondL:team?.stats?.downTwoSecondL,
            downTwoSecondT:team?.stats?.downTwoSecondT,
            downThreeSecondW:team?.stats?.downThreeSecondW,
            downThreeSecondL:team?.stats?.downThreeSecondL,
            downThreeSecondT:team?.stats?.downThreeSecondT,
            downFourPlusSecondW:team?.stats?.downFourPlusSecondW,
            downFourPlusSecondL:team?.stats?.downFourPlusSecondL,
            downFourPlusSecondT:team?.stats?.downFourPlusSecondT,
        }
    ))
    return rows || []
}