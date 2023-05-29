import authReducer from './auth'
import inventoryOptimizerReducer  from './inventoryOptimizer'
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    authReducer: authReducer,
    inventoryOptimizerReducer: inventoryOptimizerReducer
})
