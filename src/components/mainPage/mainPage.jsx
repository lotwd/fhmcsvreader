import React, {useContext} from 'react'
import { Fade } from '@material-ui/core'
import { DataManagerContext } from '../dataManager/dataManager'
import FilesUpload from '../filesUpload/filesUpload'
import Leagues from '../leagues/leagues'

const MainPage = ({demoData}) => {
    const { data } = useContext(DataManagerContext)
    return (
        <>
            {
                data ?
                <Leagues/>
                :
                <Fade in style={{transitionDelay:"500ms"}}><div><FilesUpload demoData={demoData}/></div></Fade>
            }
        </>
    )
}

export default MainPage
