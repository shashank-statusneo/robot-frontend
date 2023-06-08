import { Container, Grid, InputAdornment } from '@mui/material';

import { PrimaryButton } from '../../components/Buttons';
import { FormLabel, FormTextField } from '../../components/FormElements';
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme();

const WarehouseRequirement = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // @ts-ignore
    const warehouseState = useAppSelector(state => state.warehouseReducer)

    const Form = () => {

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
                            id=''
                            value=''
                            type='number'
                            onChange={(e: any) => {console.log(e)}}
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
                            id=''
                            value=''
                            type='number'
                            onChange={(e: any) => {console.log(e)}}
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
                            id=''
                            value=''
                            type='number'
                            onChange={(e: any) => {console.log(e)}}
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
                            id=''
                            value=''
                            type='number'
                            onChange={(e: any) => {console.log(e)}}
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
                            id=''
                            value=''
                            type='number'
                            onChange={(e: any) => {console.log(e)}}
                            inputProps={{}}
                        />
                    </Grid>
                </Grid>

                <Grid container item justifyContent='space-between' alignItems='center' sx={{marginTop: '200px'}}>
                    <Grid item>
                        <PrimaryButton 
                            id='navigation-btn-previous'
                            label='< Previous'
                            onClick={(e: any) => {console.log(e)}}
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