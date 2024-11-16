import backendApiClient from "@/api/client/backendApiClient.js";

export const contactRequestAdminApi = {
    search(filter) {
        return backendApiClient.get('/api/v1/admin/contact_request', {params: filter})
    },
    findById(id) {
        return backendApiClient.get(`/api/v1/admin/contact_request/${id}`)
    },
    archive(id) {
        return backendApiClient.delete(`/api/v1/admin/contact_request/${id}`)
    }
}