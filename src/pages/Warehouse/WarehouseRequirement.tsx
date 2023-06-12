import { Container, Grid, InputAdornment } from '@mui/material';
import { FormLabel, FormTextField } from '../../components/FormElements';
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { updatePercentageAbsentExpected, updateNumCurrentEmployees, updateTotalHiringBudget, updateCostPerEmployeePerMonth, updateDayWorkingHours } from '../../redux/actions/warehouse';

import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme();

const WarehouseRequirement = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // @ts-ignore
    const warehouseState = useAppSelector(state => state.warehouseReducer)

    return (

        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed >
            <Grid container direction='column' spacing={2} sx={{marginTop: '100px'}}>
                <Grid container item justifyContent='center' alignContent='center' alignItems='center'>
                    <Grid item lg={8}>
                        <FormLabel 
                            label='Enter other requirements'
                        />
                    </Grid>
                </Grid>

                <Grid container item justifyContent='center' alignContent='center' alignItems='center' spacing={2}>
                    <Grid item lg={4}>
                        <FormLabel 
                            label='% of absentees expected'
                        />
                    </Grid>
                    <Grid item lg={3}>
                        <FormTextField 
                            id='percent-absentees-textfield'
                            value={warehouseState.percentage_absent_expected}
                            type='number'
                            onChange={(e: any) => {
                                // @ts-ignore
                                dispatch(updatePercentageAbsentExpected(e.target.value))
                            }}
                            inputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                        />
                    </Grid>
                </Grid>

                <Grid container item justifyContent='center' alignContent='center' alignItems='center' spacing={2}>
                    <Grid item lg={4}>
                        <FormLabel 
                            label='Number of current employees'
                        />
                    </Grid>
                    <Grid item lg={3}>
                        <FormTextField 
                            id='current-employees-textfield'
                            value={warehouseState.num_current_employees}
                            type='number'
                            onChange={(e: any) => {
                                // @ts-ignore
                                dispatch(updateNumCurrentEmployees(e.target.value))
                            }}
                            inputProps={{}}
                        />
                    </Grid>
                </Grid>

                <Grid container item justifyContent='center' alignContent='center' alignItems='center' spacing={2}>
                    <Grid item lg={4}>
                        <FormLabel 
                            label='Total hiring budget'
                        />
                    </Grid>
                    <Grid item lg={3}>
                        <FormTextField 
                            id='hiring-budget-textfield'
                            value={warehouseState.total_hiring_budget}
                            type='number'
                            onChange={(e: any) => {
                                // @ts-ignore
                                dispatch(updateTotalHiringBudget(e.target.value))
                            }}
                            inputProps={{
                                endAdornment: <InputAdornment position="end">₹</InputAdornment>,
                            }}
                        />
                    </Grid>
                </Grid>

                <Grid container item justifyContent='center' alignContent='center' alignItems='center' spacing={2}>
                    <Grid item lg={4}>
                        <FormLabel 
                            label='Monthly cost per employee'
                        />
                    </Grid>
                    <Grid item lg={3}>
                        <FormTextField 
                            id='cost-per-employee-textfield'
                            value={warehouseState.cost_per_employee_per_month}
                            type='number'
                            onChange={(e: any) => {
                                // @ts-ignore
                                dispatch(updateCostPerEmployeePerMonth(e.target.value))
                            }}
                            inputProps={{
                                endAdornment: <InputAdornment position="end">₹</InputAdornment>,
                            }}
                        />
                    </Grid>
                </Grid>

                <Grid container item justifyContent='center' alignContent='center' alignItems='center' spacing={2}>
                    <Grid item lg={4}>
                        <FormLabel 
                            label='Working hours'
                        />
                    </Grid>
                    <Grid item lg={3}>
                        <FormTextField 
                            id='working-hours-textfield'
                            value={warehouseState.day_working_hours}
                            type='number' 
                            onChange={(e: any) =>{
                                // @ts-ignore
                                dispatch(updateDayWorkingHours(e.target.value))
                            }}
                            inputProps={{}}
                        />
                    </Grid>
                </Grid>
            </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default WarehouseRequirement