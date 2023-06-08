import { GET_WAREHOUSE_API, UPLOAD_PRODUCTIVITY_FILE_API, GET_BENCHMARK_PRODUCTIVITY_API,UPLOAD_DEMAND_FILE_API, GET_DEMAND_FORECAST_API } from '../../services/routes'
import {warehouseApiClient, warehouseApiClientForForm} from '../../services/apiClient'
import { 
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
    updateProductivityTableDataValue,
    postDemand,
    postDemandSuccess,
    postDemandFailed,
    getDemandForecast,
    getDemandForecastSuccess,
    getDemandForecastFailed,
    updateDemandTableDataValue
} from '../reducer/warehouse'

import { demandTableData } from '../../pages/Warehouse/constants'

// @ts-ignore
export const getWarehouse = () => async dispatch => {

    console.log('Calling action : getWarehouse()')
    // @ts-ignore
    await dispatch(getWarehouses())
    try {
        const response = await warehouseApiClient.get(GET_WAREHOUSE_API);
        if (response.status === 200){            
            return dispatch(getWarehousesSuccess(response.data))
        }
        return dispatch(getWarehousesFailed(response))
    } catch (err) {
        return dispatch(getWarehousesFailed(err))
    }
}

// @ts-ignore
export const updatePlanningWarehouse = (payload) => async dispatch => {
    await dispatch(updatePlanningWarehouseValue(payload))
}

// @ts-ignore
export const updatePlanningStartDate = (payload) => async dispatch => {
    await dispatch(updatePlanningStartDateValue(payload))
}

// @ts-ignore
export const updatePlanningEndDate = (payload) => async dispatch => {
    await dispatch(updatePlanningEndDateValue(payload))
}

// @ts-ignore
export const uploadProductivityFile = (payload, id, fileName) => async dispatch => {

    console.log('Calling action : uploadProductivityFile()')
    // @ts-ignore
    await dispatch(postProductivity())
    try {
        const response = await warehouseApiClientForForm.post(`${UPLOAD_PRODUCTIVITY_FILE_API}/${id}`, payload);
        if (response.status === 201){ 
            response.data.fileName = fileName           
            return dispatch(postProductivitySuccess(response.data))
        }
        return dispatch(postProductivityFailed(response))
    } catch (err) {
        return dispatch(postProductivityFailed(err))
    }
}

// @ts-ignore
export const getBenchmarkProductivityData = (id) => async dispatch => {

    console.log('Calling action : getBenchmarkProductivityData()')
    // @ts-ignore
    await dispatch(getBenchmarkProductivity())
    try {
        const response = await warehouseApiClient.get(`${GET_BENCHMARK_PRODUCTIVITY_API}/${id}`);
        if (response.status === 200){            
            return dispatch(getBenchmarkProductivitySuccess(response.data))
        }
        return dispatch(getBenchmarkProductivityFailed(response))
    } catch (err) {
        return dispatch(getBenchmarkProductivityFailed(err))
    }
}

// @ts-ignore
export const updateProductivityTableData = (payload) => async dispatch => {
    await dispatch(updateProductivityTableDataValue(payload))
}

// @ts-ignore
export const uploadDemandFile = (payload, id, fileName) => async dispatch => {

    console.log('Calling action : uploadDemandFile()')
    // @ts-ignore
    await dispatch(postDemand())
    try {
        const response = await warehouseApiClientForForm.post(`${UPLOAD_DEMAND_FILE_API}/${id}`, payload);
        if (response.status === 201){ 
            response.data.fileName = fileName           
            return dispatch(postDemandSuccess(response.data))
        }
        return dispatch(postDemandFailed(response))
    } catch (err) {
        return dispatch(postDemandFailed(err))
    }
}

// @ts-ignore
export const getDemandForecastData = (payload, id) => async dispatch => {

    console.log('Calling action : getDemandForecastData()')
    // @ts-ignore
    await dispatch(getDemandForecast())
    try {
        const response = await warehouseApiClient.get(`${GET_DEMAND_FORECAST_API}/${id}?start_date=${payload.start_date}&end_date=${payload.end_date}`);
        if (response.status === 200){    
            
            // TODO: resolve this
            return dispatch(getDemandForecastSuccess(demandTableData))
        }
        return dispatch(getDemandForecastFailed(response))
    } catch (err) {
        return dispatch(getDemandForecastFailed(err))
    }
}

// @ts-ignore
export const updateDemandTableData = (payload) => async dispatch => {
    await dispatch(updateDemandTableDataValue(payload))
}