import React, { useState } from 'react'
import {
    InputLabel,
    MenuItem,
    Grid,
    Select,
    FormControl,
    Typography,
    Paper,
    SelectChangeEvent
} from '@mui/material'
import dayjs, {Dayjs} from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const OptimizerResultContainer = () => {
    const [vendor, setVendor] = useState('')
    const [fromDate, setFromDate] = React.useState<Dayjs | null>(dayjs())
    const [toDate, setToDate] = React.useState<Dayjs | null>(dayjs())

    const handleVendorChange = (event:  SelectChangeEvent) => {
        console.log(event.target.value)
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
            <Grid container direction="row">
                <Grid item xs={4}>
                    <Grid container direction="column" spacing={2}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid item>
                                <Typography>Select From Date</Typography>
                            </Grid>
                            <Grid item>
                                <DatePicker
                                    label="From Date"
                                    value={fromDate}
                                    onChange={(updatedFromDate) =>setFromDate(updatedFromDate)}
                                />
                            </Grid>
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container direction="column" spacing={2}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid item>
                                <Typography>Select To Date</Typography>
                            </Grid>
                            <Grid item>
                                <DatePicker
                                    label="To Date"
                                    value={toDate}
                                    onChange={(updatedToDate) =>setToDate(updatedToDate)}
                                />
                            </Grid>
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid container direction="column" spacing={2}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid item>
                                <Typography>Select Vendor</Typography>
                            </Grid>
                            <Grid item>
                                <FormDropDown
                                    label="Vendor"
                                    data={['Apple', 'Samsung']}
                                />
                            </Grid>
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
    
    const [totalPurchaseValue, setTotalPurchaseValue] = useState('Rs. 1,50,000')
    const [totalPurchaseQuantity, setTotalPurchaseQuantity] = useState('7265')
    const [reorderPoint, setReorderPoint] = useState('565')
    const [reorderQuantity, setReorderQuantity] = useState('150')

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
            <Grid container direction="row" spacing={2}>
                <Grid item xs={3}>
                    <FormCard
                        value={totalPurchaseValue}
                        label="Total Purchase Value"
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormCard
                        value={totalPurchaseQuantity}
                        label="Total Purchase Qty"
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormCard value={reorderPoint} label="Reorder Point" />
                </Grid>
                <Grid item xs={3}>
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
                spacing={2}
                justifyContent="center"
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
                            backgroundColor: 'grey',
                        }}
                    ></Paper>
                </Grid>
            </Grid>
        )
    }

    const PolicyContainer = () => {
        return <></>
    }

    return (
        <Grid container direction="column" justifyContent="center" spacing={10}>
            <Grid item>
                <FormDataSelector />
            </Grid>
            <Grid item>
                <CardContainer />
            </Grid>
            <Grid item>
                <ProjectionContainer />
            </Grid>
        </Grid>
    )
}

export default OptimizerResultContainer
