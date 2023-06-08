import React, { useState, useRef, MutableRefObject } from 'react'

import { Container, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'


import { uploadDemandFile, getDemandForecastData, updateDemandTableData } from '../../redux/actions/warehouse';



import { PrimaryButton, FormUploadButton } from '../../components/Buttons';
import { FormLabel } from '../../components/FormElements';
import { FormTable, FormDataGrid } from '../../components/Table';
import { GridRowModel } from '@mui/x-data-grid'
import { demandForecastTableColumns } from './constants';


import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme();


const DemandForecast = () => {

    
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // @ts-ignore
    const warehouseState = useAppSelector(state => state.warehouseReducer)

    const Form = () => {

        const demandForecastFile = useRef() as MutableRefObject<HTMLInputElement>;

        const [updatedTableData]: any = useState([])

        const [flagTableDataUpdated, setFlagTableDataUpdated] = useState(false)

        const processDataChange = (newRow: GridRowModel) => {
            const updatedRow = {...newRow}
            const selectedRow = warehouseState.demand_table_data.find((row: any) => row.id === updatedRow.id)

            if (JSON.stringify(selectedRow) !== JSON.stringify(updatedRow)) {
                setFlagTableDataUpdated(true)
                updatedTableData.push(updatedRow)
            }        
            return updatedRow
        };

        const handleClickSave = () => {
            const tableData = JSON.parse(JSON.stringify(warehouseState.demand_table_data))
            updatedTableData.map((newObj: any, index: any) => {
                const oldObjIndex = tableData.findIndex((oldObj: any) => oldObj.id === newObj.id)
                tableData[oldObjIndex] = { ...newObj }
            })
            // @ts-ignore
            dispatch(updateDemandTableData(tableData))
        }

        const handleChange = (event: any) => {
            event.preventDefault();
            const fileObj = event.target.files && event.target.files[0];
            if (fileObj) {
                
                const context = {
                    start_date: '2023-05-24',
                    // start_date: dayjs(warehouseState.planning_start_date).format('YYYY-MM-DD'),
                    end_date: '2023-05-31',
                    // end_date: dayjs(warehouseState.planning_end_date).format('YYYY-MM-DD'),

                }
                // @ts-ignore
                dispatch(uploadDemandFile({...context, file: fileObj }, warehouseState.planning_warehouse?.id, fileObj.name))
                // @ts-ignore
                dispatch(getDemandForecastData(context, warehouseState.planning_warehouse?.id))

                // const records: any = []
                // const demandForecastCols: any = []
                // // set demand_forecast table columns
                // // demandForecastTableColumns
                // if (warehouseState.demand_table_data){
                //     Object.keys(warehouseState.demand_table_data).forEach((key, index) => {
                //         Object.keys(warehouseState.demand_table_data[key]).forEach((key_x, index_x) => {
                //             const newRecord = {
                //                 date: key,
                //                 category_name: key_x,
                //                 ...warehouseState.demand_table_data[key][key_x]
                //             }
                //             records.push(newRecord)
                //             // demandForecastCols.push(key_x)
                //         })
                //     })
                // }
                // console.log(records)
                // // console.log(demandForecastCols)
            }
        }

        return (
            <Grid container direction='column' spacing={2} sx={{marginTop: '20px'}}>
                <Grid container item justifyContent='flex-start' alignContent='center' alignItems='center'>
                    <Grid item lg={8}>
                        <FormLabel 
                            label='Upload demand forecast file (only .xls and .xlsx files supported)'
                        />
                    </Grid>
                    <Grid item lg={2}>
                        <FormUploadButton 
                            id='demand-forecast-upload-btn' 
                            label='CHOOSE FILE'
                            fileRef={demandForecastFile}
                            loader={false}
                            onChange={handleChange}
                            disabled={false}
                        />
                    </Grid>
                    <Grid item lg={2}>
                        <Typography>{warehouseState.demand_file_name}</Typography>
                    </Grid>
                </Grid>

                <Grid container item justifyContent='flex-start' alignContent='center' alignItems='center' sx={{marginTop: '50px'}}>

                    {warehouseState.demand_table_data && (
                        <FormDataGrid 
                            columns={demandForecastTableColumns}
                            rows={warehouseState.demand_table_data}
                            processDataChange={processDataChange}
                        />
                    )}
                </Grid>

                <Grid container item justifyContent='center' alignContent='center' alignItems='center' sx={{marginTop: '50px'}}>
                    {flagTableDataUpdated && (
                        <PrimaryButton 
                            id='save-demand-forecast-table-btn'
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