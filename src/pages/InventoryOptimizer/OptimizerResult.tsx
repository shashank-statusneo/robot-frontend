import React, { useState } from 'react'
import {
    InputLabel,
    MenuItem,
    Grid,
    Select,
    FormControl,
    Typography,
    Paper,
    SelectChangeEvent,
    Table, TableBody,TableCell, TableContainer, TableHead, TableRow, Button, Container
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
    AnimatedAxis,
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
  } from '@visx/xychart';

import dayjs, {Dayjs} from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

import { FormCardField, FormTable } from './components/formFields';


const theme = createTheme();

const OptimizerResultContainer = () => {

    const dispatch = useAppDispatch()

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

    interface graphDataInterface {
        inventoryLevel: number;
        time: number; 
    }

    const graphData: graphDataInterface[] = [
        { inventoryLevel: 10, time: 1},
        { inventoryLevel: 20, time: 2},
        { inventoryLevel: 30, time: 3 },
        { inventoryLevel: 40, time: 4},
        { inventoryLevel: 35, time:5 },
        { inventoryLevel: 30, time: 6 },
        { inventoryLevel: 5, time: 7 },
    ];

    const graphAccessors = {
        xAccessor: (d: graphDataInterface) => d.time,
        yAccessor: (d: graphDataInterface) => d.inventoryLevel,
    };
    
    const handleVendorChange = (event:  SelectChangeEvent) => {
        setVendor(event.target.value)
    }

    const FormDropDown = (params: { label: string; data: string[] }) => {
        return (
            <FormControl fullWidth>
                <InputLabel id="vendor-select-input-label">
                    {params.label}
                </InputLabel>
                <Select
                    value={vendor}
                    label={params.label}
                    labelId="vendor-select-input-label"
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
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid container item lg={4} md={4} sm={12}  direction="column" spacing={1}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid item lg={4} md={4} sm={12} >
                                <Typography>Select From Date</Typography>
                            </Grid>
                            <Grid item lg={4} md={4} sm={12}>
                                <DatePicker
                                    label="From Date"
                                    value={fromDate}
                                    onChange={(updatedFromDate) =>setFromDate(updatedFromDate)}
                                />
                            </Grid>
                        </LocalizationProvider>
                </Grid>
                <Grid container item lg={4} md={4} sm={12}  direction="column" spacing={1}>
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid item lg={4} md={4} sm={12}>
                            <Typography>Select To Date</Typography>
                        </Grid>
                        <Grid item lg={4} md={4} sm={12}>
                            <DatePicker
                                label="To Date"
                                value={toDate}
                                onChange={(updatedToDate) =>setToDate(updatedToDate)}
                            />
                        </Grid>
                    </LocalizationProvider>
                </Grid>

                <Grid container item lg={4} md={4} sm={12}  direction="column" spacing={1}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid item lg={4} md={4} sm={12}>
                                <Typography>Select Vendor</Typography>
                            </Grid>
                            <Grid item lg={4} md={4} sm={12}>
                                <FormDropDown
                                    label="Vendor"
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
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
           
            >
                <Grid item>
                    <Typography variant="h6">
                        PROJECTION: DEMAND Vs INVENTORY LEVEL
                    </Typography>
                </Grid>
                <Grid item>
                    <Paper
                        sx={{
                            width: 450,
                            height: 400,
                        }}
                    >
                        <XYChart  xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
                            <AnimatedAxis orientation="bottom" label='Time' />
                            <AnimatedAxis orientation="left" label='Invetory Level' />
                            <AnimatedGrid columns={false} numTicks={4} />
                            <AnimatedLineSeries dataKey="Projection Graph" data={graphData} {...graphAccessors} />
                        </XYChart>
                       
                    </Paper>
                </Grid>
            </Grid>
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
                <Grid container direction="column" spacing={6}>
                    <Grid item >
                        <FormDataSelector />
                    </Grid>
                    <Grid item >
                        <CardContainer />
                    </Grid>
                    <Grid container item direction="row" >
                    <Grid item lg={6} md={6} sm={12}>
                            <ProjectionContainer/>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12}>
                            <PolicyContainer/>
                        </Grid>
                    </Grid>
                </Grid>
                <Button onClick={() => console.log(algorithmResultState)}>Click me</Button>
            </Container>
        </ThemeProvider>
    )
}

export default OptimizerResultContainer
