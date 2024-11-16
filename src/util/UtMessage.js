import {MESSAGE_TYPE} from "@/util/constants.js";

export const UtMessage = {
    getMessageCountFieldName(messageTypeId) {
        if(messageTypeId === MESSAGE_TYPE.aiText) {
            return 'userLastMonthTextMessageCount'
        } else if(messageTypeId === MESSAGE_TYPE.aiImage) {
            return 'userLastMonthImageMessageCount'
        }
    },
    getLimitFieldName(messageTypeId) {
        if(messageTypeId === MESSAGE_TYPE.aiText) {
            return 'textMessageLimit'
        } else if(messageTypeId === MESSAGE_TYPE.aiImage) {
            return 'imageMessageLimit'
        }
    },
}