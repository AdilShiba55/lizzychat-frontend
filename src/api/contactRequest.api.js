import backendApiClient from "@/api/client/backendApiClient.js";

export const contactRequestApi = {
    create(form) {
        return backendApiClient.post('/api/v1/contact_request', form)
    }
}