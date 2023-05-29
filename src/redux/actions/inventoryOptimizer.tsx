import { UPLOAD_INVENTORY_API } from '../../services/routes'
import {apiClientForForm} from '../../services/apiClient'
import { postInventory, postDemandInventorySuccess,postVendorInventorySuccess,postPurchaseOrderInventorySuccess, postVolumeDiscountInventorySuccess, postInventoryFailed, updateAnnualHoldingCost } from '../reducer/inventoryOptimizer'
import { useAppSelector } from '../../hooks/redux-hooks';

// @ts-ignore
export const uploadInventory = (payload, fileType, fileName) => async dispatch => {

    console.log('Calling action : uploadInventory()')
    // @ts-ignore
    await dispatch(postInventory())
    try {
        const response = await apiClientForForm.post(UPLOAD_INVENTORY_API, payload);
        if (response.data && response.status === 201){
            response.data.fileName = fileName

            switch(fileType) {
                case 'demand_forecast' : return dispatch(postDemandInventorySuccess(response.data))   
                case 'vendor' : return dispatch(postVendorInventorySuccess(response.data))   
                case 'purchase_order' : return dispatch(postPurchaseOrderInventorySuccess(response.data))   
                case 'volume_discount' : return dispatch(postVolumeDiscountInventorySuccess(response.data))   
            }
        }
        return dispatch(postInventoryFailed(response))
    } catch (err) {
        return dispatch(postInventoryFailed(err))
    }

}

// @ts-ignore
export const updateHoldingCost = (payload) => async dispatch => {
    await dispatch(updateAnnualHoldingCost(payload))
}