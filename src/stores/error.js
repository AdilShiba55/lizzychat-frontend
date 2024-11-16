import {defineStore} from "pinia";
import {UtError} from "@/util/UtError.js";

export const useErrorStore = defineStore('error', {
    state: () => ({
        errors: [],
        openErrorDialog: false
    }),
    getters: {
        getErrors(state) {
            return state.errors
        },
        isErrorPresent(state) {
            return state.errors.length > 0
        }
    },
    actions: {
        showError(errors) {
            this.errors = errors;
        },
        hideError() {
            this.errors = []
        },
        async handleError(exception, ref) {
            const array = exception?.response?.data?.errors;
            this.openErrorDialog = !ref
            if (!!array && Array.isArray(array) && array.length > 0) {
                console.log('array', array)
                this.showError(array)
                if(ref) {
                    await ref.validate();
                    await ref.validate();
                }
            } else {
                const errorMessage = exception?.response?.data?.message;
                this.showError(errorMessage ? [errorMessage] : [exception.message])
            }
        },
        async resetError(ref) {
            ref?.resetValidation()
            this.errors = []
        },
        getError(fieldName) {
            return UtError.getError(fieldName, this.errors)
        },
        getRule(fieldName) {
            return UtError.getRule(fieldName, this.errors)
        }
    }
})
