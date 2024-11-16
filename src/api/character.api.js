import backendApiClient from "@/api/client/backendApiClient.js";
import qs from "qs";

export const characterApi = {
    search(filter) {
        return backendApiClient.get('/api/v1/character/search', {params: filter})
    },
    findOwn(filter) {
        return backendApiClient.get('/api/v1/character/own', {params: filter})
    },
    getCharacterCharItems(filter) {
        return backendApiClient.get('/api/v1/character/chat', {params: filter})
    },
    edit(form) {
        return backendApiClient.post('/api/v1/character', form)
    },
    findById(id) {
        return backendApiClient.get(`/api/v1/character/${id}`)
    },
    generateImageByPrompt(form) {
        return backendApiClient.get('/api/v1/character/images/generate', {
            params: form,
            paramsSerializer: params => qs.stringify(params)
        })
    },
}