import React, { useState, useRef, MutableRefObject } from 'react'

import { Container, Grid } from '@mui/material';

import { PrimaryButton, FormUploadButton } from '../../components/Buttons';
import { FormLabel } from '../../components/FormElements';
import { FormTable } from '../../components/Table';

import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme();


const DemandForecast = () => {

    const Form = () => {

        const demandForecastFile = useRef() as MutableRefObject<HTMLInputElement>;

        const demandForecastTableHeaders = [
            'Date',
            'Category 1',
            'Category 2',
            'Category 3',
            'Category 4',
            'Category 5',
        ]

        const handleChange = (event: any) => {
           console.log(event)
        }

        const tableData = [
            {
                date: '2023-06-01',
                category_1: 1000,
                category_2: 800,
                category_3: 700,
                category_4: 800,
                category_5: 250,
            },
            {
                date: '2023-06-02',
                category_1: 1200,
                category_2: 900,
                category_3: 800,
                category_4: 900,
                category_5: 400,
            },
            {
                date: '2023-06-03',
                category_1: 1300,
                category_2: 1000,
                category_3: 900,
                category_4: 500,
                category_5: 450,
            },
            {
                date: '2023-06-04',
                category_1: 1400,
                category_2: 1100,
                category_3: 900,
                category_4: 500,
                category_5: 475,
            },
           
        ]

        return (
            <Grid container direction='column' spacing={2} sx={{marginTop: '20px'}}>
                <Grid container item justifyContent='flex-start' alignContent='center' alignItems='center'>
                    <Grid item lg={8}>
                        <FormLabel 
                            label='Upload demand forecast file (only .xls and .xlsx files supported)'
                        />
                    </Grid>
                    <Grid item lg={4}>
                        <FormUploadButton 
                            id='demand-forecast-upload-btn' 
                            label='CHOOSE FILE'
                            fileRef={demandForecastFile}
                            loader={false}
                            onChange={handleChange}
                            disabled={false}
                        />
                    </Grid>
                </Grid>

                <Grid container item justifyContent='flex-start' alignContent='center' alignItems='center' sx={{marginTop: '50px'}}>
                    <FormTable 
                        id='demand-forecast-table'
                        tableName='demand-forecast-table'
                        tableHeaders={demandForecastTableHeaders}
                        tableKeys={['date', 'category_1', 'category_2', 'category_3', 'category_4', 'category_5']}
                        tableData={tableData}
                    />
                </Grid>

                <Grid container item justifyContent='center' alignContent='center' alignItems='center' sx={{marginTop: '50px'}}>
                    <PrimaryButton 
                                id='save-demand-forecast-table-btn'
                                label='Save Data'
                                onClick={(e: any) => {console.log(e)}}
                                disabled={false}
                    />
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

export default DemandForecast