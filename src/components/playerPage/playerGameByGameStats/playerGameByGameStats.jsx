import React, { useContext } from 'react'
import { Grid } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { DataManagerContext } from '../../dataManager/dataManager'
import ChartHeading from '../../chartHeading/chartHeading'
import useStyles from './styles'

const PlayerGameByGameStats = ({player}) => {
    const { getPlayerGamesColumns, getPlayerGamesRows, getGoalieGamesColumns } = useContext(DataManagerContext)
    const { dataGrid } = useStyles()
    const isGoalie = player?.positions.includes('G')
    const columns = isGoalie ? getGoalieGamesColumns(100) : getPlayerGamesColumns(100)
    const rows = getPlayerGamesRows(player.boxscores)?.sort((row1, row2)=>(new Date(row2.date) - new Date(row1.date)))
    return (
        <>
        <ChartHeading 
            title={`${player.fullName}'s Game To Game Stats`}
            description={`Here you will find ${player.firstName}'s game to game stats for the current season.  To sort, filter, or hide columns hover over the column heading and click the ellipsis (dot-dot-dot) to access the column menu.`}
        />
        <Grid item xs={12}>
            <DataGrid
                className={dataGrid}
                rows={rows}
                columns={columns}
                rowHeight={38}
                sortingOrder={['desc', 'asc']}
                hideFooterRowCount
                hideFooterSelectedRowCount
                hideFooterPagination
            />
        </Grid>
        </>
    )
}

export default PlayerGameByGameStats
