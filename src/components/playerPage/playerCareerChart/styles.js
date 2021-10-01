import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme)=>({
    container:{
        margin:"25px 0",
    },
    subtitle:{
        fontFamily:'Lato'
    },
    checkboxes:{
        display:"flex",
        justifyContent:"center",
        '& .MuiTypography-body1':{
            fontSize:'12px'
        },
        '& .MuiButtonBase-root':{
            padding:'10px 0',
        },
        '& svg':{
            width:0
        },
        '& label':{
            width:'150px',
            border:"1px solid black",
            borderRadius:"10px",
            display:'flex',
            justifyContent:'center',
            marginBottom:"2px"
        }
    },
    checked:{
        backgroundColor:theme.palette.secondary.light,
    },
    unchecked:{
        backgroundColor:theme.palette.primary.light,
        '& .MuiTypography-root':{
            color:theme.palette.primary.contrastText
        },
    },
    chartContainer:{
        backgroundColor:theme.palette.primary.contrastText
    },
    chart:{
        '& path':{
            filter:'drop-shadow(2px 3px 3px black)'
        }  
    }
}))