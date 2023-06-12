import {useEffect, useState} from 'react'

import { Container, Grid } from '@mui/material';

import { PrimaryButton } from '../../components/Buttons';
import { FormDropDown, FormLabel, FormDateSelector } from '../../components/FormElements';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getWarehouse, updatePlanningWarehouse, updatePlanningStartDate, updatePlanningEndDate } from '../../redux/actions/warehouse'


import { useNavigate } from 'react-router-dom'


import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme();

const WarehouseSelect = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [selectedWarehouse, setSelectedWarehouse] = useState(null)

    const fetchData = () => {
        // @ts-ignore
        dispatch(getWarehouse())
    }

    // @ts-ignore
    const warehouseState = useAppSelector(state => state.warehouseReducer)
 
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        warehouseState?.warehouses ? setSelectedWarehouse(warehouseState?.warehouses[0]) : setSelectedWarehouse(null)
        // @ts-ignore
        warehouseState?.warehouses ? dispatch(updatePlanningWarehouse(warehouseState?.warehouses[0])) : null
    }, [warehouseState.warehouses])

    const Form = () => {

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
                            label=''
                            value={selectedWarehouse}
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
                        />
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (

        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed >
                <Form />
            </Container>
        </ThemeProvider>
    )
}

export default WarehouseSelect