<template>
  <div id="reset-password-form">
    <div class="title">RESET PASSWORD</div>

    <v-form ref="form">

      <text-field :form="form"
                  field-name="email"
                  label="email"
                  :errors="errorStore.errors" />

      <password-text-field :form="form"
                           label="New password"
                           :disabled="isSendCode || isResetting"
                           :errors="errorStore.errors"/>

      <v-otp-input v-model="form.code"
                   type="text"
                   :disabled="isSendCode || isResetting"
                   :length="codeLength"/>

      <div class="button-containers">
        <div class="button-container">
          <v-btn v-if="isSendAvailable"
                 class="text-none"
                 prepend-icon="mdi-email-newsletter"
                 variant="flat"
                 :loading="isSendCode"
                 :disabled="!form.email || !isSendAvailable"
                 @click="sendCode"
                 block>{{ buttonText }}
          </v-btn>

          <v-btn v-else
                 class="text-none"
                 variant="flat"
                 :loading="isSendCode"
                 :disabled="!isSendAvailable"
                 @click="sendCode"
                 block>{{ buttonText }}</v-btn>
        </div>

        <div class="button-container">
          <v-btn class="text-none"
                 variant="flat"
                 :loading="isResetting"
                 :disabled="!form.email || !form.password || form.code.length < codeLength"
                 @click="resetPassword"
                 block>Reset</v-btn>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores/auth.js";
import PasswordTextField from "@/components/PasswordTextField.vue";
import {userPasswordApi} from "@/api/userPassword.api.js";
import TextField from "@/components/TextField.vue";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {TextField, PasswordTextField},
  props: {},
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
      isSendCode: false,
      isResetting: false,
      seconds: 0,
      codeLength: 6,
      form: {
        email: '',
        password: '',
        code: ''
      }
    }
  },
  computed: {
    buttonText() {
      return this.isSendAvailable ? 'GET CODE' : `${this.seconds} seconds`
    },
    isSendAvailable() {
      return this.seconds === 0
    }
  },
  methods: {
    async sendCode() {
      this.isSendCode = true;
      try {
        await userPasswordApi.sendResetPasswordCode(this.form)
        this.seconds = Number(import.meta.env.VITE_RESET_PASSWORD_CODE_LIMIT)
        const timerInterval = setInterval(() => {
          this.seconds--;
          if (this.seconds === 0) {
            clearInterval(timerInterval);
          }
        }, 1000);
      } catch (error) {
        await this.errorStore.handleError(error, this.$refs.form)
      } finally {
        this.isSendCode = false;
      }
    },
    async resetPassword() {
      if (this.form.code.length === this.codeLength) {
        this.isResetting = true;
        try {
          await this.authStore.resetPassword(this.form)
          this.$emit('close')
        } catch (error) {
          this.form.verifyCode = ''
          await this.errorStore.handleError(error, this.$refs.form)
        } finally {
          this.isResetting = false;
        }
      }
    }
  }
}
</script>

<style lang="scss">
#reset-password-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  .title {
    text-align: center;
    font-size: 30px;
    color: white;
    font-weight: bold;
    margin-bottom: 10px;
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

    .v-input:first-child {
      margin-bottom: 7px;
    }

    .v-otp-input {
      &__content {
        padding: 0 0 20px 0;
      }
    }

    .button-containers {
      display: flex;
      //flex-direction: column;
      gap: 10px;
      .button-container {
        width: 100%;
        .v-btn {
          box-shadow: 0 0 14px #efeff2;
        }
      }
    }
  }
}
</style>