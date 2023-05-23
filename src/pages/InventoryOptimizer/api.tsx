import { axiosPostWrapper } from '../../utils/helpers';

const url = 'http://127.0.0.1:5000'

const apiEndPoints = {
    uploadDemandForecast: '/demand_forecast',
    uploadVendorData: '/vendor',
}

const fileRequestHeader = {
    'Content-Type': 'multipart/form-data'
  }

export const uploadDemandForecastData = async (requestType: string, data: any) => {
    return await axiosPostWrapper(
        `${url}/${apiEndPoints.uploadDemandForecast}`,
        data, fileRequestHeader, 
    );
}

export default apiEndPoints;