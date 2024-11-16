import backendApiClient from "@/api/client/backendApiClient.js";

export const chatApi = {
    getMessagesWithCharacter(body) {
        return backendApiClient.get('/api/v1/chat/with-character', {params: body})
    },
    getMessages(body) {
        return backendApiClient.get('/api/v1/chat', {params: body})
    },
    sendTextMessage(message, characterId) {
        return backendApiClient.post('/api/v1/chat/text', {message, characterId})
    },
    sendImageMessage(message, characterId, characterImageTypeId) {
        return backendApiClient.post('/api/v1/chat/image', {message, characterId, characterImageTypeId})
    }
}