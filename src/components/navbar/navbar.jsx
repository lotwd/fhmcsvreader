import React, {useContext} from 'react'
import { Grid, IconButton, Typography } from '@material-ui/core'
import { ThreeSixty } from '@material-ui/icons'
import useStyles from './styles'
import { DataManagerContext } from '../dataManager/dataManager'

const Navbar = ({backButton, showFileUpload}) => {
    const { container, changeButton } = useStyles()
    const { handleFileUpload } = useContext(DataManagerContext)
    return (
        <Grid item xs={12}>
            <nav className={container}>
                {
                    backButton
                }
                {
                    showFileUpload &&
                    <IconButton className={changeButton} onClick={e=>e.target.closest('nav').querySelector('input').click()}>
                    <ThreeSixty/>
                        <Typography variant="body2">
                            Change CSV Files
                        </Typography>
                        <input id="file-upload" type="file" hidden multiple onChange={handleFileUpload}/>
                    </IconButton>
                }
            </nav>
        </Grid>
    )
}

export default Navbar
