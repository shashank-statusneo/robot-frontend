import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    message: '',
    demand_master_id: null,
    demand_forecast_file_name: '',
    vendor_master_id: null,
    vendor_file_name: '',
    purchase_order_master_id: null,
    purchase_order_file_name: '',
    volume_discount_master_id: null,
    volume_discount_file_name: '',
    annual_holding_cost: '',

}

export const inventoryOptimizerReducer = createSlice({
    name: 'inventoryOptimizer',
    initialState,
    reducers: {
        postInventory(state, action){
            return {
                ...state,
                isLoading: true
            }
        },
        postDemandInventorySuccess(state, action){
            return {
                ...state,
                demand_master_id: action?.payload?.master_id,
                demand_forecast_file_name: action?.payload?.fileName,
                message: action?.payload?.message,
                isLoading: false
            }
        },
        postVendorInventorySuccess(state, action){
            return {
                ...state,
                vendor_master_id: action?.payload?.master_id,
                vendor_file_name: action?.payload?.fileName,
                message: action?.payload?.message,
                isLoading: false
            }
        },
        postPurchaseOrderInventorySuccess(state, action){
            return {
                ...state,
                purchase_order_master_id: action?.payload?.master_id,
                purchase_order_file_name: action?.payload?.fileName,
                message: action?.payload?.message,
                isLoading: false
            }
        },
        postVolumeDiscountInventorySuccess(state, action){
            return {
                ...state,
                volume_discount_master_id: action?.payload?.master_id,
                volume_discount_file_name: action?.payload?.fileName,
                message: action?.payload?.message,
                isLoading: false
            }
        },

        updateAnnualHoldingCost(state, action) {
            return {
                ...state, 
            annual_holding_cost:  action?.payload
            }
        },

        postInventoryFailed(state, action){
            return {
                ...state,
                message: 'File Upload Failed',
                isLoading: false
            }
        }

    }
})

export const {
    postInventory,
    postDemandInventorySuccess,
    postVendorInventorySuccess,
    postPurchaseOrderInventorySuccess,
    postVolumeDiscountInventorySuccess,
    updateAnnualHoldingCost,
    postInventoryFailed,
} = inventoryOptimizerReducer.actions

export default inventoryOptimizerReducer.reducer

