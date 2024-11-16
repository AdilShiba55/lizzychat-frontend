import {defineStore} from "pinia";
import {useAuthStore} from "@/stores/auth.js";

export const useContactDialogStore = defineStore('contactDialog', {
    state: () => ({
        opened: false
    }),
    actions: {
        show() {
            this.opened = true;
        },
        close() {
            this.opened = false;
        }
    }
})

export const useContactEditDialogStore = defineStore('contactEditDialog', {
    state: () => ({
        opened: false,
        id: null,
        successCount: 0
    }),
    actions: {
        show(id) {
            console.log('id', id)
            this.id = id;
            this.opened = true;
        },
        close() {
            this.opened = false;
            this.id = null;
        }
    }
})

export const useDialogStore = defineStore('dialog', {
    state: () => ({
        loginDialog: {
            opened: false,
            formNum: 1,
            googleUser: null,
            openLoginOrVerify() {
                // const authStore = useAuthStore()
                // if(authStore.isAuthorizedAndNotVerified) {
                //     this.changeFormToVerify()
                // } else {
                //     this.changeFormToLogin()
                // }
                this.changeFormToLogin()
                this.opened = true;
            },
            openRegister() {
              this.changeFormToRegister()
              this.opened = true;
            },
            close() {
                this.opened = false;
                this.googleUser = null;
            },
            changeFormToLogin(googleUser) {
                this.googleUser = googleUser;
                this.formNum = 1;
            },
            changeFormToRegister(googleUser) {
                this.googleUser = googleUser;
                this.formNum = 2;
            },
            changeFormToVerify() {
                this.formNum = 3;
            },
            changeFormToResetPassword() {
                this.formNum = 4;
            },
            isLoginForm() {
                return this.formNum === 1;
            },
            isRegisterForm() {
                return this.formNum === 2;
            },
            isVerifyForm() {
                return this.formNum === 3;
            },
            isResetPasswordForm() {
                return this.formNum === 4;
            }
        },
        userEditDialog: {
            opened: false,
            id: null,
            success: 0,
            show(id) {
                this.id = id;
                this.opened = true;
            },
            close() {
                this.opened = false;
                this.id = null;
            },
            triggerSuccess() {
                this.success++;
            }
        },
        addBalanceDialog: {
            opened: false,
            show() {
                this.opened = true;
            },
            close() {
                this.opened = false;
            }
        },
        unlockCharacterDialog: {
            opened: false,
            character: null,
            show(character) {
                this.character = character;
                this.opened = true;
            },
            close() {
                this.opened = false;
                this.character = null
            }
        },
        faqEditDialog: {
            opened: false,
            id: null,
            success: 0,
            show(id) {
                this.id = id;
                this.opened = true;
            },
            close() {
                this.opened = false;
                this.id = null
            },
            triggerSuccess() {
                this.success++;
            }
        },
        premiumDialog: {
            opened: false,
            success: 0,
            show() {
                this.opened = true;
            },
            close() {
                this.opened = false;
            },
            triggerSuccess() {
                this.success++;
            }
        }
    }),
    getters: {
        getLoginDialog(state) {
            return state.loginDialog
        },
        getUserEditDialog(state) {
            return state.userEditDialog
        },
        getAddBalanceDialog(state) {
            return state.addBalanceDialog
        },
        getUnlockCharacterDialog(state) {
            return state.unlockCharacterDialog
        },
        getFaqEditDialog(state) {
            return state.faqEditDialog
        },
        getPremiumDialog(state) {
            return state.premiumDialog
        }
    },
    actions: {}
})
