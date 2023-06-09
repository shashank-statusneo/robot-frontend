import React, { useState, useEffect, useRef, MutableRefObject } from 'react'

import { Container, Grid, Typography } from '@mui/material';

import { PrimaryButton, FormUploadButton } from '../../components/Buttons';
import { FormLabel } from '../../components/FormElements';
import { FormTable, FormDataGrid } from '../../components/Table';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom'
import { uploadProductivityFile, getBenchmarkProductivityData, putBenchmarkProductivityData } from '../../redux/actions/warehouse';
import { GridRowModel } from '@mui/x-data-grid'

import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme();

import { benchmarkProductivityTableColumns } from './constants';


const BenchmarkProductivity = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // @ts-ignore
    const warehouseState = useAppSelector(state => state.warehouseReducer)

    const Form = () => {

        const benchmarkProductivityFile = useRef() as MutableRefObject<HTMLInputElement>;

        const [updatedTableData]: any = useState([])

        const [updateRequestPayload]: any = useState([])

        const editableCols = [
            'productivity_experienced_employee',
            'productivity_new_employee'
        ]

        const [flagTableDataUpdated, setFlagTableDataUpdated] = useState(false)

        const processDataChange = (newRow: GridRowModel) => {
            const updatedRow = {...newRow}
            const selectedRow = warehouseState.productivity_table_data.find((row: any) => row.id === updatedRow.id)

            if (JSON.stringify(selectedRow) !== JSON.stringify(updatedRow)) {
          
                const requestPayload: any = {
                    id: selectedRow.id
                }
                
                for (const col in editableCols){
                    if (selectedRow[editableCols[col]] != updatedRow[editableCols[col]]){
                        requestPayload[editableCols[col]] = updatedRow[editableCols[col]]
                    }
                }

                updateRequestPayload.some((payload: any) => payload.id === requestPayload.id) 
                    ? updateRequestPayload.map((obj: any) => {
                        if(obj.id === requestPayload.id){
                            obj = Object.assign(obj, requestPayload);
                        }
                    })
                    : updateRequestPayload.push(requestPayload)

                updatedTableData.some((payload: any) => payload.id === newRow.id )
                    ? updatedTableData.map((obj: any) => {
                    if(obj.id === newRow.id){
                        obj = Object.assign(obj, newRow);
                    }
                    })
                    : updatedTableData.push(newRow)
                
                setFlagTableDataUpdated(true)
            }        
            return updatedRow
        };

        const handleClickSave = () => {
            const tableData = JSON.parse(JSON.stringify(warehouseState.productivity_table_data))
            updatedTableData.map((newObj: any, index: any) => {
                const oldObjIndex = tableData.findIndex((oldObj: any) => oldObj.id === newObj.id)
                tableData[oldObjIndex] = { ...newObj }
            })
            // @ts-ignore
            dispatch(putBenchmarkProductivityData({'productivity': updateRequestPayload}, tableData))
        }

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
                    
                    {warehouseState.productivity_table_data && (
                        <FormDataGrid 
                            columns={benchmarkProductivityTableColumns}
                            rows={warehouseState.productivity_table_data}
                            processDataChange={processDataChange}
                        />
                    )}
                </Grid>

                <Grid container item justifyContent='center' alignContent='center' alignItems='center' sx={{marginTop: '50px'}}>
                    {flagTableDataUpdated && (
                        <PrimaryButton 
                            id='save-benchmark-productivity-table-btn'
                            label='Save Data'
                            onClick={() => {handleClickSave()}}
                            disabled={false}
                        />
                    )}
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