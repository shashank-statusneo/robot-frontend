import authReducer from './auth'
import inventoryOptimizerReducer  from './inventoryOptimizer'
import algorithmDataReducer from './algorithm'
import warehouseReducer  from './warehouse';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    authReducer: authReducer,
    inventoryOptimizerReducer: inventoryOptimizerReducer,
    algorithmDataReducer: algorithmDataReducer,
    warehouseReducer: warehouseReducer
})
