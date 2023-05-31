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

const theme = createTheme();

const OptimizerResultContainer = () => {
    
    // @ts-ignore
    const algorithmResultState = useAppSelector(state => state.alalgorithmDataReducer)

    const cardLabelMapping: any = {
        total_purchase_value: 'Total Purchase Value',
        total_purchase_qty: 'Total Purchase Qty',
        reorder_point: 'Reorder Point',
        reorder_qty: 'Reorder Qty',
    }

    const [vendor, setVendor] = useState('')
    const [fromDate, setFromDate] = React.useState<Dayjs | null>(dayjs())
    const [toDate, setToDate] = React.useState<Dayjs | null>(dayjs())

    const lineData = [
        {
            dataKey: 'inventory_level',
            stroke:'#8B7AFF',
        },
        {
            dataKey: 'daily_demand',
            stroke:'#45AC54',
        },
        {
            dataKey: 'orders_fulfilled',
            stroke:'#008E19',
        },
        {
            dataKey: 'stockout_on',
            stroke:'#8B7AFF',
        },
        {
            dataKey: 'po_raised_on',
            stroke:'#FF7073',
        },
        {
            dataKey: 'po_received_on',
            stroke:'#FF7078',
        },
    ]

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

        return (
            <FormTable 
                tableName='POLICY DETAILS TABLE'
                tableHeaders={Object.keys(apiPolicyDetail[0])}
                tableData={apiPolicyDetail}
                totalOrderQty={totalOrderQty}
                totalCost={totalCost}
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
