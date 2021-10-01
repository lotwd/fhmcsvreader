import React from 'react'
import { Link } from 'gatsby'

export const teamStatsDefenseColumns = (width) => {
    const columnWidth = width || '120'
    const columns = [
        {
            field:'fullName',
            headerName:'Team',
            width:'350',
            renderCell:(params, GridRenderCellParams)=>(
                <Link
                    to="/team"
                    state={{id:params.row.id, leagueId:params.row.leagueId}}
                >
                    {params.value}
                </Link>
            )
        },
        {
            field:"games",
            headerName:"GAMES",
            width:columnWidth
        },
        {
            field:"goalsAllowed",
            headerName:"GA",
            width:columnWidth
        },
        {
            field:"goalsAllowedPerGame",
            headerName:"GA/GP",
            width:columnWidth
        },
        {
            field:"goalsForVsGoalsAgainst",
            headerName:"GPG - GAPG",
            width:columnWidth
        },
        {
            field:"shotsAllowed",
            headerName:"SA",
            width:columnWidth
        },
        {
            field:"shotsAllowedPerGame",
            headerName:"SA/GP",
            width:columnWidth        
        },
        {
            field:"shootingPercentageAgainst",
            headerName:"S%A",
            width:columnWidth
        },
        {
            field:"shotsBlocked",
            headerName:"SB",
            width:columnWidth
        },
        {
            field:"shotsBlockedPerGame",
            headerName:"SB/GP",
            width:columnWidth,
        },
        {
            field:"hits",
            headerName:"H",
            width:columnWidth
        },
        {
            field:"hitsPerGame",
            headerName:"H/GP",
            width:columnWidth,
        },
        {
            field:"takeaways",
            headerName:"TkA",
            width:columnWidth
        },
        {
            field:"takeawaysPerGame",
            headerName:"TkA/GP",
            width:columnWidth
        },
        {
            field:"giveaways",
            headerName:"GvA",
            width:columnWidth
        },
        {
            field:"giveawaysPerGame",
            headerName:"GvA/GP",
            width:columnWidth
        },
        {
            field:"faceoffs",
            headerName:"FO%",
            width:columnWidth
        },    
    ]
    return columns
}