import { GET_WAREHOUSE_API, UPLOAD_PRODUCTIVITY_FILE_API, BENCHMARK_PRODUCTIVITY_API,UPLOAD_DEMAND_FILE_API, DEMAND_FORECAST_API } from '../../services/routes'
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
    putBenchmarkProductivity,
    putBenchmarkProductivitySuccess,
    putBenchmarkProductivityFailed,
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
    updatePercentageAbsentExpectedValue,
    updateNumCurrentEmployeesValue,
    updateTotalHiringBudgetValue,
    updateCostPerEmployeePerMonthValue,
    updateDayWorkingHoursValue
} from '../reducer/warehouse'

import { demandForecastTableColumns } from '../../pages/Warehouse/constants'


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
        const response = await warehouseApiClient.get(`${BENCHMARK_PRODUCTIVITY_API}/${id}`);
        if (response.status === 200){            
            return dispatch(getBenchmarkProductivitySuccess(response.data))
        }
        return dispatch(getBenchmarkProductivityFailed(response))
    } catch (err) {
        return dispatch(getBenchmarkProductivityFailed(err))
    }
}

// @ts-ignore
export const putBenchmarkProductivityData = (payload, data) => async dispatch => {

    console.log('Calling action : putBenchmarkProductivityData()')
    // @ts-ignore
    await dispatch(putBenchmarkProductivity())
    try {
        const response = await warehouseApiClient.put(BENCHMARK_PRODUCTIVITY_API, payload);
        if (response.status === 200){            
            return dispatch(putBenchmarkProductivitySuccess(data))
        }
        return dispatch(putBenchmarkProductivityFailed(response))
    } catch (err) {
        return dispatch(putBenchmarkProductivityFailed(err))
    }
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
        const response = await warehouseApiClient.get(`${DEMAND_FORECAST_API}/${id}?start_date=${payload.start_date}&end_date=${payload.end_date}`);
        if (response.status === 200){  

            dispatch(modifyDemandTableData(response.data))
            
            return dispatch(getDemandForecastSuccess(response.data))
        }
        return dispatch(getDemandForecastFailed(response))
    } catch (err) {
        return dispatch(getDemandForecastFailed(err))
    }
}



// @ts-ignore
const modifyDemandTableData  = (data) => async dispatch => {

    const records: any = []
        
    const columnList = (Object.keys(data[Object.keys(data)[0]]))

    for (const col in columnList){
        demandForecastTableColumns.push({
            field: columnList[col],
            headerName: columnList[col],
            editable: true,
            flex: 1,
            type: 'number',
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'header',
            minWidth: 200
        })
    }

    Object.keys(data).forEach((key, index) => {
        const record: any = {
            id: index+1,
            date: key,
        }
        Object.keys(data[key]).forEach((key_x: any, index_x: any) => {
            record[key_x] = data[key][key_x]['demand']
            
        }) 
        records.push(record)
    })

    await dispatch(updateDemandTableDataCol(demandForecastTableColumns))

    await dispatch(updateModifiedDemandTableDataValue(records))
}

// @ts-ignore
export const putDemandForecastData = (payload, data) => async dispatch => {

    console.log('Calling action : putDemandForecastData()')
    // @ts-ignore
    await dispatch(putDemandForecast())
    try {
        const response = await warehouseApiClient.put(DEMAND_FORECAST_API, payload);
        if (response.status === 200){            
            return dispatch(putDemandForecastSuccess(data))
        }
        return dispatch(putDemandForecastFailed(response))
    } catch (err) {
        return dispatch(putDemandForecastFailed(err))
    }
}

// @ts-ignore
export const updateDemandTableDataCol = (payload) => async dispatch => {
    await dispatch(updateDemandTableDataColValue(payload))
}
// @ts-ignore
export const updateModifiedDemandTableData = (payload) => async dispatch => {
    await dispatch(updateModifiedDemandTableDataValue(payload))
}
// @ts-ignore
export const updateDemandTableData = (payload) => async dispatch => {
    await dispatch(updateDemandTableDataValue(payload))
}

// @ts-ignore
export const updatePercentageAbsentExpected = (payload) => async dispatch => {
    await dispatch(updatePercentageAbsentExpectedValue(payload))
}
// @ts-ignore
export const updateNumCurrentEmployees = (payload) => async dispatch => {
    await dispatch(updateNumCurrentEmployeesValue(payload))
}
// @ts-ignore
export const updateTotalHiringBudget = (payload) => async dispatch => {
    await dispatch(updateTotalHiringBudgetValue(payload))
}
// @ts-ignore
export const updateCostPerEmployeePerMonth = (payload) => async dispatch => {
    await dispatch(updateCostPerEmployeePerMonthValue(payload))
}
// @ts-ignore
export const updateDayWorkingHours = (payload) => async dispatch => {
    await dispatch(updateDayWorkingHoursValue(payload))
}