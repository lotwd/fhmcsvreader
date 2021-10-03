import React, {useContext, useState, useEffect} from 'react'
import { Helmet } from 'react-helmet'
import { Grid, Typography} from '@material-ui/core'
import { Link, navigate } from 'gatsby'
import { DataManagerContext } from '../dataManager/dataManager'
import Navbar from '../navbar/navbar'
import useStyles from './styles'

const Leagues = () => {
    const { data } = useContext(DataManagerContext)
    const [ status, setStatus ] = useState({state:'menu', data:null})
    const { leagueButton, link, container, title } = useStyles()
    const handleLeagueClicked = (e, state) => {
        e.preventDefault()
        setStatus({state:'routing', data:{...state}})
    }
    useEffect(() => {
        if(status?.state==='routing'){
            navigate('/league', status.data )
        }
    }, [status])
    return (
        <>
        <Helmet title={`Choose Your League || Unofficial FHM CSV Reader`}/>
        <Grid container className={container} direction="column">
            <Navbar showFileUpload/>
            <Grid style={{paddingLeft:'10px'}} item xs={12}>
                <Typography className={title} style={{marginBottom:"50px"}} variant="body2" align="center">
                    Here are the leagues available from the uploaded csv files.  Note that this list may include leagues you haven't selected in your game that will be filled with no data.
                </Typography>
            </Grid>
            {
                data?.league_data?.map((league, key)=>{
                    const name = league[1]
                    const abbr = league[2]
                    if(key===0 || league[1] === undefined)return null
                    return(
                        <Grid item key={league[2] + league[1]} xs={12} className={leagueButton}>
                            <Link
                                className={link}
                                to='/league'
                                onClick={(e)=>{handleLeagueClicked(e,  {state:{data:{...league}}})}}
                                style={{textDecoration:"none", color:"black"}}
                            >
                                <Typography variant="h5">
                                    {
                                        `${abbr} | ${name}`
                                    }
                                </Typography>
                            </Link>
                        </Grid>
                    )
                })
            }
        </Grid>
        </>
    )
}

export default Leagues
