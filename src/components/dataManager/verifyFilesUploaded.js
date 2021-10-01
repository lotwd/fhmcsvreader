export const verifyFilesUploaded = (files) => {
    const result = {success:false, errors:[]}
    const fileChecker = {
        'boxscore_goalie_summary.csv':false,
        'boxscore_period_penalties_summary.csv':false,
        'boxscore_period_scoring_summary.csv':false,
        'boxscore_skater_summary.csv':false,
        'boxscore_summary.csv':false,
        'conferences.csv':false,
        'divisions.csv':false,
        'league_data.csv':false,
        'player_goalie_career_stats_po.csv':false,
        'player_goalie_career_stats_ps.csv':false,
        'player_goalie_career_stats_rs.csv':false,
        'player_goalie_retired_career_stats_po.csv':false,
        'player_goalie_retired_career_stats_ps.csv':false,
        'player_goalie_retired_career_stats_rs.csv':false,
        'player_goalie_stats_po.csv':false,
        'player_goalie_stats_ps.csv':false,
        'player_goalie_stats_rs.csv':false,
        'player_master.csv':false,
        'player_ratings.csv':false,
        'player_skater_career_stats_po.csv':false,
        'player_skater_career_stats_ps.csv':false,
        'player_skater_career_stats_rs.csv':false,
        'player_skater_retired_career_stats_po.csv':false,
        'player_skater_retired_career_stats_ps.csv':false,
        'player_skater_retired_career_stats_rs.csv':false,
        'player_skater_stats_po.csv':false,
        'player_skater_stats_ps.csv':false,
        'player_skater_stats_rs.csv':false,
        'schedules.csv':false,
        'staff_master.csv':false,
        'staff_ratings.csv':false,
        'team_data.csv':false,
        'team_lines.csv':false,
        'team_records.csv':false,
        'team_stats.csv':false,
        'team_stats_playoffs.csv':false
    }
    for(let file of files){
        if(Object.keys(fileChecker).includes(file.name))fileChecker[file.name] = true
        else{result.errors.push(`${file.name} is not a fhm exported csv file`)}
    }
    Object.keys(fileChecker).filter(fileName=>!fileChecker[fileName]).forEach(fileName=>{
        result.errors.push(`${fileName} was not included`)
    })
    result.success = result.errors.length ? false : true
    return result
}