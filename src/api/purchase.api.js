import backendApiClient from "@/api/client/backendApiClient.js";

export const purchaseApi = {
    unlockCharacter(characterId) {
        return backendApiClient.post('/api/v1/purchase/unlock-character', {characterId})
    }
}