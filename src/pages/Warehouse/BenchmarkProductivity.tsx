import React, { useState, useRef, MutableRefObject } from 'react'

import { Container, Grid } from '@mui/material';

import { PrimaryButton, FormUploadButton } from '../../components/Buttons';
import { FormLabel } from '../../components/FormElements';
import { FormTable } from '../../components/Table';

import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme();


const BenchmarkProductivity = () => {

    const Form = () => {

        const benchmarkProductivityFile = useRef() as MutableRefObject<HTMLInputElement>;

        const benchmarkProductivityTableHeaders = [
            'Category',
            'Productivity - Experienced Employee',
            'Productivity - New Employee'
        ]

        const handleChange = (event: any) => {
           console.log(event)
        }

        const tableData = [
            {
                category_name: 'Category 1',
                productivity_experienced_employee: 100,
                productivity_new_employee: 70
            },
            {
                category_name: 'Category 2',
                productivity_experienced_employee: 200,
                productivity_new_employee: 80
            },
            {
                category_name: 'Category 3',
                productivity_experienced_employee: 300,
                productivity_new_employee: 90
            },
        ]

        return (
            <Grid container direction='column' spacing={2} sx={{marginTop: '20px'}}>
                <Grid container item justifyContent='flex-start' alignContent='center' alignItems='center'>
                    <Grid item lg={8}>
                        <FormLabel 
                            label='Upload benchmark productivity file (only .xls and .xlsx files supported)'
                        />
                    </Grid>
                    <Grid item lg={4}>
                        <FormUploadButton 
                            id='benchmark-productivity-upload-btn' 
                            label='CHOOSE FILE'
                            fileRef={benchmarkProductivityFile}
                            loader={false}
                            onChange={handleChange}
                            disabled={false}
                        />
                    </Grid>
                </Grid>

                <Grid container item justifyContent='flex-start' alignContent='center' alignItems='center' sx={{marginTop: '50px'}}>
                    <FormTable 
                        id='benchmark-productivity-table'
                        tableName='benchmark-productivity-table'
                        tableHeaders={benchmarkProductivityTableHeaders}
                        tableKeys={['category_name', 'productivity_experienced_employee', 'productivity_new_employee']}
                        tableData={tableData}
                    />
                </Grid>

                <Grid container item justifyContent='center' alignContent='center' alignItems='center' sx={{marginTop: '50px'}}>
                    <PrimaryButton 
                                id='save-benchmark-productivity-table-btn'
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

export default BenchmarkProductivity