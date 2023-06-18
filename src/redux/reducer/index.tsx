import authReducer from './auth'
import inventoryOptimizerReducer from './inventoryOptimizer'
import algorithmDataReducer from './algorithm'
// import warehouseReducer from './warehouse'
import warehouseSelect from './warehouse/select'
import warehouseProductivity from './warehouse/productivity'
import warehouseDemand from './warehouse/demand'
import warehouseRequirement from './warehouse/requirement'
import warehouseResult from './warehouse/result'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    authReducer: authReducer,
    inventoryOptimizerReducer: inventoryOptimizerReducer,
    algorithmDataReducer: algorithmDataReducer,
    warehouseSelect: warehouseSelect,
    warehouseProductivity: warehouseProductivity,
    warehouseDemand: warehouseDemand,
    warehouseRequirement: warehouseRequirement,
    warehouseResult: warehouseResult,
})
