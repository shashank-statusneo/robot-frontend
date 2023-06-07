import React, { useState } from 'react';
import { Typography, Tabs, Tab, Container, Grid } from '@mui/material';
import { TabContext } from '@mui/lab';
import OptimizerContainer from './Optimizer';
import OptimizerResultContainer from './OptimizerResult';
import SimulatorContainer from './Simulator';

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
            case 'simulator': 
                return <SimulatorContainer/>
            default:
                return <></>
        }
    }

    const AppTabs = () => {
        return (
            <TabContext value={currentTab}>
                <Tabs
                    centered
                    style={{marginBottom: '10px'}}
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
        <Container maxWidth="xl">
                <Grid container>
                    <Grid item lg={2} md={2} sm={2} bgcolor='#D0E8FD'>
                        <Typography variant='h6'>INVENTORY OPTIMIZER</Typography>
                    </Grid>
                    <Grid item lg={10} md={10} sm={10} style={{borderStyle: 'solid', borderWidth: '0.2px', padding: '5px'}}>
                        <AppTabs />
                        <FormData />
                    </Grid>
                </Grid>
              
        </Container>
    )
}

export default InventoryOptimizer;
