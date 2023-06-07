import { Container, Grid } from '@mui/material';

import { PrimaryButton } from '../../components/Buttons';
import { FormDropDown, FormLabel, FormDateSelector } from '../../components/FormElements';
import { useNavigate } from 'react-router-dom'


import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme();

const WarehouseSelect = () => {

    const navigate = useNavigate()

    const Form = () => {

        const data = ['a', 'b']

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
                            value={data[0]}
                            data={data}
                            onChange={(e: any) => {console.log(e)}}
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
                            value=''
                            onChange={(e: any) => {console.log(e)}}
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
                            value=''
                            onChange={(e: any) => {console.log(e)}}
                        />
                    </Grid>
                </Grid>

                <Grid container item justifyContent='flex-end' sx={{marginTop: '200px'}}>
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

export default WarehouseSelect