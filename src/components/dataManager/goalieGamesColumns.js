export const goalieGamesColumns = (width) => {
    const columnWidth = width ? width : '120'
    const columns = [
        {
            field:'date',
            headerName:'DT',
            width:columnWidth + 50,
        },
        {
            field:'league',
            headerName:'LG',
            width:columnWidth,
        },
        {
            field:'teamHome',
            headerName:"H",
            width:columnWidth
        },
        {
            field:'teamAway',
            headerName:"A",
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
            field:'saves',
            headerName:'SVS',
            width:columnWidth
        },
        {
            field:'goalsAllowed',
            headerName:'GA',
            width:columnWidth
        },
        {
            field:'savePercentage',
            headerName:'S%',
            width:columnWidth
        },
        {
            field:'goalsAgainstAverage',
            headerName:'GAA',
            width:columnWidth
        },
        {
            field:'penalties',
            headerName:'PLM',
            width:columnWidth
        },
        {
            field:'outcome',
            headerName:'RESULT',
            width:columnWidth
        },
        {
            field:'type',
            headerName:'SEASON',
            width:columnWidth * 2
        }
    ]
    return columns
}

