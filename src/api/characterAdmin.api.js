import backendApiClient from "@/api/client/backendApiClient.js";
import qs from "qs";

export const characterAdminApi = {
    search(filter) {
        return backendApiClient.get('/api/v1/admin/character/search', {params: filter})
    },
    findById(id) {
        return backendApiClient.get(`/api/v1/admin/character/${id}`)
    },
    edit(form) {
        return backendApiClient.post('/api/v1/admin/character', form)
    },
    generateImageByPrompt(form) {
        return backendApiClient.get('/api/v1/admin/character/images/generate', {
            params: form,
            paramsSerializer: params => qs.stringify(params)
        })
    }
}