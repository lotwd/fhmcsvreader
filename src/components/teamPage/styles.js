import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme)=>({
    container:{
        backgroundColor:theme.palette.primary.main,
        '& .MuiTypography-root':{
            color:theme.palette.primary.contrastText
        }
    },
    title:{
        marginTop:"75px",
        color:theme.palette.primary.contrastText
    },
    dataGrid:{
        backgroundColor:theme.palette.primary.contrastText,
        '& .MuiDataGrid-columnHeader':{
            fontSize:"10px"
        },
        '& a':{
            textDecoration:'none',
            color:'black'
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
            border:`1px solid ${theme.palette.primary.contrastText}`,
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
            color:theme.palette.primary.dark
        }
    }
}))