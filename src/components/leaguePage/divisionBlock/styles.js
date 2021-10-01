import { makeStyles } from '@material-ui/core'

export default makeStyles((theme)=>({
    container:{
        overflowX:"scroll",
        '& > div':{
            minWidth:"1000px"
        }
    }
}))