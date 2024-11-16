import axios from 'axios';

const backendApiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

backendApiClient.interceptors.request.use(
    config => {
        const tokenInfo = window.$cookies.get('tokenInfo')
        if(tokenInfo?.token) {
            config.headers.Authorization = 'Bearer ' + tokenInfo.token
        }
        return config;
})

backendApiClient.interceptors.response.use(
    response => {
        return response.data;
}, error => {
        return error.response.data
    }
)

export default backendApiClient;

