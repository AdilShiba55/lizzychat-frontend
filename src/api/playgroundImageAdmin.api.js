import backendApiClient from "@/api/client/backendApiClient.js";
import qs from "qs";

export const playgroundImageAdminApi = {
    findAll() {
        return backendApiClient.get('/api/v1/admin/playground_image')
    },
    create(file) {
        return backendApiClient.post('/api/v1/admin/playground_image', file)
    },
    delete(id) {
        return backendApiClient.delete(`/api/v1/admin/playground_image/${id}`)
    },
    resize(body) {
        return backendApiClient.post('/api/v1/admin/playground_image/resize', body)
    }
}