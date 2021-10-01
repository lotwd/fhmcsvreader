import React from 'react';
import { CssBaseline } from '@material-ui/core'
import Layout from './src/components/layout/layout'
import DataManager from './src/components/dataManager/dataManager'

export const wrapRootElement = ({ element }) => (
    <>
        <DataManager> 
            <Layout>
                <CssBaseline/>
                {element}
            </Layout>
        </DataManager> 
    </>
  );