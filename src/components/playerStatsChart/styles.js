import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme)=>({
    checkboxes:{
        margin:'25px 0',
        display:'flex',
        justifyContent:'center',
        '& .MuiTypography-root':{
            color:theme.palette.primary.contrastText
        },
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
            border:`1px solid ${theme.palette.primary.dark}`,
            borderRadius:"10px",
            display:'flex',
            justifyContent:'center',
            marginBottom:"2px",
            '& .MuiTypography-root':{
                color:theme.palette.primary.contrastText
            },
        }
    },
    checked:{
        backgroundColor:theme.palette.secondary.light,
        '& .MuiTypography-root':{
            color:theme.palette.primary.contrastText
        }
    },
    unchecked:{
        backgroundColor:theme.palette.primary.light,
        '& .MuiTypography-root':{
            color:theme.palette.primary.contrastText
        },
    },
    chart:{
        backgroundColor:theme.palette.primary.contrastText
    }
}))