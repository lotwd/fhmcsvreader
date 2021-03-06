import React from 'react'
import { Link } from 'gatsby'

export const playerStatsDefenseColumns = (width) => {
    const columnWidth = width ? width : '120'
    const columns = [
        {
            field:'fullName',
            headerName:'Name',
            width:'200',
            renderCell:(params, GridRenderCellParams)=>(
                <Link
                    to="/player"
                    state={{id:params.row.id, teamId:params.row.teamId}}
                >
                    {params.value}
                </Link>
            )
        },
        {
            field:'positions',
            headerName:'POS',
            width:columnWidth
        },
        {
            field:'games',
            headerName:'GP',
            width:columnWidth,
        },
        {
            field:'penalties',
            headerName:'PLM',
            width:columnWidth,
        },
        {
            field:'penaltyMinutesPerGame',
            headerName:'PLM/GP',
            width:columnWidth
        },
        {
            field:'hits',
            headerName:'H',
            width:columnWidth,
        },
        {
            field:'hitsPerGame',
            headerName:'H/GP',
            width:columnWidth
        },
        {
            field:'takeaways',
            headerName:'TkA',
            width:columnWidth,
        },
        {
            field:'takeawaysPerGame',
            headerName:'TkA/GP',
            width:columnWidth,
        },
        {
            field:'giveaways',
            headerName:'GvA',
            width:columnWidth,
        },
        {
            field:'giveawaysPerGame',
            headerName:'GvA/GP',
            width:columnWidth,
        },
        {
            field:'shotsBlocked',
            headerName:'SB',
            width:columnWidth,
        },
        {
            field:'shotsBlockedPerGame',
            headerName:'SB/GP',
            width:columnWidth,
        },
        {
            field:'fights',
            headerName:'FTS',
            width:columnWidth,
        },
        {
            field:'fightsWon',
            headerName:'FTSW',
            width:columnWidth,
        },
        {
            field:'fightWinPercent',
            headerName:'FTSW%',
            width:columnWidth,
        },
        {
            field:'goalsAgainst60',
            headerName:'GA/60',
            width:columnWidth
        },
        {
            field:'shotsAgainst60',
            headerName:'SA/60',
            width:columnWidth
        },
        {
            field:'gameRatingDefense',
            headerName:'DR',
            width:columnWidth,
        },
    ]
    return columns
}