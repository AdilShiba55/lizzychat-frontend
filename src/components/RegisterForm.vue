<template>
  <div id="register-form">
    <div class="title">CREATE AN ACCOUNT</div>
<!--    <div class="description">Create and connect with a virtual AI partner who listens, responds and appreciates you.</div>-->
    <v-form ref="form">

      <text-field :form="form"
                  field-name="email"
                  label="Your email"
                  :disabled="isLoading || isGoogle"
                  :errors="errorStore.errors"/>

      <text-field :form="form"
                  field-name="username"
                  label="Your username"
                  :disabled="isLoading"
                  :errors="errorStore.errors"/>

      <password-text-field :form="form"
                           :disabled="isLoading"
                           :errors="errorStore.errors"/>

      <v-btn class="text-none"
             variant="flat"
             @click="reg"
             :loading="isLoading"
             :disabled="isLoading"
             block>{{buttonText}}</v-btn>
    </v-form>
    <div class="options">
      <span class="option" :class="{'events-disabled':isLoading}" @click="$emit('toLogin')">Sign In</span>
      <span> | </span>
      <span class="option" :class="{'events-disabled':isLoading}" @click="$emit('toResetPassword')">Forgot password?</span>
    </div>
    <div class="google-button-container">
      <google-sign-button v-if="!isGoogle"
                          :disabled="isLoading"
                          @click="googleClient.login"/>
    </div>
  </div>
</template>

<script>
import TextField from "@/components/TextField.vue";
import PasswordTextField from "@/components/PasswordTextField.vue";
import {useAuthStore} from "@/stores/auth.js";
import {UtRouter} from "@/util/UtRouter.js";
import GoogleSignButton from "@/components/GoogleSignButton.vue";
import {userApi} from "@/api/user.api.js";
import {useTokenClient} from "vue3-google-signin";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {GoogleSignButton, PasswordTextField, TextField},
  props: {
    googleUserProps: {type: Object, default: {}}
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
      googleUser: {...this.googleUserProps},
      isLoading: false,
      form: {
        username: '',
        email: '',
        password: ''
      },
      googleClient: useTokenClient({
        disableAutomaticPrompt: true,
        onSuccess: this.setGoogleInfo,
        onError: () => {}
      })
    }
  },
  created() {
    if(this.isGoogle) {
      this.form.email = this.googleUser.email;
      this.form.username = this.googleUser.username;
    }
  },
  computed: {
    isGoogle() {
      return !!this.googleUser.token
    },
    UtRouter() {
      return UtRouter
    },
    buttonText() {
      return this.isGoogle ? 'Continue with Google' : 'Continue'
    }
  },
  methods: {
    async reg() {
      if(this.isGoogle) {
        await this.registerGoogle()
      } else {
        await this.register()
      }
    },
    async register() {
      this.isLoading = true;
      try {
        await this.authStore.register(this.form)
        this.$emit('close')
      } catch (error) {
        await this.errorStore.handleError(error, this.$refs.form)
      } finally {
        this.isLoading = false;
      }
    },
    async setGoogleInfo(googleTokenInfo) {
      this.isLoading = true;
      try {
        const googleUser = await this.authStore.getGoogleUser(googleTokenInfo.access_token);
        const userExistsByEmail = await userApi.userExistsByEmail(googleUser.email)
        if(userExistsByEmail) {
          await this.authStore.loginGoogle(googleUser.token)
          this.$emit('close')
        } else {
          this.form.email = googleUser.email;
          this.form.username = googleUser.username;
          this.googleUser = googleUser;
        }
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        this.isLoading = false;
      }
    },
    async registerGoogle() {
      this.isLoading = true;
      try {
        await this.authStore.registerGoogle(this.googleUser.token, this.form.username, this.form.password)
        this.$emit('close')
      } catch (error) {
        await this.errorStore.handleError(error, this.$refs.form)
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style lang="scss">
  #register-form {
    width: 100%;
    .title {
      text-align: center;
      font-size: 28px;
      color: white;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .description {
      color: white;
      font-weight: 500;
      margin-bottom: 20px;
      text-align: center;
    }
    .v-form {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .v-input {
        .v-field {
          background-color: rgba(0, 0, 0, 0.4);

          label {
            color: white;
            font-weight: bold;
          }
        }
      }
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