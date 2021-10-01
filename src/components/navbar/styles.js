import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme)=>({
    container:{
        position:'fixed',
        top:'0px',
        width:'100%',
        zIndex:2,
        height:"50px",
        backgroundColor:theme.palette.primary.dark,
        borderBottom:`2px solid ${theme.palette.secondary.main}`,
        '& button':{
            backgroundColor:theme.palette.secondary.light,
            borderRadius:"10px",
            height:"40px",
            marginTop:"2.5px",
            '&:hover':{
                backgroundColor:theme.palette.primary.contrastText
            }
        }
    },
    changeButton:{
        float:'right',
        marginRight:"10px"
    }
}))
