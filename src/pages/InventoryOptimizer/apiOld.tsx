import { axiosPostWrapper } from '../../utils/helpers';
// import apiClient from '../../services/apiClient';
// import { UPLOAD_INVENTORY } from '../../services/routes';


const url = 'http://127.0.0.1:5000'

const apiEndPoints = {
    uploadInventory: '/inventory/upload',

}

const fileRequestHeader = {
    'Content-Type': 'multipart/form-data'  
}

export const uploadInventoryApi = async (fileType: string, file: any) => {
    return await axiosPostWrapper(
        `${url}/${apiEndPoints.uploadInventory}`,
        {'file_type': fileType, 'file': file}, fileRequestHeader, 
    );
}

export default apiEndPoints;