import { Container, Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
    FormMultiDropDown,
    FormLabel,
    FormDateSelector,
    FormCardField,
    FormSubLabel,
    FormDropDown,
} from '../../components/FormElements'
import { FormGraph } from '../../components/Table'
import {
    updateResultStartDate,
    updateResultEndDate,
    postResultData,
    updateResultCategories,
    updateResultCategory,
    updateResultTable,
} from '../../redux/actions/warehouse'
import dayjs from 'dayjs'
import { lineData, ResultTableTypes } from './constants'

import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme()

const Result = () => {
    const dispatch = useAppDispatch()

    // @ts-ignore
    const warehouseState = useAppSelector((state) => state.warehouseReducer)

    const [selectedCategory, setSelectedCategory] = useState<any[]>([])

    const [resultChartData, setResultChartData] = useState<any>({})

    const [selectedTable, setSelectedTable] = useState(null)

    const [cardData, setCardData] = useState({
        num_employees_to_be_hired: 0,
        project_fulfillment: 0,
        total_hiring_budget: '',
    })

    const [outputData, setOutputData] = useState(null)
    const [totalData, setTotalData] = useState<any>(null)
    const [demandData, setDemandData] = useState(null)

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
        setSelectedTable(
            ResultTableTypes.find((obj: any) => {
                return obj.id === e.target.value
            }),
        )
        dispatch(
            // @ts-ignore
            updateResultTable(
                ResultTableTypes.find((obj: any) => {
                    return obj.id === e.target.value
                }),
            ),
        )
    }

    const TotalValueFromResult = (filterDates: any, valueType: any) => {
        return filterDates.map((date: any) => {
            let totalSum = 0
            for (const category of warehouseState.result_category) {
                totalSum =
                    totalSum +
                    warehouseState.result_demand_vs_fulfillment_data[date][
                        category
                    ][valueType]
            }
            return totalSum
        })
    }

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
        setSelectedTable(ResultTableTypes[0])
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

        if (warehouseState.result_demand_vs_fulfillment_data) {
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
                demands = filteredDates.map(
                    (date) =>
                        warehouseState.result_demand_vs_fulfillment_data[date]
                            .total.expected_demand,
                )
                expected_fulfillments = filteredDates.map(
                    (date) =>
                        warehouseState.result_demand_vs_fulfillment_data[date]
                            .total.fulfillment_with_total,
                )
                existing_fulfillments = filteredDates.map(
                    (date) =>
                        warehouseState.result_demand_vs_fulfillment_data[date]
                            .total.fulfillment_with_current,
                )
            } else {
                demands = TotalValueFromResult(filteredDates, 'expected_demand')
                expected_fulfillments = TotalValueFromResult(
                    filteredDates,
                    'fulfillment_with_total',
                )
                existing_fulfillments = TotalValueFromResult(
                    filteredDates,
                    'fulfillment_with_current',
                )
            }

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
        }

        if (
            warehouseState.result_output &&
            warehouseState.result_demand_vs_fulfillment_data
        ) {
            const filteredData = Object.keys(warehouseState.result_output)
                .filter((date) => {
                    if (startDate && endDate) {
                        return date >= startDate && date <= endDate
                    } else if (startDate) {
                        return date >= startDate
                    } else if (endDate) {
                        return date <= endDate
                    }
                    return true
                })
                .reduce((filtered: any, date) => {
                    const categories = Object.keys(
                        warehouseState.result_output[date],
                    )
                    categories.forEach((category) => {
                        if (
                            selectedCategory.length == 0 ||
                            selectedCategory.includes(category)
                        ) {
                            if (!filtered[date]) {
                                filtered[date] = {}
                            }
                            filtered[date][category] =
                                warehouseState.result_output[date][category]
                        }
                    })
                    return filtered
                }, {})

            const filteredDemandData = Object.keys(
                warehouseState.result_demand_vs_fulfillment_data,
            )
                .filter((date) => {
                    if (startDate && endDate) {
                        return date >= startDate && date <= endDate
                    } else if (startDate) {
                        return date >= startDate
                    } else if (endDate) {
                        return date <= endDate
                    }
                    return true
                })
                .reduce((filtered: any, date) => {
                    const categories = Object.keys(
                        warehouseState.result_demand_vs_fulfillment_data[date],
                    )
                    categories.forEach((category) => {
                        if (
                            selectedCategory.length == 0 ||
                            selectedCategory.includes(category)
                        ) {
                            if (!filtered[date]) {
                                filtered[date] = {}
                            }
                            filtered[date][category] =
                                warehouseState.result_demand_vs_fulfillment_data[
                                    date
                                ][category]
                        }
                    })
                    return filtered
                }, {})

            const uniqueDates = Object.keys(filteredData).filter(
                (key) => key !== 'total' && key !== 'additional_data',
            )

            const totalData = uniqueDates.reduce(
                (acc, date) => {
                    const categories = Object.keys(filteredData[date])
                    categories.forEach((category) => {
                        acc.num_of_existing_to_deploy +=
                            filteredData[date][
                                category
                            ].num_of_existing_to_deploy
                        acc.num_of_new_to_deploy +=
                            filteredData[date][category].num_of_new_to_deploy
                        acc.total += filteredData[date][category].total
                    })
                    return acc
                },
                {
                    num_of_existing_to_deploy: 0,
                    num_of_new_to_deploy: 0,
                    total: 0,
                },
            )
            setOutputData(filteredData)
            setTotalData(totalData)
            setDemandData(filteredDemandData)
        }
    }, [
        warehouseState.result_demand_vs_fulfillment_data,
        warehouseState.result_category,
        warehouseState.result_start_date,
        warehouseState.result_end_date,
    ])

    useEffect(() => {
        if (warehouseState.result_additional_data) {
            setCardData({
                ...cardData,
                project_fulfillment: warehouseState.result_additional_data
                    .project_fulfillment
                    ? warehouseState.result_additional_data.project_fulfillment
                    : 0,
                // @ts-ignore
                total_hiring_budget: warehouseState.result_additional_data
                    .total_hiring_budget
                    ? ' ' +
                      warehouseState.result_additional_data.total_hiring_budget.toLocaleString(
                          'en-IN',
                      )
                    : 0,
            })
        }
    }, [warehouseState.result_additional_data])

    const cardItems = [
        {
            value: totalData?.num_of_new_to_deploy
                ? totalData?.num_of_new_to_deploy
                : 0,
            label: 'Num employees to be hired',
        },
        {
            value: cardData?.project_fulfillment,
            label: 'Project fulfillment',
        },
        {
            value: cardData?.total_hiring_budget,
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

    console.log('outputData', outputData)
    console.log('totalData', totalData)
    console.log('demandData', demandData)

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed>
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
                                <FormLabel label='Expected Demand vs Fulfillment' />
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
                                            warehouseState.result_table
                                                ? warehouseState.result_table
                                                : selectedTable
                                        }
                                        data={ResultTableTypes}
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
