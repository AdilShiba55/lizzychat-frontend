import backendApiClient from "@/api/client/backendApiClient.js";

export const paymentApi = {
    createPlanPayment(sourceId, planId) {
        return backendApiClient.post(`/api/v1/payment/${sourceId}/plan/${planId}`)
    },

    createCrystalPayment(sourceId, crystalCount) {
        return backendApiClient.post(`/api/v1/payment/${sourceId}/crystal/${crystalCount}`)
    },

    confirmPayment(sourceId, body) {
        return backendApiClient.post(`/api/v1/payment/confirm/${sourceId}`, body)
    }
}