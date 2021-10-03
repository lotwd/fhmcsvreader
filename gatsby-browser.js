import React from 'react';
import Layout from './src/components/layout/layout'
import DataManager from './src/components/dataManager/dataManager'

export const wrapRootElement = ({ element }) => (
    <Layout>
        <DataManager> 
            {element}
        </DataManager> 
    </Layout>
  );