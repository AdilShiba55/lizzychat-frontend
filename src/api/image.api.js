import backendApiClient from "@/api/client/backendApiClient.js";
import qs from "qs";

export const imageApi = {
    generateByPrompt(prompt, characterTypeId) {
        return backendApiClient.get('/api/v1/image/admin/prompt', {params: {prompt, characterTypeId}})
    },
    generateByCharacterForm(form) {
        return backendApiClient.get('/api/v1/image/characterForm', {
            params: form,
            paramsSerializer: params => qs.stringify(params)
        })
    },
    generateByCharacterFormAdmin(form) {
        return backendApiClient.get('/api/v1/admin/image/characterForm', {
            params: form,
            paramsSerializer: params => qs.stringify(params)
        })
    }
}