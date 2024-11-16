import backendApiClient from "@/api/client/backendApiClient.js";

export const verificationApi = {
    sendVerificationCode() {
        return backendApiClient.post('/api/v1/verification/code', {})
    },
    verifyEmail(code) {
        return backendApiClient.post('/api/v1/verification', {code})
    }
}