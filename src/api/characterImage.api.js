import backendApiClient from "@/api/client/backendApiClient.js";

export const characterImageApi = {
    search(filter) {
        return backendApiClient.get('/api/v1/character_image/sent', {params: filter})
    },
    getCharacterImageFile(id) {
        return backendApiClient.get(`/api/v1/character_image/${id}`)
    }
}