import backendApiClient from "@/api/client/backendApiClient.js";

export const faqAdminApi = {
    edit(body) {
        return backendApiClient.post('/api/v1/admin/faq', body)
    },
    findById(id) {
        return backendApiClient.get(`/api/v1/admin/faq/${id}`)
    },
    search(body) {
        return backendApiClient.get('/api/v1/admin/faq/search', {params: body})
    }
}