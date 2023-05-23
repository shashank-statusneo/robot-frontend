import axios from 'axios';


export const axiosPostWrapper = (URL: string, data: any, headers: any) => {
    return axios.post(
        URL,
        {
            ...data,
        },
        {
            headers: headers,
        }
    );
};