import React, { useState, useEffect, useRef, MutableRefObject } from 'react'

import { Container, Grid, Typography } from '@mui/material';

import { PrimaryButton, FormUploadButton } from '../../components/Buttons';
import { FormLabel } from '../../components/FormElements';
import { FormTable, FormDataGrid } from '../../components/Table';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom'
import { uploadProductivityFile, getBenchmarkProductivityData } from '../../redux/actions/warehouse';

import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme();

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { benchmarkProductivityTableColumns } from './constants';


const BenchmarkProductivity = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // @ts-ignore
    const warehouseState = useAppSelector(state => state.warehouseReducer)

    const Form = () => {

        const benchmarkProductivityFile = useRef() as MutableRefObject<HTMLInputElement>;

        const benchmarkProductivityTableHeaders = [
            'Category',
            'Productivity - Experienced Employee',
            'Productivity - New Employee'
        ]

        const handleChange = (event: any) => {
            event.preventDefault();
            const fileObj = event.target.files && event.target.files[0];
            if (fileObj) {
                
                const context = {
                    file: fileObj
                }
                // @ts-ignore
                dispatch(uploadProductivityFile(context, warehouseState.planning_warehouse?.id, fileObj.name))
                // @ts-ignore
                dispatch(getBenchmarkProductivityData(warehouseState.planning_warehouse?.id))
            }
        }

        const tableData = [
            {   
                id: 1,
                category_name: 'Category 1',
                productivity_experienced_employee: 100,
                productivity_new_employee: 70
            },
            {
                id: 2,
                category_name: 'Category 2',
                productivity_experienced_employee: 200,
                productivity_new_employee: 80
            },
            {
                id: 3,
                category_name: 'Category 3',
                productivity_experienced_employee: 300,
                productivity_new_employee: 90
            },
        ]

        const columns = [
            { field: 'id', headerName: 'ID', width: 90 },
            {
              field: 'firstName',
              headerName: 'First name',
              width: 150,
              editable: true,
            },
            {
              field: 'lastName',
              headerName: 'Last name',
              width: 150,
              editable: true,
            },
            {
              field: 'age',
              headerName: 'Age',
              type: 'number',
              width: 110,
              editable: true,
            },
            {
              field: 'fullName',
              headerName: 'Full name',
              description: 'This column has a value getter and is not sortable.',
              sortable: false,
              width: 160,
              valueGetter: (params: GridValueGetterParams) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
            },
          ];
          
          const rows = [
            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
            { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
            { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
            { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
            { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
            { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
            { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
          ];

        return (
            <Grid container direction='column' spacing={2} sx={{marginTop: '20px'}}>
                <Grid container item justifyContent='flex-start' alignContent='center' alignItems='center'>
                    <Grid item lg={8}>
                        <FormLabel 
                            label='Upload benchmark productivity file (only .xls and .xlsx files supported)'
                        />
                    </Grid>
                    <Grid item lg={2}>
                        <FormUploadButton 
                            id='benchmark-productivity-upload-btn' 
                            label='CHOOSE FILE'
                            fileRef={benchmarkProductivityFile}
                            loader={false}
                            onChange={handleChange}
                            disabled={false}
                        />
                    </Grid>
                    <Grid item lg={2}>
                        <Typography>{warehouseState.productivity_file_name}</Typography>
                    </Grid>
                </Grid>

                <Grid container item justifyContent='flex-start' alignContent='center' alignItems='center' sx={{marginTop: '50px'}}>
                    {/* <FormTable 
                        id='benchmark-productivity-table'
                        tableName='benchmark-productivity-table'
                        tableHeaders={benchmarkProductivityTableHeaders}
                        tableKeys={['category_name', 'productivity_experienced_employee', 'productivity_new_employee']}
                        tableData={tableData}
                    /> */}
                    <FormDataGrid 
                        columns={benchmarkProductivityTableColumns}
                        rows={tableData}
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
                            onClick={() => console.log(warehouseState)}
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