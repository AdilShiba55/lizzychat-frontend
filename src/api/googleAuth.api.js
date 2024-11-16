import backendApiClient from "@/api/client/backendApiClient.js";
import axios from "axios";
import googleApiClient from "@/api/client/googleApiClient.js";

export const googleAuthApi = {
    register(form) {
        return backendApiClient.post('/api/v1/google/auth/register', form)
    },
    login(accessToken) {
        return backendApiClient.post('/api/v1/google/auth/login', {accessToken})
    },
    getGoogleUserInfo(accessToken) {
        return googleApiClient.get('/oauth2/v1/userinfo', {
            params: {
                access_token: accessToken
            }
        })
    }
}