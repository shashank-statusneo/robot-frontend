import axios from 'axios'
import UserSession from './auth'
import { REFREST_TOKEN } from './routes'

const token = UserSession.getToken()

export const apiClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
    },
})

export const warehouseApiClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL_WAREHOUSE}`,
    headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
    },
})

export const warehouseApiClientForForm = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL_WAREHOUSE}`,
    headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'multipart/form-data'
    },
})

export const apiClientForForm = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'multipart/form-data'
    },
})

apiClient.interceptors.response.use(
    response => {
        console.log(response)
        return response
    },
    async (error) => {
        console.log(error)
        const originalRequest = error.config;
        console.log(originalRequest)
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            //@ts-ignore
            const response = await apiClient.get(REFREST_TOKEN, {Authorization: `Bearer ${UserSession.getRefreshToken()}`});          
            console.log(response)
            const user = UserSession.getUser()
            //@ts-ignore
            user['access_token'] = response.data.access_token
            //@ts-ignore
            UserSession.setUser(user);
            return apiClient(originalRequest);
        }
        if (!originalRequest || !originalRequest.retry) {   
            return Promise.reject(error)
        }
        originalRequest.retry -= 1
        const delayRetryRequest = new Promise(resolve => {
            setTimeout(() => {
                console.log('retry the request', originalRequest.url)
                //@ts-ignore
                resolve()
            }, originalRequest.retryDelay || 1000)
        })
        return delayRetryRequest.then(() => apiClient(originalRequest))
    },
)

