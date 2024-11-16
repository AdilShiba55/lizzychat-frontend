import backendApiClient from "@/api/client/backendApiClient.js";

export const userApi = {
    userExistsByEmail(email) {
        return backendApiClient.get('/api/v1/user/exists', {params: {email}})
    },
    getUserInfo() {
        return backendApiClient.get('/api/v1/user/info')
    },
    edit(form) {
        return backendApiClient.post('/api/v1/user', form)
    },
    uploadAvatar(file) {
        const formData = new FormData()
        formData.append('multipartFile', file)
        return backendApiClient.post('/api/v1/user/avatar', formData)
    }
}