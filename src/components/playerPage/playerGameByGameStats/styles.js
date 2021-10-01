import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme)=>({
    dataGrid:{
        backgroundColor:theme.palette.primary.contrastText,
        height:"600px",
        '& .MuiDataGrid-columnHeader':{
            fontSize:"10px"
        }
    }
}))