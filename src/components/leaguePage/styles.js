import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme)=>({
    root:{
        minHeight:"100%",
        backgroundColor:theme.palette.primary.main,
        '& a':{
            textDecoration:'none',
            color:'inherit'
        },
        '& .MuiTypography-root':{
            color:theme.palette.primary.contrastText
        },
        '& nav .MuiTypography-root':{
            color:'inherit'
        }
    },
    dataGrid:{
        height:"600px",
        backgroundColor:theme.palette.primary.contrastText,
        color:theme.palette.primary.main,
        '& .MuiDataGrid-columnHeader':{
            fontSize:"10px"
        },       
    }
}))