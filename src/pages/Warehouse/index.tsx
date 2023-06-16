import { useState, useEffect } from 'react'
import { Container, Grid } from '@mui/material'
import WarehouseSelect from './WarehouseSelect'
import WarehouseRequirement from './WarehouseRequirement'
import BenchmarkProductivity from './BenchmarkProductivity'
import DemandForecast from './DemandForecast'
import Result from './Result'
import { NavigationBtn } from '../../components/Buttons'
import { useAppSelector } from '../../hooks/redux-hooks'
import {
    FormBackdropElement,
    FormSnackBarElement,
    FormAlertElement,
} from '../../components/FormElements'
import dayjs from 'dayjs'
import { useParams, useNavigate } from 'react-router-dom'

const WareHouse = () => {
    const navigate = useNavigate()
    // @ts-ignore
    const warehouseState = useAppSelector((state) => state.warehouseReducer)

    const [snackbarState, setSnackbarState] = useState(false)

    const [alertState, setAlertState] = useState(false)

    const PageToScreen: any = {
        select: {
            element: <WarehouseSelect />,
            previous: null,
            next: 'benchmark',
            complete:
                warehouseState?.planning_warehouse &&
                dayjs(warehouseState.planning_start_date).format(
                    'YYYY-MM-DD',
                ) !== 'Invalid Date' &&
                dayjs(warehouseState.planning_end_date).format('YYYY-MM-DD') !==
                    'Invalid Date' &&
                warehouseState.planning_end_date >=
                    warehouseState.planning_start_date
                    ? true
                    : false,
            prompt: null,
        },
        benchmark: {
            element: <BenchmarkProductivity />,
            previous: 'select',
            next: 'demand',
            complete: warehouseState?.productivity_table_data ? true : false,
            prompt: warehouseState.flag_productivity_table_updated,
        },
        demand: {
            element: <DemandForecast />,
            previous: 'benchmark',
            next: 'requirement',
            complete: warehouseState?.demand_table_data ? true : false,
            prompt: warehouseState.flag_productivity_table_updated,
        },
        requirement: {
            element: <WarehouseRequirement />,
            previous: 'demand',
            next: 'result',
            complete:
                warehouseState?.percentage_absent_expected &&
                warehouseState?.num_current_employees &&
                warehouseState?.total_hiring_budget &&
                warehouseState?.cost_per_employee_per_month &&
                warehouseState?.day_working_hours
                    ? true
                    : false,
            prompt: null,
        },
        result: {
            element: <Result />,
            previous: 'requirement',
            next: null,
            prompt: null,
        },
    }

    const ScreenNames = Object.keys(PageToScreen)

    const { pageName = ScreenNames[0] } = useParams()

    const handleNext = () => {
        if (PageToScreen[pageName].prompt) {
            setAlertState(true)
        } else {
            navigate(`/warehouse/${PageToScreen[pageName].next}`)
        }
    }

    const handlePrevious = () => {
        navigate(`/warehouse/${PageToScreen[pageName].previous}`)
    }

    const handleProceed = () => {
        setAlertState(false)
        navigate(`/warehouse/${PageToScreen[pageName].next}`)
    }

    const handleCancel = () => {
        setAlertState(false)
    }

    useEffect(() => {
        setSnackbarState(true)
    }, [warehouseState.message])

    return (
        <Container maxWidth='xl'>
            <Grid container>
                <FormBackdropElement loader={warehouseState.isLoading} />
                {snackbarState && warehouseState.message && (
                    <FormSnackBarElement
                        message={warehouseState.message}
                        onClose={() => setSnackbarState(false)}
                    />
                )}

                {alertState && (
                    <FormAlertElement
                        open={alertState}
                        onClose={() => setAlertState(false)}
                        label='warehouse-form-save-alert-label'
                        id='warehouse-form-save-alert'
                        title='Review Changes'
                        content='There are unsaved changes! Do you wish to continue?'
                        buttons={[
                            { label: 'Proceed', onClick: handleProceed },
                            { label: 'Cancel', onClick: handleCancel },
                        ]}
                    />
                )}
                <Grid item lg={2} md={2} sm={2} bgcolor='#D0E8FD'></Grid>
                <Grid
                    item
                    lg={10}
                    md={10}
                    sm={10}
                    style={{
                        borderStyle: 'solid',
                        borderWidth: '0.2px',
                        padding: '5px',
                    }}
                >
                    <Grid item>{PageToScreen[pageName].element}</Grid>

                    <Grid
                        container
                        item
                        justifyContent='space-between'
                        alignItems='center'
                        sx={{ marginTop: '150px' }}
                    >
                        <Grid item>
                            <NavigationBtn
                                id='navigation-btn-previous'
                                label='< Previous'
                                onClick={handlePrevious}
                                disabled={false}
                                render={PageToScreen[pageName].previous}
                            />
                        </Grid>
                        <Grid item>
                            <NavigationBtn
                                id='navigation-btn-next'
                                label='Next >'
                                onClick={handleNext}
                                disabled={!PageToScreen[pageName].complete}
                                render={PageToScreen[pageName].next}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default WareHouse
