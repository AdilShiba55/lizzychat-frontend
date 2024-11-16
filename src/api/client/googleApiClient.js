import axios from 'axios';

const googleApiClient = axios.create({
    baseURL: 'https://www.googleapis.com'
})

googleApiClient.interceptors.response.use(
    response => {
        return response.data;
})

export default googleApiClient;

