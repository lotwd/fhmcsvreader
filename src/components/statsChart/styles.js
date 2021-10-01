import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme)=>({
    bar:{
        '& path':{
            filter:'drop-shadow(2px 3px 3px rgba(0,0,0,0.6))'
        }  
    },
    chart:{
        backgroundColor:theme.palette.primary.contrastText,
        padding:"25px 0",
        '& .MuiTypography-root':{
            color:theme.palette.primary.main
        }
    },
    checkboxesContainer:{
        display:"flex",
        justifyContent:"center"
    },
    checkboxes:{
        display:"flex",
        justifyContent:"center",
        '& .MuiTypography-root':{
            color:theme.palette.primary.dark
        },
        '& .MuiTypography-body1':{
            fontSize:'12px',
            color:theme.palette.primary.main
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
            marginBottom:"2px",
        },
    },
    unchecked:{
        backgroundColor:theme.palette.primary.light,
        '& .MuiTypography-root':{
            color:theme.palette.primary.contrastText
        },
        
    },
    checked:{
        backgroundColor:theme.palette.secondary.light,
        '& .MuiTypography-root':{
            color:theme.palette.primary.contrastText
        }
    }
}))