import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme)=>({
    container:{
        backgroundColor:theme.palette.primary.main,
        paddingTop:"125px",
        '& .MuiTypography-root':{
            color:theme.palette.primary.contrastText
        }
    }
}))