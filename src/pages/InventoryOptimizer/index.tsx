import React, { useState } from 'react';
import { Typography, Tabs, Tab, Container } from '@mui/material';
import { TabContext } from '@mui/lab';
import OptimizerContainer from './Optimizer';
import OptimizerResultContainer from './OptimizerResult';

const InventoryOptimizer = () => {
    const [currentTab, setCurrentTab] = useState('optimizer')

    const AppHeader = () => {
        return (
            <Typography variant="h3" component="h3" align="center">
                INVENTORY OPTIMIZER
            </Typography>
        )
    }

    const FormData = () => {
        switch (currentTab) {
            case 'optimizer':
                return <OptimizerContainer />
            case 'optimizerResult':
                return <OptimizerResultContainer />
            default:
                return <></>
        }
    }

    const AppTabs = () => {
        return (
            <TabContext value={currentTab}>
                <Tabs
                    centered
                    selectionFollowsFocus
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="Optimizer Tabs"
                    value={currentTab}
                    onChange={(_, value) => {
                        setCurrentTab(value)
                    }}
                >
                    <Tab label="Optimizer" value="optimizer" />
                    <Tab label="Optimizer Result" value="optimizerResult" />
                    <Tab label="Simulator" value="simulator" />
                </Tabs>
            </TabContext>
        )
    }

    return (
        <Container>
            <AppHeader />
            <Container>
                <AppTabs />
                <FormData />
            </Container>
        </Container>
    )
}

export default InventoryOptimizer;
