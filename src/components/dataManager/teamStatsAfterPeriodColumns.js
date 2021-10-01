import React from 'react'
import { Link } from 'gatsby'

export const teamStatsAfterPeriodColumns = (width) => {
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
            field:"upOneFirstW",
            headerName:"Wup1.1st",
            width:columnWidth
        },
        {
            field:"upOneFirstL",
            headerName:"Lup1.1st",
            width:columnWidth
        },
        {
            field:"upOneFirstT",
            headerName:"Tup1.1st",
            width:columnWidth
        },
        {
            field:"upTwoFirstW",
            headerName:"Wup2.1st",
            width:columnWidth
        },
        {
            field:"upTwoFirstL",
            headerName:"Lup2.1st",
            width:columnWidth
        },
        {
            field:"upTwoFirstT",
            headerName:"Tup2.1st",
            width:columnWidth
        },
        {
            field:"upThreeFirstW",
            headerName:"Wup3.1st",
            width:columnWidth
        },
        {
            field:"upThreeFirstL",
            headerName:"Lup3.1st",
            width:columnWidth
        },
        {
            field:"upThreeFirstT",
            headerName:"Tup3.1st",
            width:columnWidth
        },
        {
            field:"downOneFirstW",
            headerName:"Wdn1.1st",
            width:columnWidth
        },
        {
            field:"downOneFirstL",
            headerName:"Ldn1.1st",
            width:columnWidth
        },
        {
            field:"downOneFirstT",
            headerName:"Tdn1.1st",
            width:columnWidth
        },
        {
            field:"downTwoFirstW",
            headerName:"Wdn2.1st",
            width:columnWidth
        },
        {
            field:"downTwoFirstL",
            headerName:"Ldn2.1st",
            width:columnWidth
        },
        {
            field:"downTwoFirstT",
            headerName:"Tdn2.1st",
            width:columnWidth
        },
        {
            field:"downThreeFirstW",
            headerName:"Wdn3.1st",
            width:columnWidth
        },
        {
            field:"downThreeFirstL",
            headerName:"Ldn3.1st",
            width:columnWidth
        },
        {
            field:"downThreeFirstT",
            headerName:"Tdn3.1st",
            width:columnWidth
        },
        {
            field:"upFourPlusFirstW",
            headerName:"Wup4+1st",
            width:columnWidth
        },
        {
            field:"upFourPlusFirstL",
            headerName:"Lup4+1st",
            width:columnWidth
        },
        {
            field:"upFourPlusFirstT",
            headerName:"Tup4+F",
            width:columnWidth
        },
        {
            field:"upOneSecondW",
            headerName:"Wup1.2nd",
            width:columnWidth
        },
        {
            field:"upOneSecondL",
            headerName:"Lup1.2nd",
            width:columnWidth
        },
        {
            field:"upOneSecondT",
            headerName:"Tup1.2nd",
            width:columnWidth
        },
        {
            field:"upTwoSecondW",
            headerName:"Wup2.2nd",
            width:columnWidth
        },
        {
            field:"upTwoSecondL",
            headerName:"Lup2.2nd",
            width:columnWidth
        },
        {
            field:"upTwoSecondT",
            headerName:"Tup2.2nd",
            width:columnWidth
        },
        {
            field:"upThreeSecondW",
            headerName:"Wup3.2nd",
            width:columnWidth
        },
        {
            field:"upThreeSecondL",
            headerName:"Lup3.2nd",
            width:columnWidth
        },
        {
            field:"upThreeSecondT",
            headerName:"Tup3.2nd",
            width:columnWidth
        },
        {
            field:"upFourPlusSecondW",
            headerName:"Wup4+2nd",
            width:columnWidth
        },
        {
            field:"upFourPlusSecondL",
            headerName:"Lup4+2nd",
            width:columnWidth
        },
        {
            field:"upFourPlusSecondT",
            headerName:"Tup4+2nd",
            width:columnWidth
        },       
        {
            field:"downFourPlusFirstW",
            headerName:"Wdn4+1st",
            width:columnWidth
        },
        {
            field:"downFourPlusFirstL",
            headerName:"Ldn4+1st",
            width:columnWidth
        },
        {
            field:"downFourPlusFirstT",
            headerName:"Tdn4+1st",
            width:columnWidth
        },
        {
            field:"downOneSecondW",
            headerName:"Wdn1.2nd",
            width:columnWidth
        },
        {
            field:"downOneSecondL",
            headerName:"Ldn1.2nd",
            width:columnWidth
        },
        {
            field:"downOneSecondT",
            headerName:"Tdn1.2nd",
            width:columnWidth
        },
        {
            field:"downTwoSecondW",
            headerName:"Wdn2.2nd",
            width:columnWidth
        },
        {
            field:"downTwoSecondL",
            headerName:"Ldn2.2nd",
            width:columnWidth
        },
        {
            field:"downTwoSecondT",
            headerName:"Tdn2.2nd",
            width:columnWidth
        },
        {
            field:"downThreeSecondW",
            headerName:"Wdn3.2nd",
            width:columnWidth
        },
        {
            field:"downThreeSecondL",
            headerName:"Ldn3.2nd",
            width:columnWidth
        },
        {
            field:"downThreeSecondT",
            headerName:"Tdn3.2nd",
            width:columnWidth
        },
        {
            field:"downFourPlusSecondW",
            headerName:"Wdn4+2nd",
            width:columnWidth
        },
        {
            field:"downFourPlusSecondL",
            headerName:"Ldn4+2nd",
            width:columnWidth
        },
        {
            field:"downFourPlusSecondT",
            headerName:"Tdn4+2nd",
            width:columnWidth
        },
    ]
    return columns
}