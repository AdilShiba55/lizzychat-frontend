import {authApi} from "@/api/auth.api.js";
import {defineStore} from "pinia";
import {inject} from "vue";
import {verificationApi} from "@/api/verification.api.js";
import {userApi} from "@/api/user.api.js";
import {userPasswordApi} from "@/api/userPassword.api.js";
import {googleAuthApi} from "@/api/googleAuth.api.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        userData: {
            tokenInfo: {},
            userInfo: {}
        },
        loginChecked: false
    }),
    getters: {
        getTokenInfo(state) {
            return state.userData.tokenInfo
        },
        getUserInfo(state) {
            return state.userData.userInfo;
        },
        isAuthorized(state) {
            return state.userData.tokenInfo.token
        },
        isUserInfoPresent(state) {
            return !!state.userData.userInfo?.id
        },
        isVerified(state) {
            return !!state.userData.tokenInfo.dtVerified;
        },
        isAuthorizedAndNotVerified(state) {
            return this.isAuthorized && !this.isVerified
        },
        isAuthorizedAndVerified(state) {
            return this.isAuthorized && this.isVerified
        },
        getEmailShort(state) {
            const email = state.userData.tokenInfo.email;
            const indexOfAmpersat = email.indexOf('@')
            return email.substring(0, indexOfAmpersat)
        },
        isAdmin(state) {
            return state.userData.userInfo.roles?.filter(role => role.name === 'admin').length > 0
        },
        isPremium(state) {
            return !!state.userData.userInfo.premiumDtEnd
        },
        getBalance(state) {
            return state.userData.userInfo.balance;
        },
        isLoginChecked(state) {
            return !!state.loginChecked
        },
        isCharacterEnabled(state) {
            return (character) => character.cost === 0 || state.userData.userInfo.unlockedCharacterIds?.includes(character.id)
        }
    },
    actions: {
        async register(form) {
            const response = await authApi.register(form);
            this.userData.tokenInfo = response.tokenInfo;
            this.userData.userInfo = response.userInfo;
            window.$cookies.set('tokenInfo', response.tokenInfo)
            console.log('userData', this.userData)
        },
        async login(form) {
            const response = await authApi.login(form)
            this.userData.tokenInfo = response.tokenInfo;
            this.userData.userInfo = response.userInfo;
            window.$cookies.set('tokenInfo', response.tokenInfo)
        },
        async getGoogleUser(accessToken) {
            const googleUserInfo = await googleAuthApi.getGoogleUserInfo(accessToken)
            return {
                token: accessToken,
                email: googleUserInfo.email,
                username: googleUserInfo.name
            }
        },
        async registerGoogle(token, username, password) {
            const response = await googleAuthApi.register({
                token: token,
                username: username,
                password: password
            })
            this.userData.tokenInfo = response.tokenInfo;
            this.userData.userInfo = response.userInfo;
            window.$cookies.set('tokenInfo', response.tokenInfo)
        },
        async loginGoogle(token) {
            const response = await googleAuthApi.login(token)
            this.userData.tokenInfo = response.tokenInfo;
            this.userData.userInfo = response.userInfo;
            window.$cookies.set('tokenInfo', response.tokenInfo)
        },
        async checkLogin() {
            const tokenInfo = window.$cookies.get('tokenInfo')
            console.log('checkLogin', tokenInfo)
            if (tokenInfo?.token) {
                const currentDate = new Date()
                const expDate = new Date(tokenInfo.exp * 1000)
                this.userData.tokenInfo = tokenInfo;
                if (currentDate >= expDate) {
                    this.tokenInfo = await authApi.refresh();
                }
                this.userData.userInfo = await userApi.getUserInfo()
                // if(this.userData.userInfo.dtBlocked) {
                //
                // }
            }
            this.loginChecked = true;
        },
        async logout() {
            this.userData.tokenInfo = {}
            this.userData.userInfo = {}
            window.$cookies.remove('tokenInfo')
        },
        async verifyEmail(code) {
            const response = await verificationApi.verifyEmail(code)
            this.userData.tokenInfo = response.tokenInfo;
            this.userData.userInfo = response.userInfo;
            window.$cookies.set('tokenInfo', response.tokenInfo)
        },
        async resetPassword(body) {
            const response = await userPasswordApi.resetPassword(body)
            this.userData.tokenInfo = response.tokenInfo;
            this.userData.userInfo = response.userInfo;
            window.$cookies.set('tokenInfo', response.tokenInfo)
        },
        async editUser(form) {
            this.userData.userInfo = await userApi.edit(form)
        },
        setAvatarToUserInfo(url) {
            this.userData.userInfo.avatarUrl = url;
        },
        addUnlockedCharacterId(characterId) {
            this.userData.userInfo.unlockedCharacterIds.push(characterId)
        },
        increaseUserLastMonthTextMessageCount() {
            this.userData.userInfo.userLastMonthTextMessageCount++;
        },
        increaseUserLastMonthImageMessageCount() {
            this.userData.userInfo.userLastMonthImageMessageCount++;
        }
    }
})