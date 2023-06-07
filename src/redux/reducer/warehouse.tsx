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
    productivity_table_data: '',
}

export const warehouseReducer = createSlice({
    name: 'warehouse',
    initialState,
    reducers: {
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
    getBenchmarkProductivityFailed
} = warehouseReducer.actions

export default warehouseReducer.reducer

