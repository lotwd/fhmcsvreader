import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme)=>({
    dataGrid:{
        backgroundColor:theme.palette.primary.contrastText,
        height:"600px",
        '& .MuiDataGrid-columnHeader':{
            fontSize:"10px"
        }
    },
    checkboxesContainer:{
        display:'flex',
        justifyContent:'center'
    },
    checkboxes:{
        display:"flex",
        justifyContent:"center",
        flexDirection:'initial',
        '& .MuiTypography-body1':{
            fontSize:'14px'
        },
        '& .MuiButtonBase-root':{
            padding:'10px 0',
        },
        '& svg':{
            width:0
        },
        '& label':{
            width:'200px',
            border:`1px solid ${theme.palette.primary.contrastText}`,
            borderRadius:"10px",
            display:'flex',
            justifyContent:'center',
            marginBottom:"2px",
            textAlign:'center',
            fontFamily:'Lato',
        }
    },
    checked:{
        color:"white",
        backgroundColor:theme.palette.secondary.light
    },
    unchecked:{
        backgroundColor:theme.palette.primary.light,
        '& .MuiTypography-root':{
            color:theme.palette.primary.contrastText
        },
    },
    dropdown:{
        display:"flex", 
        justifyContent:"center", 
        marginTop:"25px",
        marginBottom:"25px",
        '& .MuiInput-root':{
            backgroundColor:theme.palette.primary.contrastText
        }
    }
}))