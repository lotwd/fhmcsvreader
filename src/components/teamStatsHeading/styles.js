import { makeStyles } from '@material-ui/core'

export default makeStyles((theme)=>({
    container:{
        width:"100%",
        display:"flex",
    },
    teamCell:{
        width:"250px",
        '& p':{
            fontSize:"11px"
        },
        marginLeft:"15px",
        marginRight:"10px",
        [theme.breakpoints.down('md')]:{
            width:"50px"
        }
    },
    cell:{
        width:"35px",
        textAlign:"center",
        '& p':{
            fontSize:"11px"
        },
        '& button':{
            textAlign:"center",
            minWidth:"0",
            width:"35px",
            height:"100%",
            padding:"0",
            '&:hover':{
                backgroundColor:"transparent"
            }
        }
    }
}))