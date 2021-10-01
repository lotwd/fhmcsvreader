import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme)=>({
    bar:{
        '& path':{
            filter:'drop-shadow(2px 3px 3px rgba(0,0,0,0.6))'
        }  
    },
    checkboxesContainer:{
        display:"flex",
        justifyContent:"center"
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
            border:`1px solid ${theme.palette.primary.contrastText}`,
            borderRadius:"10px",
            display:'flex',
            justifyContent:'center',
            marginBottom:"2px"
        }
    },
    checked:{
        backgroundColor:theme.palette.secondary.light,
        '& .MuiTypography-body1':{
            color:theme.palette.primary.main
        },
    }
}))