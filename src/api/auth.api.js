import backendApiClient from "@/api/client/backendApiClient.js";

export const authApi = {
    register(body) {
        return backendApiClient.post('/api/v1/auth/register', body);
    },
    login(body) {
        return backendApiClient.post('/api/v1/auth/login', body);
    },
    refresh() {
        return backendApiClient.post('/api/v1/auth/refresh', {})
    }
}