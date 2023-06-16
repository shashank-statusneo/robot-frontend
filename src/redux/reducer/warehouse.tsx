import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const initialState = {
    isLoading: false,
    message: '',
    warehouses: null,
    planning_warehouse: null,
    planning_start_date: dayjs(null),
    planning_end_date: dayjs(null),
    productivity_file_name: '',
    productivity_table_data: null,
    flag_productivity_table_updated: false,
    demand_file_name: '',
    demand_table_data: null,
    modified_demand_table_data: null,
    demand_table_cols: null,
    flag_demand_table_updated: false,
    percentage_absent_expected: '',
    num_current_employees: '',
    total_hiring_budget: '',
    cost_per_employee_per_month: '',
    day_working_hours: '',
    result_start_date: dayjs(null),
    result_end_date: dayjs(null),
    result_output: null,
    result_additional_data: null,
    result_warehouse_name: null,
    result_demand_vs_fulfillment_data: null,
    result_categories: null,
    result_category: [],
    result_table: null,
}

// @ts-ignore
export const warehouseReducer = createSlice({
    name: 'warehouse',
    initialState,
    reducers: {
        // START WAREHOUSE
        getWarehouses(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },

        getWarehousesSuccess(state, action) {
            return {
                ...state,
                warehouses: action?.payload,
                isLoading: false,
            }
        },

        getWarehousesFailed(state, action) {
            return {
                ...state,
                message: 'Warehouse fetch failed',
                isLoading: false,
            }
        },

        updatePlanningWarehouseValue(state, action) {
            return {
                ...state,
                planning_warehouse: action?.payload,
            }
        },

        updatePlanningStartDateValue(state, action) {
            return {
                ...state,
                planning_start_date: action?.payload,
            }
        },

        updatePlanningEndDateValue(state, action) {
            return {
                ...state,
                planning_end_date: action?.payload,
            }
        },

        // END WAREHOUSE

        // START PRODUCTIVITY
        postProductivity(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },

        postProductivitySuccess(state, action) {
            return {
                ...state,
                productivity_file_name: action?.payload?.fileName,
                isLoading: false,
            }
        },

        postProductivityFailed(state, action) {
            return {
                ...state,
                message: `Productivity file upload failed : ${
                    action?.payload?.error ? action?.payload?.error : ''
                }`,
                isLoading: false,
            }
        },

        getBenchmarkProductivity(state, action) {
            return {
                ...state,
                isLoading: true,
            }
        },

        getBenchmarkProductivitySuccess(state, action) {
            return {
                ...state,
                productivity_table_data: action?.payload,
                isLoading: false,
            }
        },

        getBenchmarkProductivityFailed(state, action) {
            console.log(action)
            return {
                ...state,
                message: 'Benchmark Productivity fetch failed',
                isLoading: false,
            }
        },

        putBenchmarkProductivity(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },

        putBenchmarkProductivitySuccess(state, action) {
            return {
                ...state,
                productivity_table_data: action?.payload,
                isLoading: false,
            }
        },

        putBenchmarkProductivityFailed(state, action) {
            return {
                ...state,
                message: 'Benchmark Productivity update failed',
                isLoading: false,
            }
        },

        updateFlagProductivityTableUpdatedValue(state, action) {
            return {
                ...state,
                flag_productivity_table_updated: action?.payload,
            }
        },

        // END PRODUCTIVITY

        // START DEMAND
        postDemand(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },

        postDemandSuccess(state, action) {
            return {
                ...state,
                demand_file_name: action?.payload?.fileName,
                isLoading: false,
            }
        },

        postDemandcls(state, action) {
            return {
                ...state,
                message: `Demand file upload failed : ${
                    action?.payload?.error ? action?.payload?.error : ''
                }`,
                isLoading: false,
            }
        },

        getDemandForecast(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },

        getDemandForecastSuccess(state, action) {
            return {
                ...state,
                demand_table_data: action?.payload,
                isLoading: false,
            }
        },

        getDemandForecastFailed(state, action) {
            return {
                ...state,
                message: 'Demand Forecast fetch failed',
                isLoading: false,
            }
        },

        putDemandForecast(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },

        putDemandForecastSuccess(state, action) {
            return {
                ...state,
                modified_demand_table_data: action?.payload,
                isLoading: false,
            }
        },

        putDemandForecastFailed(state, action) {
            return {
                ...state,
                message: 'Demand Forecsat update failed',
                isLoading: false,
            }
        },

        updateDemandTableDataColValue(state, action) {
            return {
                ...state,
                demand_table_cols: action?.payload,
            }
        },

        updateModifiedDemandTableDataValue(state, action) {
            return {
                ...state,
                modified_demand_table_data: action?.payload,
            }
        },
        updateDemandTableDataValue(state, action) {
            return {
                ...state,
                demand_table_data: action?.payload,
            }
        },

        updateFlagDemandTableUpdatedValue(state, action) {
            return {
                ...state,
                flag_demand_table_updated: action?.payload,
            }
        },

        // END DEMAND

        // START REQUIREMENT
        updatePercentageAbsentExpectedValue(state, action) {
            return {
                ...state,
                percentage_absent_expected: action?.payload,
            }
        },

        updateNumCurrentEmployeesValue(state, action) {
            return {
                ...state,
                num_current_employees: action?.payload,
            }
        },

        updateTotalHiringBudgetValue(state, action) {
            return {
                ...state,
                total_hiring_budget: action?.payload,
            }
        },

        updateCostPerEmployeePerMonthValue(state, action) {
            return {
                ...state,
                cost_per_employee_per_month: action?.payload,
            }
        },

        updateDayWorkingHoursValue(state, action) {
            return {
                ...state,
                day_working_hours: action?.payload,
            }
        },
        // END REQUIREMENT

        // START RESULT

        updateResultStartDateValue(state, action) {
            return {
                ...state,
                result_start_date: action?.payload,
            }
        },

        updateResultEndDateValue(state, action) {
            return {
                ...state,
                result_end_date: action?.payload,
            }
        },

        postResult(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },

        // @ts-ignore
        postResultSuccess(state, action) {
            return {
                ...state,
                result_output: action?.payload?.output,
                result_additional_data: action?.payload?.additional_data,
                result_warehouse_name: action?.payload?.warehouse_name,
                result_demand_vs_fulfillment_data:
                    action?.payload?.demand_vs_fulfillment_data,
                // @ts-ignore
                result_categories: getResultCategories(action?.payload?.output),
                isLoading: false,
            }
        },

        postResultFailed(state, action) {
            return {
                ...state,
                message: 'Result Calculate failed',
                isLoading: false,
            }
        },

        updateResultCategoriesValue(state, action) {
            return {
                ...state,
                result_categories: action?.payload,
            }
        },

        updateResultCategoryValue(state, action) {
            return {
                ...state,
                result_category: action?.payload,
            }
        },

        updateResultTableValue(state, action) {
            return {
                ...state,
                result_table: action?.payload,
            }
        },

        // END RESULT
    },
})

const getResultCategories = (output: any) => {
    const resultCategoriesCols = Object.keys(output[Object.keys(output)[0]])
    return resultCategoriesCols
}

export const {
    getWarehouses,
    getWarehousesSuccess,
    getWarehousesFailed,
    updatePlanningWarehouseValue,
    updatePlanningStartDateValue,
    updatePlanningEndDateValue,
    postProductivity,
    postProductivitySuccess,
    postProductivityFailed,
    getBenchmarkProductivity,
    getBenchmarkProductivitySuccess,
    getBenchmarkProductivityFailed,
    putBenchmarkProductivity,
    putBenchmarkProductivitySuccess,
    putBenchmarkProductivityFailed,
    updateFlagProductivityTableUpdatedValue,
    postDemand,
    postDemandSuccess,
    postDemandFailed,
    getDemandForecast,
    getDemandForecastSuccess,
    getDemandForecastFailed,
    putDemandForecast,
    putDemandForecastSuccess,
    putDemandForecastFailed,
    updateDemandTableDataColValue,
    updateModifiedDemandTableDataValue,
    updateDemandTableDataValue,
    updateFlagDemandTableUpdatedValue,
    updatePercentageAbsentExpectedValue,
    updateNumCurrentEmployeesValue,
    updateTotalHiringBudgetValue,
    updateCostPerEmployeePerMonthValue,
    updateDayWorkingHoursValue,
    updateResultStartDateValue,
    updateResultEndDateValue,
    postResult,
    postResultSuccess,
    postResultFailed,
    updateResultCategoriesValue,
    updateResultCategoryValue,
    updateResultTableValue,
} = warehouseReducer.actions

export default warehouseReducer.reducer
