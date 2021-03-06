export const playerVsTeamColumns = (width) => {
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
            field:'goals',
            headerName:'G',
            width:columnWidth
        },
        {
            field:'assists',
            headerName:'A',
            width:columnWidth
        },
        {
            field:'points',
            headerName:'PTS',
            width:columnWidth
        },
        {
            field:'plusMinus',
            headerName:'+/-',
            width:columnWidth
        },
        {
            field:'goalsPerGame',
            headerName:'G/GP',
            width:columnWidth
        },
        {
            field:'assistsPerGame',
            headerName:'A/GP',
            width:columnWidth
        },
        {
            field:'pointsPerGame',
            headerName:'PTS/GP',
            width:columnWidth
        },
        {
            field:'goalsFirst',
            headerName:"G.1st.Per",
            width:columnWidth
        },
        {
            field:'goalsSecond',
            headerName:"G.2nd.Per",
            width:columnWidth
        },
        {
            field:'goalsThird',
            headerName:"G.3rd.Per",
            width:columnWidth
        },
        {
            field:'goalsOT',
            headerName:"G.OT",
            width:columnWidth
        },
        {
            field:'assistsFirst',
            headerName:"A.1st.Per",
            width:columnWidth
        },
        {
            field:'assistsSecond',
            headerName:"A.2nd.Per",
            width:columnWidth
        },
        {
            field:'assistsThird',
            headerName:"A.3rd.Per",
            width:columnWidth
        },
        {
            field:'assistsOT',
            headerName:"A.OT",
            width:columnWidth
        },
        {
            field:'shots',
            headerName:"Shots",
            width:columnWidth
        },
        {
            field:'shotsPerGame',
            headerName:"Shots/GP",
            width:columnWidth
        },
        {
            field:'missedShots',
            headerName:'MS'
        },
        {
            field:'shifts',
            headerName:"Shifts",
            width:columnWidth
        },
        {
            field:'shiftsPerGame',
            headerName:"Shifts/GP",
            width:columnWidth
        },
        {
            field:'hits',
            headerName:'Hits',
            width:columnWidth
        },
        {
            field:'hitsPerGame',
            headerName:'Hits/GP',
            width:columnWidth
        },
        {
            field:'takeaways',
            headerName:"TkA",
            width:columnWidth
        },
        {
            field:'takeawaysPerGame',
            headerName:"TkA/GP",
            width:columnWidth
        },
        {
            field:'giveaways',
            headerName:"GvA",
            width:columnWidth
        },
        {
            field:'giveawaysPerGame',
            headerName:"GvA/GP",
            width:columnWidth
        },
        {
            field:'penalties',
            headerName:"Penalties",
            width:columnWidth
        },
        {
            field:'faceoffs',
            headerName:"FO",
            width:columnWidth
        },
        {
            field:'faceoffWins',
            headerName:"FOWins",
            width:columnWidth
        },
        {
            field:'faceoffLosses',
            headerName:"FOLosses",
            width:columnWidth
        },
        {
            field:'faceoffPercent',
            headerName:'FO%',
            width:columnWidth
        }
    ]
    return columns
}