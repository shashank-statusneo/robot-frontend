import {useEffect, useState} from 'react'

import { Container, Grid } from '@mui/material';

import { PrimaryButton, NavigationBtn} from '../../components/Buttons';
import { FormDropDown, FormLabel, FormDateSelector } from '../../components/FormElements';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getWarehouse, updatePlanningWarehouse, updatePlanningStartDate, updatePlanningEndDate } from '../../redux/actions/warehouse'

import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom'


import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme();

const WarehouseSelect = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [selectedWarehouse, setSelectedWarehouse] = useState(null)

    // @ts-ignore
    const warehouseState = useAppSelector(state => state.warehouseReducer)

    const fetchData = () => {
        // @ts-ignore
        dispatch(getWarehouse())
    }

    useEffect(() => {
        if (!warehouseState.planning_warehouse){
            fetchData()
        }
    }, [])

    useEffect(() => {
        if (warehouseState?.warehouses){
            let warehouseToBeUpdated = null
            if (warehouseState.planning_warehouse){
                warehouseToBeUpdated = warehouseState.planning_warehouse
            } else if(!warehouseState.planning_warehouse && warehouseState?.warehouses[0]){
                warehouseToBeUpdated = warehouseState?.warehouses[0]
            }
            setSelectedWarehouse(warehouseToBeUpdated)
            // @ts-ignore
            dispatch(updatePlanningWarehouse(warehouseToBeUpdated))
        }
    }, [warehouseState.warehouses])

    const handleWarehouseChange = (e: any) => {
        setSelectedWarehouse(warehouseState.warehouses.find((obj: any) => {return obj.id === e.target.value}))
        // @ts-ignore
        dispatch(updatePlanningWarehouse(warehouseState.warehouses.find((obj: any) => {return obj.id === e.target.value})))
    }
    const handleWarehouseStartDateChange = (date: any) => {
        // @ts-ignore
        dispatch(updatePlanningStartDate(date))
    }
    const handleWarehouseEndDateChange = (date: any) => {
        // @ts-ignore
        dispatch(updatePlanningEndDate(date))
    }

    return (

        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed >
            <Grid container direction='column' spacing={2} sx={{marginTop: '100px'}}>
                <Grid container item justifyContent='center' alignContent='center' alignItems='center'>
                    <Grid item lg={4}>
                        <FormLabel 
                            label='Select Warehouse'
                        />
                    </Grid>
                    <Grid item lg={4}>
                        <FormDropDown 
                            id='select-warehouse-dropdown'
                            labelId='select-warehouse-dropdown-input-label'
                            label=''
                            value={warehouseState.planning_warehouse ? warehouseState.planning_warehouse : selectedWarehouse}
                            data={warehouseState?.warehouses ? warehouseState?.warehouses : []}
                            onChange={handleWarehouseChange}
                        />
                    </Grid>
                </Grid>

                <Grid container item justifyContent='center' alignContent='center' alignItems='center'>
                    <Grid item lg={8}>
                        <FormLabel 
                            label='Specify planning horizon'
                        />
                    </Grid>
                </Grid>

                <Grid container item justifyContent='center' alignContent='center' alignItems='center'>
                    <Grid item lg={3}>
                        <FormLabel 
                            label='Start Date'
                        />
                    </Grid>
                    <Grid item lg={3}>
                        <FormDateSelector 
                            label=''
                            value={warehouseState.planning_start_date}
                            onChange={handleWarehouseStartDateChange}
                            minDate={dayjs()}
                        />
                    </Grid>
                </Grid>

                <Grid container item justifyContent='center' alignContent='center' alignItems='center'>
                    <Grid item lg={3}>
                        <FormLabel 
                            label='End Date'
                        />
                    </Grid>
                    <Grid item lg={3}>
                        <FormDateSelector 
                            label=''
                            value={warehouseState.planning_end_date}
                            onChange={handleWarehouseEndDateChange}
                            minDate={warehouseState.planning_start_date >= dayjs() ? warehouseState.planning_start_date: dayjs()}
                        />
                    </Grid>
                </Grid>
            </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default WarehouseSelect