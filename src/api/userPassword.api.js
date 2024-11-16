import backendApiClient from "@/api/client/backendApiClient.js";

export const userPasswordApi = {
    sendResetPasswordCode(body) {
        return backendApiClient.post('/api/v1/user-password/code', body)
    },
    resetPassword(body) {
        return backendApiClient.post('/api/v1/user-password/reset', body)
    }
}