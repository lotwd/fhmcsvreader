export const goalieVsTeamColumns = (width) => {
    const columnWidth = width ? width : '120'
    const columns = [
        {
            field:'team',
            headerName:'VS',
            width:columnWidth
        },
        {
            field:'games',
            headerName:'GP',
            width:columnWidth
        },
        {
            field:'timeOnIce',
            headerName:'MIN',
            width:columnWidth
        },
        {
            field:'shotsAgainst',
            headerName:'SHOTS',
            width:columnWidth
        },
        {
            field:'goalsAllowed',
            headerName:'GA',
            width:columnWidth
        },
        {
            field:"shotsPer60",
            headerName:"SHOT/60",
            width:columnWidth,
            valueGetter: (params)=>
                (params.row.shotsAgainst / (params.row.timeOnIce / 60)).toFixed(2)
        },
        {
            field:"goalsPer60",
            headerName:"GAA",
            width:columnWidth,
            valueGetter: (params)=>
                (params.row.goalsAllowed / (params.row.timeOnIce / 60)).toFixed(2)
        },
        {
            field:"savePercent",
            headerName:"S%",
            width:columnWidth,
            valueGetter: (params)=>
                `${(((params.row.shotsAgainst - params.row.goalsAllowed) / params.row.shotsAgainst) * 100).toFixed(2)}`,
            sortComparator: (v1, v2) =>
                parseFloat(v2) - parseFloat(v1)
        },
        {
            field:"W",
            headerName:"W",
            width:columnWidth
        },
        {
            field:"L",
            headerName:"L",
            width:columnWidth
        },
        {
            field:"T",
            headerName:"T/OTL",
            width:columnWidth
        }
    ]
    return columns
}