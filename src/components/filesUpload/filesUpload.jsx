import React, {useContext, useState, useEffect} from 'react'
import { Grid, Typography, LinearProgress } from '@material-ui/core'
import { DataManagerContext } from '../dataManager/dataManager'
import useStyles from './styles'

const FilesUpload = ({demoData}) => {
  const { container, title, instructions, button, buttonSmall, logoContainer, faqContainer, faq, divider, errorContainer, progressContainer, message } = useStyles()
  const logo = (
    <svg width="500" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="300" fill="#13262F"/>
    <path d="M10 150C18.5 199.5 280.5 200 290 150" stroke="#FF3864" strokeWidth="5"/>
    <path d="M10 77C18.5 126.5 280.5 127 290 77" stroke="#FF3864" strokeWidth="5"/>
    <path d="M290 78.3127C281.5 28.8127 19.5 28.3127 10 78.3127" stroke="#FF3864" strokeWidth="5"/>
    <path d="M290 150V77M10 150V77" stroke="#FF3864" strokeWidth="5"/>
    <path d="M113.477 79.1621H95.5762V98H89.9512V55.3438H116.377V59.9727H95.5762V74.5625H113.477V79.1621Z" fill="#FF3864"/>
    <path d="M155.898 98H150.244V78.2832H128.74V98H123.115V55.3438H128.74V73.6836H150.244V55.3438H155.898V98Z" fill="#FF3864"/>
    <path d="M173.154 55.3438L187.1 90.1484L201.045 55.3438H208.34V98H202.715V81.3887L203.242 63.459L189.238 98H184.932L170.957 63.5469L171.514 81.3887V98H165.889V55.3438H173.154Z" fill="#FF3864"/>
    <path d="M130.734 156.557C130.598 159.525 129.797 162.152 128.332 164.438C126.867 166.703 124.807 168.461 122.15 169.711C119.514 170.961 116.496 171.586 113.098 171.586C107.492 171.586 103.078 169.76 99.8555 166.107C96.6328 162.455 95.0215 157.299 95.0215 150.639V148.529C95.0215 144.35 95.7441 140.697 97.1895 137.572C98.6543 134.428 100.754 132.006 103.488 130.307C106.223 128.588 109.387 127.729 112.98 127.729C118.156 127.729 122.316 129.096 125.461 131.83C128.605 134.545 130.393 138.295 130.822 143.08H120.568C120.49 140.482 119.836 138.617 118.605 137.484C117.375 136.352 115.5 135.785 112.98 135.785C110.422 135.785 108.547 136.742 107.355 138.656C106.164 140.57 105.539 143.627 105.48 147.826V150.844C105.48 155.395 106.047 158.646 107.18 160.6C108.332 162.553 110.305 163.529 113.098 163.529C115.461 163.529 117.268 162.973 118.518 161.859C119.768 160.746 120.432 158.979 120.51 156.557H130.734Z" fill="#FF3864"/>
    <path d="M157.6 159.662C157.6 158.158 157.062 156.986 155.988 156.146C154.934 155.307 153.068 154.438 150.393 153.539C147.717 152.641 145.529 151.771 143.83 150.932C138.303 148.217 135.539 144.486 135.539 139.74C135.539 137.377 136.223 135.297 137.59 133.5C138.977 131.684 140.93 130.277 143.449 129.281C145.969 128.266 148.801 127.758 151.945 127.758C155.012 127.758 157.756 128.305 160.178 129.398C162.619 130.492 164.514 132.055 165.861 134.086C167.209 136.098 167.883 138.402 167.883 141H157.629C157.629 139.262 157.092 137.914 156.018 136.957C154.963 136 153.527 135.521 151.711 135.521C149.875 135.521 148.42 135.932 147.346 136.752C146.291 137.553 145.764 138.578 145.764 139.828C145.764 140.922 146.35 141.918 147.521 142.816C148.693 143.695 150.754 144.613 153.703 145.57C156.652 146.508 159.074 147.523 160.969 148.617C165.578 151.273 167.883 154.936 167.883 159.604C167.883 163.334 166.477 166.264 163.664 168.393C160.852 170.521 156.994 171.586 152.092 171.586C148.635 171.586 145.5 170.971 142.688 169.74C139.895 168.49 137.785 166.791 136.359 164.643C134.953 162.475 134.25 159.984 134.25 157.172H144.562C144.562 159.457 145.148 161.146 146.32 162.24C147.512 163.314 149.436 163.852 152.092 163.852C153.791 163.852 155.129 163.49 156.105 162.768C157.102 162.025 157.6 160.99 157.6 159.662Z" fill="#FF3864"/>
    <path d="M189.709 159.398L198.205 128.344H209.689L195.334 171H184.084L169.846 128.344H181.242L189.709 159.398Z" fill="#FF3864"/>
    <path d="M58.0723 230.941H52.5059V246H42.2227V203.344H59.0098C64.0684 203.344 68.0234 204.467 70.875 206.713C73.7266 208.959 75.1523 212.133 75.1523 216.234C75.1523 219.203 74.5469 221.664 73.3359 223.617C72.1445 225.57 70.2695 227.152 67.7109 228.363L76.6172 245.561V246H65.6016L58.0723 230.941ZM52.5059 223.002H59.0098C60.9629 223.002 62.4277 222.494 63.4043 221.479C64.4004 220.443 64.8984 219.008 64.8984 217.172C64.8984 215.336 64.4004 213.9 63.4043 212.865C62.4082 211.811 60.9434 211.283 59.0098 211.283H52.5059V223.002Z" fill="#FF3864"/>
    <path d="M107.818 227.924H91.6465V238.09H110.748V246H81.3633V203.344H110.807V211.283H91.6465V220.277H107.818V227.924Z" fill="#FF3864"/>
    <path d="M139.166 238.031H125.074L122.613 246H111.627L127.271 203.344H136.939L152.701 246H141.656L139.166 238.031ZM127.535 230.092H136.705L132.105 215.297L127.535 230.092Z" fill="#FF3864"/>
    <path d="M155.836 246V203.344H169.576C173.346 203.344 176.734 204.203 179.742 205.922C182.75 207.621 185.094 210.033 186.773 213.158C188.473 216.264 189.332 219.75 189.352 223.617V225.58C189.352 229.486 188.521 232.992 186.861 236.098C185.221 239.184 182.896 241.605 179.889 243.363C176.9 245.102 173.561 245.98 169.869 246H155.836ZM166.119 211.283V238.09H169.693C172.643 238.09 174.908 237.045 176.49 234.955C178.072 232.846 178.863 229.721 178.863 225.58V223.734C178.863 219.613 178.072 216.508 176.49 214.418C174.908 212.328 172.604 211.283 169.576 211.283H166.119Z" fill="#FF3864"/>
    <path d="M221.08 227.924H204.908V238.09H224.01V246H194.625V203.344H224.068V211.283H204.908V220.277H221.08V227.924Z" fill="#FF3864"/>
    <path d="M244.049 230.941H238.482V246H228.199V203.344H244.986C250.045 203.344 254 204.467 256.852 206.713C259.703 208.959 261.129 212.133 261.129 216.234C261.129 219.203 260.523 221.664 259.312 223.617C258.121 225.57 256.246 227.152 253.688 228.363L262.594 245.561V246H251.578L244.049 230.941ZM238.482 223.002H244.986C246.939 223.002 248.404 222.494 249.381 221.479C250.377 220.443 250.875 219.008 250.875 217.172C250.875 215.336 250.377 213.9 249.381 212.865C248.385 211.811 246.92 211.283 244.986 211.283H238.482V223.002Z" fill="#FF3864"/>
    </svg>
    )
    const { setData, handleFileUpload } = useContext(DataManagerContext)
    const [ status, setStatus ] = useState('prompting')
    const [ errors, setErrors ] = useState([])
    
    const demo = () => {
      const filesObject = {}
      Object.keys(demoData).forEach(file=>{
        const name = file.split(/(?=[A-Z])/).join('_').toLowerCase().replace('all_', '').replace('_csv', '')
        filesObject[name] = demoData[file].edges.map(edge=>edge.node.field1.split(';'))
      })
      setData(filesObject)
    }
    const uploadFile = (e) => {
        setStatus('retreiving')
        const errors = handleFileUpload(e)
        if(errors?.length)setErrors(errors)
    }
    useEffect(()=>{
      if(errors.length > 0 && status !== 'error'){
        setStatus('error')
        setTimeout(()=>setErrors([]), 5000)
      }
      else 
      if(status==='error' && errors.length === 0){
        setStatus('prompting')
      }
    },[errors, status, setStatus, setErrors])
    return (
        <>
        <Grid container className={container} justifyContent="center">
        <Grid className={logoContainer} item xs={12}>
                {logo}
            </Grid>
            <Grid className={title} item xs={12}>
                <Typography variant="h1" align="center">
                    Welcome to an Unofficial Franchise Hockey Manager CSV Reader.
                </Typography>
            </Grid>         
            {
                status === 'prompting'
                ?
                <>
                <Grid item xs={12} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <label className={button} htmlFor="file-upload">UPLOAD CSV FILES</label>
                    <input name="file-upload" id="file-upload" type="file" hidden multiple onChange={uploadFile}/>
                </Grid>
                <Grid item xs={10} className={instructions}>
                  <Typography variant="body2" align="center">
                      To use this tool, export your csv files from FHM7 and click the button above to open file explorer.  Browse to the csv folder location, select all the csv files and click open.  Make sure to select all the csv files. 
                  </Typography>
                </Grid>
                <Grid item xs={6} className={divider}/>
                <Grid item xs={10} className={instructions}>
                  <Typography variant="body2" align="center">
                      To use a set of demonstration csv files, use the button below.  The files are for a basic custom league setup with the NHL, AHL and junior leagues with five full seasons having been simulated.
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <button className={`${button} ${buttonSmall}`} onClick={()=>{demo()}}>USE DEMO FILES</button>
                </Grid>
                </>
                :
                status === 'error'
                ?
                <Grid item xs={12} className={errorContainer}>
                    <Typography className={message} variant="body2" color="error" align="center">{`There ${errors.length > 1 ? 'were errors' : 'was an error'} with your upload.  Please try again`}</Typography>
                    {
                      errors.map((error)=>(
                        <Typography variant="body2" color="error" align="center">{error}</Typography> 
                      ))
                    }
                </Grid>
                :
                <Grid item xs={6} className={progressContainer}>
                    <Typography variant="body2" align="center">Loading CSV Files</Typography>
                    <LinearProgress/>
                </Grid>
            }
           
            <Grid item xs={12} className={faqContainer}>
                <Typography variant="h4" align="center" className={faq}>
                    FAQ
                </Typography>
            </Grid>
            <Grid item xs={10} className={faq}>
                <Typography variant="h6" align="center">
                    How do I export my CSV files?
                </Typography>
                <Typography variant="body2" align="center">
                    {`On the main menu at the top of FHM, click World -> Export CSV`}
                </Typography>
            </Grid>
            <Grid item xs={10} className={faq}>
                <Typography variant="h6" align="center">
                    Where do I find the folder the CSV files were exported to?
                </Typography>
                <Typography variant="body2" align="center">
                    {`On the start screen in FHM on the menu at the bottom, click Settings -> Troubleshooting -> Open customizable data folder.`}
                </Typography>
            </Grid>
            <Grid item xs={10} className={faq}>
                <Typography variant="h6" align="center">
                    How do I select more than 1 CSV file
                </Typography>
                <Typography variant="body2" align="center">
                    {`For windows users, you can click and drag the mouse cursor around all the files, or by clicking somewhere in file explorer and pressing Shift + A on your keyboard`}
                </Typography>
            </Grid>
            <Grid item xs={10} className={faq}>
                <Typography variant="h6" align="center">
                    Is FHM CSV Reader an officially endorsed app?
                </Typography>
                <Typography variant="body2" align="center">
                    {`It is not.  This is a fan made product developed by a long time fan of hockey manager games.`}
                </Typography>
            </Grid>
            <Grid item xs={10} className={faq}>
                <Typography variant="h6" align="center">
                    Can I install this website to my desktop and use it offline?
                </Typography>
                <Typography variant="body2" align="center">
                    {`Yes you can, using either Chrome or Edge.  Using Chrome - on the far right of the address bar there should be an monitor icon with a down arrow.  Click that arrow and choose Install.  Using Edge - click on the ellipsis (dot-dot-dot) to the right of the address bar.  Choose Apps->Install this site as an app`}
                </Typography>
            </Grid>
        </Grid>
        </>
    )
}

export default FilesUpload