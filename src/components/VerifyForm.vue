<template>
  <div id="verify-form">
    <div class="title">VERIFY EMAIL</div>

    <v-form ref="form">
      <v-otp-input v-model="form.verifyCode"
                   type="text"
                   :disabled="isLoading"
                   :length="codeLength"/>

      <div>
        <v-btn v-if="isSendAvailable"
               class="text-none"
               prepend-icon="mdi-email-newsletter"
               variant="flat"
               :loading="isLoading"
               :disabled="!isSendAvailable"
               @click="sendCode"
               block>{{ buttonText }}
        </v-btn>

        <v-btn v-else
               class="text-none"
               variant="flat"
               :loading="isLoading"
               :disabled="!isSendAvailable"
               @click="sendCode"
               block>{{ buttonText }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import {authApi} from "@/api/auth.api.js";
import {handleError} from "vue";
import {verificationApi} from "@/api/verification.api.js";
import {useAuthStore} from "@/stores/auth.js";
import {useErrorStore} from "@/stores/error.js";

export default {
  props: {},
  watch: {
    async 'form.verifyCode'() {
      await this.verify()
    }
  },
  data() {
    return {
      errorStore: useErrorStore(),
      authStore: useAuthStore(),
      isLoading: false,
      seconds: 0,
      codeLength: 6,
      form: {
        verifyCode: ''
      }
    }
  },
  computed: {
    buttonText() {
      return this.isSendAvailable ? 'GET CODE' : `You can resend the code in ${this.seconds} seconds`
    },
    isSendAvailable() {
      return this.seconds === 0
    }
  },
  methods: {
    async sendCode() {
      this.isLoading = true;
      try {
        await verificationApi.sendVerificationCode();
        this.seconds = Number(import.meta.env.VITE_VERIFICATION_CODE_LIMIT)
        const timerInterval = setInterval(() => {
          this.seconds--;
          if (this.seconds === 0) {
            clearInterval(timerInterval);
          }
        }, 1000); // Run every second (1000 milliseconds)
      } catch (error) {
        await this.errorStore.handleError(error, this.$refs.form)
      } finally {
        this.isLoading = false;
      }
    },
    async verify() {
      if (this.form.verifyCode.length === this.codeLength) {
        this.isLoading = true;
        try {
          await this.authStore.verifyEmail(this.form.verifyCode)
          this.$emit('close')
        } catch (error) {
          this.form.verifyCode = ''
          await this.errorStore.handleError(error, this.$refs.form)
        } finally {
          this.isLoading = false;
        }
      }
    }
  }
}
</script>

<style lang="scss">
#verify-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    gap: 10px;

    .v-btn {
      box-shadow: 0 0 14px #efeff2;

      .v-btn__content {
        color: black;
      }
    }
  }
}
</style>