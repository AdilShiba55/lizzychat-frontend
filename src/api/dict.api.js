import backendApiClient from "@/api/client/backendApiClient.js";
import qs from "qs";

export const dictApi = {
    findById(dictName, id) {
        return backendApiClient.get(`/api/v1/dict/${dictName}/${id}`)
    },
    findNotArchived(dictNames) {
        return backendApiClient.get('api/v1/dict/notArchived', {
            params: {dictNames},
            paramsSerializer: params => qs.stringify(params)
        })
    }
}