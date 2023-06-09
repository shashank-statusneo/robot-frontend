import { Container, Grid, InputAdornment } from '@mui/material';
import {useState} from 'react'
import { PrimaryButton } from '../../components/Buttons';
import { FormLabel, FormTextField } from '../../components/FormElements';
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux-hooks';
import { updatePercentageAbsentExpected, updateNumCurrentEmployees, updateTotalHiringBudget, updateCostPerEmployeePerMonth, updateDayWorkingHours } from '../../redux/actions/warehouse';

import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme();

const WarehouseRequirement = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const Form = () => {

        const [percentAbsentees, setPercentAbsentees] = useState('')
        const [currentEmployees, setCurrentEmployees] = useState('')
        const [hiringBudget, setHiringBudget] = useState('')
        const [costPerEmployee, setCostPerEmployee] = useState('')
        const [workingHours, setWorkingHours] = useState('')

        const handleStateUpdate = () => {
            // @ts-ignore
            dispatch(updatePercentageAbsentExpected(percentAbsentees))
             // @ts-ignore
            dispatch(updateNumCurrentEmployees(currentEmployees))
             // @ts-ignore
            dispatch(updateTotalHiringBudget(hiringBudget))
             // @ts-ignore
            dispatch(updateCostPerEmployeePerMonth(costPerEmployee))
             // @ts-ignore
            dispatch(updateDayWorkingHours(workingHours))
        } 

        return (
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
                            value={percentAbsentees}
                            type='number'
                            onChange={(e: any) => setPercentAbsentees(e.target.value)}
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
                            value={currentEmployees}
                            type='number'
                            onChange={(e: any) => setCurrentEmployees(e.target.value)}
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
                            value={hiringBudget}
                            type='number'
                            onChange={(e: any) => setHiringBudget(e.target.value)}
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
                            value={costPerEmployee}
                            type='number'
                            onChange={(e: any) => setCostPerEmployee(e.target.value)}
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
                            value={workingHours}
                            type='number'
                            onChange={(e: any) => setWorkingHours(e.target.value)}
                            inputProps={{}}
                        />
                    </Grid>
                </Grid>

                <Grid container item justifyContent='space-between' alignItems='center' sx={{marginTop: '200px'}}>
                    <Grid item>
                        <PrimaryButton 
                            id='navigation-btn-previous'
                            label='< Previous'
                            onClick={handleStateUpdate}
                            // onClick={() => navigate('/warehouse/productivity')}
                            disabled={false}
                        />
                    </Grid>
                    <Grid item>
                        <PrimaryButton 
                            id='navigation-btn-next'
                            label='Next >'
                            onClick={(e: any) => {console.log(e)}}
                            // onClick={() => navigate('/warehouse/productivity')}
                            disabled={false}
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

export default WarehouseRequirement