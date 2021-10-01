import React from 'react'
import { Link } from 'gatsby'

export const goalieStatsColumns = (width) => {
    const columnWidth = width ? width : '120'
    const columns = [
        {
            field:'fullName',
            headerName:'Name',
            width:'200',
            renderCell:(params, GridRenderCellParams)=>(
                <Link
                    to="/player"
                    state={{id:params.row.id, teamId:params.row.teamId, goalie:true}}
                >
                    {params.value}
                </Link>
            )
        },
        {
            field:'games',
            headerName:'GP',
            width:columnWidth,
        },
        {
            field:'minutes',
            headerName:'MIN',
            width:columnWidth
        },
        {
            field:'minutesPerGame',
            headerName:'MIN/GP'
        },
        {
            field:'wins',
            headerName:'W',
            width:columnWidth
        },
        {
            field:'losses',
            headerName:'L',
            width:columnWidth
        },
        {
            field:'ot',
            headerName:'OT',
            width:columnWidth
        },
        {
            field:'shotsAgainst',
            headerName:'SA',
            width:columnWidth
        },
        {
            field:'shotsAgainstPerGame',
            headerName:'SA/GP',
            width:columnWidth
        },
        {
            field:'saves',
            headerName:'SVS',
            width:columnWidth
        },
        {
            field:'savesPerGame',
            headerName:'SVS/GP',
            width:columnWidth
        },
        {
            field:'goalsAgainst',
            headerName:'GA',
            width:columnWidth
        },
        {
            field:'goalsAgainstPerGame',
            headerName:'GA/GP',
            width:columnWidth
        },
        {
            field:'goalsAgainstAverage',
            headerName:'GAA',
            width:columnWidth
        },
        {
            field:'shutouts',
            headerName:'SO',
            width:columnWidth
        },
        {
            field:'savePercentage',
            headerName:'SV%',
            width:columnWidth
        },
        {
            field:'gameRating',
            headerName:'GR',
            width:columnWidth,
        },
    ]
    return columns
}