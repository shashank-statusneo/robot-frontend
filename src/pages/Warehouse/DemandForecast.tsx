import { useState, useRef, MutableRefObject } from 'react'

import { Container, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'


import { uploadDemandFile, getDemandForecastData, putDemandForecastData } from '../../redux/actions/warehouse';

import { PrimaryButton, FormUploadButton } from '../../components/Buttons';
import { FormLabel } from '../../components/FormElements';
import { FormDataGrid } from '../../components/Table';
import { GridRowModel } from '@mui/x-data-grid'


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

        const [updateRequestPayload]: any = useState([])

        const [flagTableDataUpdated, setFlagTableDataUpdated] = useState(false)

        const processDataChange = (newRow: GridRowModel, oldRow: GridRowModel) => {

            const updatedRow = {...newRow}

            let updatedCol: any = null

            Object.keys(oldRow).forEach((key) => { 
                if (oldRow[key] !== newRow[key]){
                    updatedCol = key
                }
            })

            if (updatedCol){
               
                updateRequestPayload.push(
                    {
                        id: warehouseState.demand_table_data[newRow.date][updatedCol]['id'],
                        demand: updatedRow[updatedCol]
                    }
                )

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
            const tableData = JSON.parse(JSON.stringify(warehouseState.modified_demand_table_data))
            updatedTableData.map((newObj: any, index: any) => {
                const oldObjIndex = tableData.findIndex((oldObj: any) => oldObj.id === newObj.id)
                tableData[oldObjIndex] = { ...newObj }
            })
            // @ts-ignore
            dispatch(putDemandForecastData({'demands': updateRequestPayload}, tableData))
        }

        const handleChange = (event: any) => {
            event.preventDefault();
            const fileObj = event.target.files && event.target.files[0];
            if (fileObj) {
                
                const context = {
                    start_date: dayjs(warehouseState.planning_start_date).format('YYYY-MM-DD'),
                    end_date: dayjs(warehouseState.planning_end_date).format('YYYY-MM-DD'),

                }
                // @ts-ignore
                dispatch(uploadDemandFile({...context, file: fileObj }, warehouseState.planning_warehouse?.id, fileObj.name))
                // @ts-ignore
                dispatch(getDemandForecastData(context, warehouseState.planning_warehouse?.id))  
            }
        }

        return (
            <Grid container direction='column' spacing={2} sx={{marginTop: '10px'}}>
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

                <Grid container item justifyContent='flex-start' alignContent='center' alignItems='center' sx={{marginTop: '10px', height: '350px'}}>

                    { warehouseState.demand_table_cols && warehouseState.modified_demand_table_data && (
                        <FormDataGrid 
                            columns={warehouseState.demand_table_cols}
                            rows={warehouseState.modified_demand_table_data}
                            processDataChange={processDataChange}
                        />
                    )}
                </Grid>

                <Grid container item justifyContent='center' alignContent='center' alignItems='center' sx={{marginTop: '10px', height: '50px'}}>
                    {flagTableDataUpdated && (
                        <PrimaryButton 
                            id='save-demand-forecast-table-btn'
                            label='Save Data'
                            onClick={() => {handleClickSave()}}
                            disabled={false}
                        />
                    )}
        
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