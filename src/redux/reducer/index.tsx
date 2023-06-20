import authReducer from './auth'
import  inventoryOptimizer from './inventory/optimizer'
import  inventoryResult  from './inventory/result'
import algorithmDataReducer from './algorithm'
import warehouseSelect from './warehouse/select'
import warehouseProductivity from './warehouse/productivity'
import warehouseDemand from './warehouse/demand'
import warehouseRequirement from './warehouse/requirement'
import warehouseResult from './warehouse/result'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    authReducer: authReducer,
    inventoryOptimizer: inventoryOptimizer,
    inventoryResult: inventoryResult,
    algorithmDataReducer: algorithmDataReducer,
    warehouseSelect: warehouseSelect,
    warehouseProductivity: warehouseProductivity,
    warehouseDemand: warehouseDemand,
    warehouseRequirement: warehouseRequirement,
    warehouseResult: warehouseResult,
})
