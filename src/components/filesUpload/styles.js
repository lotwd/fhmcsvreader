import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme)=>({
    container:{
        backgroundColor:theme.palette.primary.main,
        padding:"25px"
    },
    logoSvg:{

    },
    title:{
        margin:"50px 0 0 0",
        '& h1':{
            fontSize:'30px',
            color:theme.palette.primary.contrastText
        }
    },
    instructions:{
        '& p':{
            color:theme.palette.primary.contrastText,
        }
    },
    divider:{
        height:"5px",
        width:"100%", 
        margin:"25px 0",
        backgroundColor:theme.palette.secondary.light
    },
    button:{
        padding:"15px 50px",
        margin:"25px 0",
        height:"100px",
        width:"300px",
        cursor:"pointer",
        backgroundColor:theme.palette.secondary.light,
        color:theme.palette.secondary.contrastText,
        fontFamily:'Lato',
        fontSize:'22px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        border:'1px solid black'
    },
    buttonSmall:{
        backgroundColor:theme.palette.secondary.dark,
        color:theme.palette.primary.contrastText,
        height:"75px",
        width:"auto",
        padding:"5px 30px",
        border:'none',
    },
    logoContainer:{
        display:'flex',
        justifyContent:'center',
        marginTop:"25px",
        '& svg':{
            width:"250px",
        },
        '& path':{
            filter:`drop-shadow(0px 0px 3px ${theme.palette.secondary.light})`
        }
    },
    logoPath:{
        fill:theme.palette.secondary.light,
        stroke:theme.palette.secondary.dark,
        strokeWidth:"5px"
    },
    faqContainer:{
        marginTop:"50px"
    },
    faq:{
        margin:"5px 0px",
        color:theme.palette.primary.contrastText,
        '& h6':{
            color:theme.palette.secondary.light
        },
        '& p':{
            color:theme.palette.primary.contrastText
        }
    },
    progressContainer:{
        margin:"200px 0px",
        '& p':{
            color:theme.palette.secondary.main
        },
        '& .MuiLinearProgress-root':{
            marginTop:'15px',
            backgroundColor:theme.palette.secondary.light
        },
        '& .MuiLinearProgress-bar':{
            backgroundColor:theme.palette.secondary.dark
        }
    },
    errorContainer:{
        margin:"200px 0px",
    },
    message:{
        margingBottom:"10px"
    }
}))
