import React, {useContext} from 'react'
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
                <FilesUpload demoData={demoData}/>
            }
        </>
    )
}

export default MainPage
