import React, { useState } from 'react'
import {
    InputLabel,
    MenuItem,
    Grid,
    Select,
    FormControl,
    Typography,
    SelectChangeEvent,
    Container
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'

import dayjs, {Dayjs} from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useAppSelector } from '../../hooks/redux-hooks';

import { FormCardField, FormTable, FormGraph } from './components/formFields';
import { lineData, policyTableHeaders } from './constants';


const theme = createTheme();

const OptimizerResultContainer = () => {
    
    // @ts-ignore
    const algorithmResultState = useAppSelector(state => state.alalgorithmDataReducer)

    const cardLabelMapping: any = {
        total_purchase_value: 'Total Purchase Value',
        total_purchase_qty: 'Total Purchase Qty',
        reorder_point: 'Reorder Point',
        reorder_qty: 'Reorder Qty',
        safety_stock: 'Safety Stock'
    }

    const [vendor, setVendor] = useState('')
    const [fromDate, setFromDate] = React.useState<Dayjs | null>(dayjs())
    const [toDate, setToDate] = React.useState<Dayjs | null>(dayjs())

    const handleVendorChange = (event:  SelectChangeEvent) => {
        setVendor(event.target.value)
    }

    const FormDropDown = (params: { label: string; data: string[] }) => {
        return (
            <FormControl fullWidth>
                <InputLabel id='vendor-select-input-label'>
                    {params.label}
                </InputLabel>
                <Select
                    value={vendor}
                    label={params.label}
                    labelId='vendor-select-input-label'
                    onChange={handleVendorChange}
                >
                    {params.data.map((item, key) => (
                        <MenuItem value={item} key={key}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }

    const FormDataSelector = () => {
        return (
            <Grid  
                container
                direction='row'
                justifyContent='center'
                alignItems='center'
            >
                <Grid container item lg={4} md={4} sm={12}  direction='column' spacing={1}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid item lg={4} md={4} sm={12} >
                                <Typography>Select From Date</Typography>
                            </Grid>
                            <Grid item lg={4} md={4} sm={12}>
                                <DatePicker
                                    label='From Date'
                                    value={fromDate}
                                    onChange={(updatedFromDate) =>setFromDate(updatedFromDate)}
                                />
                            </Grid>
                        </LocalizationProvider>
                </Grid>
                <Grid container item lg={4} md={4} sm={12}  direction='column' spacing={1}>
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid item lg={4} md={4} sm={12}>
                            <Typography>Select To Date</Typography>
                        </Grid>
                        <Grid item lg={4} md={4} sm={12}>
                            <DatePicker
                                label='To Date'
                                value={toDate}
                                onChange={(updatedToDate) =>setToDate(updatedToDate)}
                            />
                        </Grid>
                    </LocalizationProvider>
                </Grid>

                <Grid container item lg={4} md={4} sm={12}  direction='column' spacing={1}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid item lg={4} md={4} sm={12}>
                                <Typography>Select Vendor</Typography>
                            </Grid>
                            <Grid item lg={4} md={4} sm={12}>
                                <FormDropDown
                                    label='Vendor'
                                    data={['Apple', 'Samsung']}
                                />
                            </Grid>
                        </LocalizationProvider>
                </Grid>
            </Grid>
        )
    }
    

    const CardContainer = () => {

        const cardsData: any = []
        const apiResult = algorithmResultState.result

        Object.keys(apiResult).forEach((key, index)=> {
            cardsData.push({
                value: apiResult[key],
                label: cardLabelMapping[key]
            })
        }) 
        return (
            <FormCardField items={cardsData} />
        )
    }

    const ProjectionContainer = () => {

        return (
            <FormGraph
                label='PROJECTION: DEMAND Vs INVENTORY LEVEL'
                xLabel='date'
                yLabel='inventory_level'
                data={algorithmResultState.simulation_output}
                lineData={lineData}
            />
        )
    }

    const PolicyContainer = () => {

        const apiPolicyDetail = algorithmResultState.policy_detail

        let totalOrderQty = 0;
        let totalCost = 0;

        apiPolicyDetail.map((obj: any, key: any) => {
            totalOrderQty = totalOrderQty + obj.reorder_qty
            totalCost = totalCost + obj.cost
        })

        const onDownloadClick = (event: any) => {
            console.log(event)
        }

        return (
            <FormTable 
                tableName='POLICY DETAILS TABLE'
                tableHeaders={policyTableHeaders}
                tableData={apiPolicyDetail}
                totalOrderQty={totalOrderQty}
                totalCost={totalCost}
                downloadBtnId='policy-table-download-btn'
                onClickFunc={onDownloadClick}
            />
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed >
                <Grid container direction='column' spacing={6}>
                    <Grid item >
                        <FormDataSelector />
                    </Grid>
                    <Grid item >
                        <CardContainer />
                    </Grid>
                    <Grid container item direction='row' >
                    <Grid item lg={6} md={6} sm={12}>
                            <ProjectionContainer/>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12}>
                            <PolicyContainer/>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default OptimizerResultContainer
