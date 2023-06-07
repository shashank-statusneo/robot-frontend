import { GET_WAREHOUSE_API, UPLOAD_PRODUCTIVITY_FILE_API, GET_BENCHMARK_PRODUCTIVITY_API } from '../../services/routes'
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
    getBenchmarkProductivityFailed
} from '../reducer/warehouse'

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