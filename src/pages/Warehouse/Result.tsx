import { Container, Grid } from '@mui/material';

import { PrimaryButton } from '../../components/Buttons';
import { FormDropDown, FormLabel, FormDateSelector, FormCardField } from '../../components/FormElements';
import { useNavigate } from 'react-router-dom'


import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme();

const Result = () => {

    const navigate = useNavigate()

    const Form = () => {

        const data = ['a', 'b']

        const cardItems = [
            {
                value: 15,
                label: 'Num employees to be hired'
            },
            {
                value: '91%',
                label: 'Project fulfillment'
            },
            {
                value: '₹ 2,25,000',
                label: 'Project total expenditure'
            }
        ]

        return (
            <Grid container direction='column' spacing={8} sx={{marginTop: '100px'}}>
                <Grid container item justifyContent='center' alignContent='center' alignItems='center'>
                    <Grid item>
                        <FormLabel 
                            label='MANPOWER HIRING & DEPLOYMENT PLAN'
                        />
                    </Grid>
                </Grid>

                <Grid container item justifyContent='center' alignContent='center' alignItems='center'>

                    <Grid container item lg={4} direction='row' justifyContent='center' alignContent='center' alignItems='center'>
                        <Grid item lg={3}>
                            <FormLabel 
                                label='Start Date'
                            />
                        </Grid>
                        <Grid item lg={8}>
                            <FormDateSelector 
                                label=''
                                value=''
                                onChange={(e: any) => {console.log(e)}}
                            />
                        </Grid>
                    </Grid>

                    <Grid container item lg={4} direction='row' justifyContent='center' alignContent='center' alignItems='center'>
                        <Grid item lg={3}>
                            <FormLabel 
                                label='End Date'
                            />
                        </Grid>
                        <Grid item lg={8}>
                            <FormDateSelector 
                                label=''
                                value=''
                                onChange={(e: any) => {console.log(e)}}
                            />
                        </Grid>
                    </Grid>

                    <Grid container item lg={4} direction='row' justifyContent='center' alignContent='center' alignItems='center'>
                        <Grid item lg={3}>
                            <FormLabel 
                                label='Category'
                            />
                        </Grid>
                        <Grid item lg={8}>
                            <FormDropDown 
                                id='select-category-dropdown'
                                label=''
                                value={data[0]}
                                data={data}
                                onChange={(e: any) => {console.log(e)}}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container item lg={12} direction='row' justifyContent='center' alignContent='center' alignItems='center'>
                    <FormCardField 
                        items={cardItems}
                    />
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

export default Result