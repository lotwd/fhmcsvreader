import React from 'react'
import { Link } from 'gatsby'

export const teamStatsOffenseColumns = (width) => {
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
            field:"goals",
            headerName:"GOALS",
            width:columnWidth
        },
        {
            field:"goalsPerGame",
            headerName:"G/GP",
            width:columnWidth
        },
        {
            field:"shots",
            headerName:"SHOTS",
            width:columnWidth
        },
        {
            field:"shotsPerGame",
            headerName:"S/GP",
            width:columnWidth
        },
        {
            field:"shootingPercentage",
            headerName:"SH%",
            width:columnWidth
        },
        {
            field:"powerplays",
            headerName:"PP",
            width:columnWidth
        },
        {
            field:"powerplaysPerGame",
            headerName:"PP/GP",
            width:columnWidth
        },
        {
            field:"powerplayGoals",
            headerName:"PPG",
            width:columnWidth
        },
        {
            field:"powerplayGoalsPerGame",
            headerName:"PPG/GP",
            width:columnWidth,
        },
        {
            field:"powerplayPercent",
            headerName:"PP%",
            width:columnWidth
        },
        {
            field:"shorthandedGoals",
            headerName:"SHG",
            width:columnWidth
        },
        {
            field:"shortHandedGoalsPerGame",
            headerName:"SHG/GP",
            width:columnWidth
        },
        {
            field:"scoredFirstTotal",
            headerName:"1STGL",
            width:columnWidth
        }      
    ]
    return columns
}