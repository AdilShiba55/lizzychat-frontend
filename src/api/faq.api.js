import backendApiClient from "@/api/client/backendApiClient.js";

export const faqApi = {
    search(body) {
        return backendApiClient.get('/api/v1/faq/search', {params: body})
    }
}