<template>
  <div id="login-form">
    <div class="title">SIGN IN</div>
    <div class="description">Enter your email and password</div>
    <v-form ref="form">
      <text-field :form="form"
                  field-name="usernameOrEmail"
                  label="Your username or email"
                  :disabled="isLoading"
                  :errors="errorStore.errors"/>
      <password-text-field :form="form"
                           :disabled="isLoading"
                           :errors="errorStore.errors"/>
      <v-btn class="text-none"
             variant="flat"
             :loading="isLoading"
             :disabled="isLoading"
             @click="login"
             block>{{buttonText}}</v-btn>
    </v-form>
    <div class="options">
      <span class="option"
            :class="{'events-disabled':isLoading}"
            @click="$emit('toRegister')">
        Create an account
      </span>
      <span> | </span>
      <span class="option"
            :class="{'events-disabled':isLoading}"
            @click="$emit('toResetPassword')">
        Forgot password?
      </span>
    </div>
    <div class="google-button-container">
      <google-sign-button v-if="!googleUser"
                          :disa="isLoading"
                          @click="googleClient.login"/>
    </div>
  </div>
</template>

<script>
import PasswordTextField from "@/components/PasswordTextField.vue";
import TextField from "@/components/TextField.vue";
import {useAuthStore} from "@/stores/auth.js";
import {UtRouter} from "@/util/UtRouter.js";
import GoogleSignButton from "@/components/GoogleSignButton.vue";
import {userApi} from "@/api/user.api.js";
import {useTokenClient} from "vue3-google-signin";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {GoogleSignButton, TextField, PasswordTextField},
  props: {
    googleUser: {type: Object}
  },
  watch: {
    form: {
      handler() {
        this.errorStore.resetError(this.$refs.form)
      },
      deep: true
    },
  },
  data() {
    return {
      errorStore: useErrorStore(),
      authStore: useAuthStore(),
      isLoading: false,
      form: {
        usernameOrEmail: '',
        password: ''
      },
      googleClient: useTokenClient({
        disableAutomaticPrompt: true,
        onSuccess: this.loginGoogle,
        onError: () => {}
      })
    }
  },
  computed: {
    UtRouter() {
      return UtRouter
    },
    buttonText() {
      return this.googleUser ? 'Continue with Google' : 'Continue'
    }
  },
  methods: {
    async login() {
      this.isLoading = true;
      try {
        await this.authStore.login(this.form)
        this.emitter.emit('login')
        this.$emit('close')
      } catch (error) {
        await this.errorStore.handleError(error, this.$refs.form)
      } finally {
        this.isLoading = false;
      }
    },
    async loginGoogle(googleTokenInfo) {
      this.isLoading = true;
      try {
        const googleUser = await this.authStore.getGoogleUser(googleTokenInfo.access_token)
        const userExistsByEmail = await userApi.userExistsByEmail(googleUser.email)
        if(userExistsByEmail) {
          await this.authStore.loginGoogle(googleUser.token)
          this.$emit('close')
        } else {
          this.$emit('toRegister', googleUser)
        }
      } catch (error) {
        console.log('error', error)
        await this.errorStore.handleError(error)
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style lang="scss">
#login-form {
  width: 100%;
  .title {
    text-align: center;
    font-size: 40px;
    color: white;
    font-weight: bold;
  }
  .description {
    color: white;
    font-weight: 500;
    margin-bottom: 30px;
    text-align: center;
  }

  .v-form {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .v-btn {
      color: $main-black;
      box-shadow: 0 0 14px #efeff2;
    }
  }
  .options {
    display: flex;
    color: white;
    gap: 12px;
    justify-content: right;
    margin: 10px 0;

    .option {
      cursor: pointer;
    }
    .option:hover {
      text-decoration: underline;
    }
  }

  .google-button-container {
    display: flex;
    justify-content: end;
  }
}
</style>