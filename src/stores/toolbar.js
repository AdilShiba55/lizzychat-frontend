import {defineStore} from "pinia";
import {UtRouter} from "@/util/UtRouter.js";

export const useToolbarStore = defineStore('toolbar', {
    state: () => ({
        backPath: null,
        showDiscountButton: false
    }),
    getters: {
        isBackPathPresent(state) {
            return !!state.backPath
        },
        getBackPath(state) {
            return state.backPath
        },
        isDiscountButtonShown(state) {
            return state.showDiscountButton
        }
    },
    actions: {
        setBackPath(path) {
            this.backPath = path;
        },
        setShowDiscountButton(value) {
            this.showDiscountButton = value;
        }
    }
})
