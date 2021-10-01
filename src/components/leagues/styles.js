import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme)=>({
    container:{
        backgroundColor:theme.palette.primary.main,
        minHeight:"100vh"
    },
    leagueButton:{
        border:'1px solid #00000080',
        borderRadius:'10px',
        padding:"10px",
        maxWidth:"100%",
        margin:"0 50px",
        backgroundColor:theme.palette.secondary.dark,
        marginBottom:'2px'
    },
    link:{
        display:'flex',
        '& h5':{
            color:'white'
        }
    },
    title:{
        color:theme.palette.primary.contrastText,
        margin:"125px 0"
    }
}))