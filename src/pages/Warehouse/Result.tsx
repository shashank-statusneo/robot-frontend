import { Container, Grid, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import { PrimaryButton } from '../../components/Buttons'
import {
    FormMultiDropDown,
    FormLabel,
    FormDateSelector,
    FormCardField,
    FormSubLabel,
    FormDropDown,
} from '../../components/FormElements'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { FormGraph } from '../../components/Table'
import { useNavigate } from 'react-router-dom'
import {
    updateResultStartDate,
    updateResultEndDate,
    postResultData,
    updateResultCategories,
    updateResultCategory,
} from '../../redux/actions/warehouse'
import dayjs from 'dayjs'
import { lineData } from './constants'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import warehouse from '../../redux/reducer/warehouse'
const theme = createTheme()

const Result = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // @ts-ignore
    const warehouseState = useAppSelector((state) => state.warehouseReducer)

    // const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState<any[]>([])

    const [resultChartData, setResultChartData] = useState<any>({})

    const [selectedTable, setSelectedTable] = useState(null)

    const TableTypes = [
        {
            id: 0,
            name: 'Category-wise schedule',
        },
        {
            id: 1,
            name: 'Other Type',
        },
    ]

    const fetchData = () => {
        const payload = {
            plan_from_date: dayjs(warehouseState.planning_start_date).format(
                'YYYY-MM-DD',
            ),
            plan_to_date: dayjs(warehouseState.planning_end_date).format(
                'YYYY-MM-DD',
            ),
            num_current_employees: warehouseState.num_current_employees,
            day_working_hours: warehouseState.day_working_hours,
            warehouse_id: warehouseState.planning_warehouse.id,
            cost_per_employee_per_month:
                warehouseState.cost_per_employee_per_month,
            percentage_absent_expected:
                warehouseState.percentage_absent_expected,
            total_hiring_budget: warehouseState.total_hiring_budget,
        }
        // @ts-ignore
        dispatch(postResultData(payload))
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const startDate = dayjs(warehouseState.result_start_date).format(
            'YYYY-MM-DD',
        )
        const endDate = dayjs(warehouseState.result_end_date).format(
            'YYYY-MM-DD',
        )

        const filteredDates = Object.keys(
            warehouseState.result_demand_vs_fulfillment_data,
        ).filter((date) => {
            if (startDate && endDate) {
                return date >= startDate && date <= endDate
            } else if (startDate) {
                return date >= startDate
            } else if (endDate) {
                return date <= endDate
            }
            return true
        })

        let demands: any = []
        let expected_fulfillments: any = []
        let existing_fulfillments: any = []
        if (warehouseState.result_category.length === 0) {
            console.log('no selected category')
            demands = filteredDates.map(
                (date) =>
                    warehouseState.result_demand_vs_fulfillment_data[date].total
                        .expected_demand,
            )
            expected_fulfillments = filteredDates.map(
                (date) =>
                    warehouseState.result_demand_vs_fulfillment_data[date].total
                        .fulfillment_with_total,
            )
            existing_fulfillments = filteredDates.map(
                (date) =>
                    warehouseState.result_demand_vs_fulfillment_data[date].total
                        .fulfillment_with_current,
            )
        }

        // TODO: add logic for result category selected
        const graphData: any = []
        for (let i = 0; i < demands.length; i++) {
            graphData.push({
                date: filteredDates[i],
                Demand: demands[i],
                'Expected Fulfillment': expected_fulfillments[i],
                'Fulfillment With Existing': existing_fulfillments[i],
            })
        }

        setResultChartData(graphData)
    }, [
        warehouseState.result_category,
        warehouseState.result_start_date,
        warehouseState.result_end_date,
    ])

    const handleSelectedCategoryChange = (e: any) => {
        const {
            target: { value },
        } = e
        setSelectedCategory(
            typeof value === 'string' ? value.split(',') : value,
        )
        dispatch(
            // @ts-ignore
            updateResultCategory(
                typeof value === 'string' ? value.split(',') : value,
            ),
        )
    }

    const handleWarehouseStartDateChange = (date: any) => {
        // @ts-ignore
        dispatch(updateResultStartDate(date))
    }
    const handleWarehouseEndDateChange = (date: any) => {
        // @ts-ignore
        dispatch(updateResultEndDate(date))
    }

    const handleSelectedTableChange = (e: any) => {
        setSelectedTable(e.target.value)
    }

    const cardItems = [
        {
            value: warehouseState?.result_additional_data?.project_fulfillment
                ? warehouseState?.result_additional_data?.project_fulfillment
                : 0,
            label: 'Num employees to be hired',
        },
        {
            value: warehouseState?.result_additional_data?.project_fulfillment
                ? warehouseState?.result_additional_data?.project_fulfillment
                : 0,
            label: 'Project fulfillment',
        },
        {
            // value: '₹ 2,25,000',
            value: warehouseState?.result_additional_data?.total_hiring_budget
                ? warehouseState?.result_additional_data?.total_hiring_budget
                : 0,
            label: 'Project total expenditure',
        },
    ]

    const ResultSubLabel = `${warehouseState.result_warehouse_name}: 
                            ${dayjs(warehouseState.planning_start_date).format(
                                'DD MMM YYYY',
                            )} 
                            to ${dayjs(warehouseState.planning_end_date).format(
                                'DD MMM YYYY',
                            )}`

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed>
                {/* <Form /> */}
                <Grid
                    container
                    direction='column'
                    spacing={8}
                    sx={{ marginTop: '10px' }}
                >
                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                    >
                        <Grid item>
                            <FormLabel label='MANPOWER HIRING & DEPLOYMENT PLAN' />
                            <FormSubLabel label={ResultSubLabel} />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                    >
                        <Grid
                            container
                            item
                            lg={4}
                            direction='row'
                            justifyContent='center'
                            alignContent='center'
                            alignItems='center'
                        >
                            <Grid item lg={3}>
                                <FormLabel label='Start Date' />
                            </Grid>
                            <Grid item lg={8}>
                                <FormDateSelector
                                    label=''
                                    value={warehouseState.result_start_date}
                                    onChange={handleWarehouseStartDateChange}
                                    minDate={dayjs()}
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            item
                            lg={4}
                            direction='row'
                            justifyContent='center'
                            alignContent='center'
                            alignItems='center'
                        >
                            <Grid item lg={3}>
                                <FormLabel label='End Date' />
                            </Grid>
                            <Grid item lg={8}>
                                <FormDateSelector
                                    label=''
                                    value={warehouseState.result_end_date}
                                    onChange={handleWarehouseEndDateChange}
                                    minDate={dayjs()}
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            item
                            lg={4}
                            direction='row'
                            justifyContent='center'
                            alignContent='center'
                            alignItems='center'
                        >
                            <Grid item lg={3}>
                                <FormLabel label='Category' />
                            </Grid>
                            <Grid item lg={8}>
                                <FormMultiDropDown
                                    id='select-category-dropdown'
                                    labelId='select-category-dropdown-input-label'
                                    label=''
                                    value={selectedCategory}
                                    data={
                                        warehouseState.result_categories
                                            ? warehouseState.result_categories
                                            : []
                                    }
                                    onChange={handleSelectedCategoryChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        lg={12}
                        direction='row'
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                    >
                        <FormCardField items={cardItems} />
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                    >
                        <Grid
                            container
                            item
                            lg={6}
                            justifyContent='center'
                            alignContent='center'
                            alignItems='center'
                        >
                            <Grid item>
                                <FormLabel label='Expected Demand vs Fulfilment' />
                            </Grid>
                            <Grid item lg={12}>
                                <Paper
                                    sx={{
                                        width: '100%',
                                        height: 350,
                                    }}
                                >
                                    <FormGraph
                                        xLabel='date'
                                        yLabel=''
                                        data={resultChartData}
                                        lineData={lineData}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            lg={6}
                            justifyContent='center'
                            alignContent='center'
                            alignItems='center'
                            spacing={2}
                        >
                            <Grid item>
                                <FormLabel label='Deployment Schedule' />
                            </Grid>
                            <Grid
                                container
                                item
                                lg={12}
                                justifyContent='center'
                                alignContent='center'
                                alignItems='center'
                            >
                                <Grid item lg={3}>
                                    <FormLabel label='Select table' />
                                </Grid>
                                <Grid item lg={6}>
                                    <FormDropDown
                                        id='select-table-dropdown'
                                        labelId='select-table-dropdown-input-label'
                                        label=''
                                        value={
                                            selectedTable
                                                ? selectedTable
                                                : TableTypes[0]
                                        }
                                        data={TableTypes}
                                        onChange={handleSelectedTableChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default Result
