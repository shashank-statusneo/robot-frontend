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
    demand_file_name: '',
    demand_table_data: null,
    percentage_absent_expected: '', 
    num_current_employees: '', 
    total_hiring_budget: '',
    cost_per_employee_per_month: '',
    day_working_hours: ''
   
}

export const warehouseReducer = createSlice({
    name: 'warehouse',
    initialState,
    reducers: {

        // START WAREHOUSE
        getWarehouses(state, action){
            return {
                ...state,
                isLoading: true
            }
        },

        getWarehousesSuccess(state, action){
            return {
                ...state,
                warehouses: action?.payload,
                isLoading: false
            }
        },

        getWarehousesFailed(state, action){
            return {
                ...state,
                message: 'Warehouse fetch failed',
                isLoading: false
            }
        },

        updatePlanningWarehouseValue(state, action) {
            return {
                ...state, 
                planning_warehouse:  action?.payload
            }
        },
       
        updatePlanningStartDateValue(state, action) {
            return {
                ...state, 
                planning_start_date:  action?.payload
            }
        },

        updatePlanningEndDateValue(state, action) {
            return {
                ...state, 
                planning_end_date:  action?.payload
            }
        },
        // END WAREHOUSE

        // START PRODUCTIVITY
        postProductivity(state, action){
            return {
                ...state,
                isLoading: true
            }
        },

        postProductivitySuccess(state, action){
            return {
                ...state,
                productivity_file_name: action?.payload?.fileName,
                message: action?.payload?.message,
                isLoading: false
            }
        },

        postProductivityFailed(state, action){
            return {
                ...state,
                message: 'Productivity file upload failed',
                isLoading: false
            }
        },

        getBenchmarkProductivity(state, action){
            return {
                ...state,
                isLoading: true
            }
        },

        getBenchmarkProductivitySuccess(state, action){
            return {
                ...state,
                productivity_table_data: action?.payload,
                isLoading: false
            }
        },

        getBenchmarkProductivityFailed(state, action){
            return {
                ...state,
                message: 'Benchmark Productivity fetch failed',
                isLoading: false
            }
        },

        putBenchmarkProductivity(state, action){
            return {
                ...state,
                isLoading: true
            }
        },

        putBenchmarkProductivitySuccess(state, action){
            return {
                ...state,
                productivity_table_data:  action?.payload,
                isLoading: false
            }
        },

        putBenchmarkProductivityFailed(state, action){
            return {
                ...state,
                message: 'Benchmark Productivity update failed',
                isLoading: false
            }
        },
        // END PRODUCTIVITY
        
        // START DEMAND
        postDemand(state, action){
            return {
                ...state,
                isLoading: true
            }
        },

        postDemandSuccess(state, action){
            return {
                ...state,
                demand_file_name: action?.payload?.fileName,
                message: action?.payload?.message,
                isLoading: false
            }
        },

        postDemandFailed(state, action){
            return {
                ...state,
                message: 'Demand file upload failed',
                isLoading: false
            }
        },

        getDemandForecast(state, action){
            return {
                ...state,
                isLoading: true
            }
        },

        getDemandForecastSuccess(state, action){
            return {
                ...state,
                demand_table_data: action?.payload,
                isLoading: false
            }
        },

        getDemandForecastFailed(state, action){
            return {
                ...state,
                message: 'Demand Forecast fetch failed',
                isLoading: false
            }
        },

        updateDemandTableDataValue(state, action){
            return {
                ...state, 
                demand_table_data:  action?.payload
            }
        },
        // END DEMAND

        // START REQUIREMENT
        updatePercentageAbsentExpectedValue(state, action){
        return {
            ...state, 
            percentage_absent_expected: action?.payload,
            }
        },

        updateNumCurrentEmployeesValue(state, action){
        return {
            ...state, 
            num_current_employees: action?.payload,
            }
        },

        updateTotalHiringBudgetValue(state, action){
        return {
            ...state, 
            total_hiring_budget: action?.payload,
            }
        },

        updateCostPerEmployeePerMonthValue(state, action){
        return {
            ...state, 
            cost_per_employee_per_month: action?.payload,
            }
        },
        
        updateDayWorkingHoursValue(state, action){
        return {
            ...state, 
            day_working_hours: action?.payload,
            }
        },
        // END REQUIREMENT

    }
})

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
    postDemand,
    postDemandSuccess,
    postDemandFailed,
    getDemandForecast,
    getDemandForecastSuccess,
    getDemandForecastFailed,
    updateDemandTableDataValue,
    updatePercentageAbsentExpectedValue,
    updateNumCurrentEmployeesValue,
    updateTotalHiringBudgetValue,
    updateCostPerEmployeePerMonthValue,
    updateDayWorkingHoursValue
} = warehouseReducer.actions

export default warehouseReducer.reducer

