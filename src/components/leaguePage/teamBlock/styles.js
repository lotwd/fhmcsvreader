import { makeStyles } from '@material-ui/core'

export default makeStyles((theme)=>({
    cellsContainer:{
        display:"inline-flex",
    },
    teamCell:{
        width:"250px",
        padding:"5px 0",
        marginLeft:"15px",
        '& a':{
            textDecoration:"none",
            color:"black"
        },
        [theme.breakpoints.down('md')]:{
            width:"50px"
        }
    },
    cell:{
        width:"35px",
        padding:"5px 0",
        textAlign:"center",
        borderLeft:"1px solid rgba(0,0,0,0.1)",
        '& p':{
            fontSize:"12px"
        }
    }
}))