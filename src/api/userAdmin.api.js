import backendApiClient from "@/api/client/backendApiClient.js";

export const userAdminApi = {
    search(filter) {
        return backendApiClient.get('/api/v1/admin/user', {params: filter})
    },
    getUserInfo(id) {
        return backendApiClient.get(`/api/v1/admin/user/${id}`)
    },
    edit(form) {
        return backendApiClient.post('/api/v1/admin/user', form)
    },
    uploadAvatar(userId, file) {
        const formData = new FormData()
        formData.append('id', userId)
        formData.append('multipartFile', file)
        return backendApiClient.post('/api/v1/admin/user/avatar', formData)
    }
}