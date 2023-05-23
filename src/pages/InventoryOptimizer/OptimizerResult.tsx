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

const OptimizerResultContainer = () => {
    const [vendor, setVendor] = useState('')
    const [fromDate, setFromDate] = React.useState<Dayjs | null>(dayjs())
    const [toDate, setToDate] = React.useState<Dayjs | null>(dayjs())

    const [totalPurchaseValue, setTotalPurchaseValue] = useState('Rs. 1,50,000')
    const [totalPurchaseQuantity, setTotalPurchaseQuantity] = useState('7265')
    const [reorderPoint, setReorderPoint] = useState('565')
    const [reorderQuantity, setReorderQuantity] = useState('150')

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

    const createTableData = (
        vendor: string, 
        reorderLevel: number,
        orderQty: number,
        cost: number
    ) => {
        return { vendor, reorderLevel, orderQty, cost };
    }

    const TableData = [
        createTableData('Samsung', 123, 20, 2000 ),
        createTableData('Apple', 456, 30, 3000 ),
        createTableData('Nokia', 789, 40, 4000 ),
    ] 

    
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
    

    const FormCard = (params: { value: string | number; label: string}) => {
        return (
            <Paper elevation={2}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant="h4" fontWeight="bold">
                            {params.value}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">{params.label} </Typography>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    const CardContainer = () => {
        return (
            <Grid 
                container 
                direction="row"  
                justifyContent="center"
                alignItems="center"
                spacing={1}
              
            >
                <Grid item lg={3} md={3} sm={6}>
                    <FormCard
                        value={totalPurchaseValue}
                        label="Total Purchase Value"
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={6}>
                    <FormCard
                        value={totalPurchaseQuantity}
                        label="Total Purchase Qty"
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={6}>
                    <FormCard value={reorderPoint} label="Reorder Point" />
                </Grid>
                <Grid item lg={3} md={3} sm={6}>
                    <FormCard value={reorderQuantity} label="Reorder Qty" />
                </Grid>
            </Grid>
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
        return (
            <Grid
                container
                direction="column"
                spacing={1}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <Typography variant="h6">
                        POLICY DETAILS TABLE
                    </Typography>
                </Grid>
                <Grid item>
                    <TableContainer component={Paper}>
                        <Table aria-label="policy-details-table">
                            <TableHead>
                                <TableRow>
                                <TableCell>Vendor</TableCell>
                                <TableCell>Reorder Level</TableCell>
                                <TableCell>Order Qty</TableCell>
                                <TableCell>Cost</TableCell>
                            
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {TableData.map((row) => (
                                <TableRow
                                    key={row.vendor}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{row.vendor}</TableCell>
                                    <TableCell>{row.reorderLevel}</TableCell>
                                    <TableCell>{row.orderQty}</TableCell>
                                    <TableCell>{row.cost}</TableCell>
                                </TableRow>
                                ))}
                                <TableRow>
                                    {/* <TableCell rowSpan={4} /> */}
                                    <TableCell colSpan={2} align='center'>Total</TableCell>
                                    <TableCell>90</TableCell>
                                    <TableCell>9000</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                            
                </Grid>
                <Grid item>
                    <Button variant="contained" color="secondary">
                            DOWNLOAD TABLE AS EXCEL FILE 
                    </Button>
                </Grid>
            </Grid>


           
        )
    }

    return (
        <Container sx={{ flexGrow: 1 }} fixed >
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
        </Container>
    )
}

export default OptimizerResultContainer
