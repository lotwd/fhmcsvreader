import React from 'react'
import { Helmet } from 'react-helmet'
import { CssBaseline } from '@material-ui/core'
import {
    createTheme,
    MuiThemeProvider
  } from "@material-ui/core/styles";
  // const barColors = ['#1F130080', '#14591D80', '#2C578480','#5B186580','#A4420080', '#ff000080']
const theme = createTheme({
    palette:{
        primary:{
            light:'#425158',
            main:'#13262F',
            dark:'#0d1a20',
            contrastText:'#E9E6FF'
        },
        secondary:{
            main:'#FF3864',
            dark:'#b22746',
            light:'#ff5f83',
            contrastText:'#000'
        },
        textPrimary:{
            main:'#E9E6FF'
        },
        textSecondary:{
            main:'#621B00'
        },
    },
    overrides:{
        MuiCssBaseline: {
            "@global": {
              body: {
                scrollbarColor: "rgba(31, 19, 0, 0.5) transparent",
                "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                  backgroundColor: "transparent",
                },
                "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                  borderRadius: 8,
                  backgroundColor: "rgba(31, 19, 0, 0.25)",
                  minHeight: 24,
                  border: "0px solid #2b2b2b",
                },
                "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                  backgroundColor: "rgba(31, 19, 0, 0.5)",
                },
                "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
                  backgroundColor: "rgba(31, 19, 0, 0.5)",
                },
                "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "rgba(31, 19, 0, 0.5)",
                },
                "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                  backgroundColor: "rgba(31, 19, 0, 0.05)",
                },
              },
            },
          },
    }
})

theme.typography.h5 = {
    fontSize:'1.5rem',
    '@media (max-width:960px)':{
        fontSize:'1.25rem'
    },
    '@media (max-width:600px)':{
        fontSize:'1.15rem'
    }
}
theme.typography.h4 = {
    fontSize:'1.9rem',
    '@media (max-width:960px)':{
        fontSize:'1.5rem'
    },
    '@media (max-width:600px)':{
        fontSize:'1.25rem'
    }
}
theme.typography.h3 = {
    fontSize:'2.25rem',
    '@media (max-width:1280px)':{
        fontSize:'2rem'
    },
    '@media (max-width:960px)':{
        fontSize:'1.75rem'
    },
    '@media (max-width:600px)':{
        fontSize:'1.5rem'
    }
}
theme.typography.body2 = {
  fontSize:'1.25rem',
  fontFamily:'Lato',
  '@media (max-width:1280px)':{
      fontSize:'1.15rem'
  },
  '@media (max-width:960px)':{
      fontSize:'1.05rem'
  },
  '@media (max-width:600px)':{
      fontSize:'1rem',
  }
}

const Layout = ({children}) => {
    return (
      <MuiThemeProvider theme={theme}>
        <Helmet title="Unofficial FHM CSV Reader" defer={false}>
          <meta 
            name="description" 
            content="Use this tool to import your Franchise Hockey Manager 7 CSV files and get access to expanded stats, charts and more.  " />
          <meta name="keywords" content="franchise hockey manager, fhm, franchise hockey manager 7, fhm7, franchise hockey manager csv reader, fhm csv reader"/>
          <link rel="canonical" href="https://www.fhmcsvreader.com" />
        </Helmet>
          <CssBaseline/>
          {children}
      </MuiThemeProvider>
    )
}

export default Layout
