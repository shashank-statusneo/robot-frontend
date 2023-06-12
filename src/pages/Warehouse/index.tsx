import React, {useState} from 'react'
import { Typography, Tabs, Tab, Container, Grid, Stepper, Step, StepLabel } from '@mui/material';
import WarehouseSelect from './WarehouseSelect';
import WarehouseRequirement from './WarehouseRequirement';
import BenchmarkProductivity from './BenchmarkProductivity';
import DemandForecast from './DemandForecast';
import Result from './Result';
import { NavigationBtn, PrimaryButton } from '../../components/Buttons';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import dayjs from 'dayjs'

const WareHouse = () => {

    // @ts-ignore
    const warehouseState = useAppSelector(state => state.warehouseReducer)

    const Screens = [
        {
            element: <WarehouseSelect/>,
            complete: warehouseState?.planning_warehouse 
                        && dayjs(warehouseState.planning_start_date).format('YYYY-MM-DD') !== 'Invalid Date'
                        && dayjs(warehouseState.planning_end_date).format('YYYY-MM-DD') !== 'Invalid Date'
                        ? true
                        : false
        },
        {
            element: <BenchmarkProductivity/>,
            complete: warehouseState?.productivity_table_data
                        ? true
                        : false
        },
        {
            element: <DemandForecast/>,
            complete: warehouseState?.demand_table_data
                        ? true
                        : false
        },
        {
            element: <WarehouseRequirement/>,
            complete: warehouseState?.percentage_absent_expected
                        && warehouseState?.num_current_employees
                        && warehouseState?.total_hiring_budget
                        && warehouseState?.cost_per_employee_per_month
                        && warehouseState?.day_working_hours
                        ? true
                        : false
        },
        {
            element: <Result/>,
        },
    ]
    

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Container maxWidth="xl">
            <Grid container>
                <Grid item lg={2} md={2} sm={2} bgcolor='#D0E8FD'>
                    {/* <Typography variant='h6'>WAREHOUSE</Typography> */}
                    {/* <PrimaryButton 
                        id='log-btn'
                        label='Log Warehouse Redux State'
                        onClick={() => {console.log(warehouseState)}}
                        disabled={false}
                    /> */}
                </Grid>
                <Grid item lg={10} md={10} sm={10} style={{borderStyle: 'solid', borderWidth: '0.2px', padding: '5px'}}>
                    <Grid item>
                        {Screens[activeStep].element}
                    </Grid>

                    <Grid container item justifyContent='space-between' alignItems='center' sx={{marginTop: '150px'}}>
                        <Grid item>
                            <NavigationBtn 
                                id='navigation-btn-previous'
                                label='< Previous'
                                onClick={handleBack}
                                disabled={false}
                                render={activeStep !== 0}
                            />
                        </Grid>
                        <Grid item>
                            <NavigationBtn 
                                id='navigation-btn-next'
                                label='Next >'
                                onClick={handleNext}
                                // @ts-ignore
                                disabled={!Screens[activeStep].complete}
                                render={activeStep !== Screens.length-1}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> 
        </Container>
    )
}

export default WareHouse