import React, { useState } from 'react'
import { Typography, Tabs, Tab, Container, Grid } from '@mui/material'
import { TabContext } from '@mui/lab'
import Optimizer from './Optimizer'
import OptimizerResultContainer from './OptimizerResult'
import SimulatorContainer from './Simulator'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import WarehouseRequirement from '../Warehouse/Requirement'

import { useAppSelector } from '../../hooks/redux-hooks'

const InventoryOptimizer = () => {
    const [currentTab, setCurrentTab] = useState('optimizer')


    return (
        <Container maxWidth='xl'>
            <Grid container>
                <Grid item lg={2} md={2} sm={2} bgcolor='#D0E8FD'></Grid>
                <Grid
                    item
                    lg={10}
                    md={10}
                    sm={10}
                    style={{
                        borderStyle: 'solid',
                        borderWidth: '0.2px',
                        padding: '5px',
                    }}
                >
                    <Container maxWidth='xl'>
                        <TabContext value={currentTab}>
                            <Tabs
                                centered
                                style={{ marginBottom: '10px' }}
                                selectionFollowsFocus
                                textColor='secondary'
                                indicatorColor='secondary'
                                aria-label='Optimizer Tabs'
                                value={currentTab}
                                onChange={(_, value) => {
                                    setCurrentTab(value)
                                }}
                            >
                                <Tab label='Optimizer' value='optimizer' />
                                <Tab
                                    label='Optimizer Result'
                                    value='optimizerResult'
                                />
                                <Tab label='Simulator' value='simulator' />
                            </Tabs>
                        </TabContext>
                    </Container>
                    {currentTab === 'optimizer' && <Optimizer />}
                </Grid>
            </Grid>
        </Container>
    )
}

export default InventoryOptimizer
