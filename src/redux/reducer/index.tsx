import authReducer from './auth'
import inventoryOptimizerReducer  from './inventoryOptimizer'
import alalgorithmDataReducer from './algorithm'
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    authReducer: authReducer,
    inventoryOptimizerReducer: inventoryOptimizerReducer,
    alalgorithmDataReducer: alalgorithmDataReducer
})
