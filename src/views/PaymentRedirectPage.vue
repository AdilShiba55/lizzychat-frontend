<template>
  <div id="success-premium-page">
    <v-progress-circular
        v-if="isLoading"
        size="70"
        width="15"
        color="primary"
        indeterminate/>
    <template v-else>
      <h1 class="title">The payment was not successful. @_@</h1>
      <h2 class="description">Contact us, please</h2>
      <div class="button-container">
        <v-btn class="text-none mb-4"
               variant="flat"
               :loading="isLoading"
               prepend-icon="mdi-email-newsletter"
               @click="openContact"
               block>Contact us</v-btn>
      </div>
    </template>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores/auth.js";
import {useContactDialogStore, useDialogStore} from "@/stores/dialog.js";
import {paymentApi} from "@/api/payment.api.js";
import router from "@/router/index.js";
import {useErrorStore} from "@/stores/error.js";

export default {
  data() {
    return {
      errorStore: useErrorStore(),
      authStore: useAuthStore(),
      contactDialog: useContactDialogStore(),
      loginDialog: useDialogStore().getLoginDialog,
      isLoading: true
    }
  },
  async created() {
    await this.confirm()
  },
  methods: {
    async confirm() {
      console.log('PAYMENT REDIRECT PAGE')
      const sourceId = this.$route.params?.sourceId
      const paymentId = this.$route.query?.paymentId
      const payerId = this.$route.query?.PayerID
      const token = this.$route.query?.token
      try {
        await paymentApi.confirmPayment(sourceId, {paymentId, payerId, token})
        await this.authStore.checkLogin()
        await router.push('/explore')
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        this.isLoading = false;
      }
    },
    openContact() {
      if(this.authStore.isAuthorized) {
        this.contactDialog.show()
      } else {
        this.loginDialog.openLoginOrVerify()
      }
    }
  }
}
</script>

<style lang="scss">
#success-premium-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  color: white;

  .title, .description {
    text-align: center;
    font-weight: bold;
  }

  .button-container {
    margin-top: 20px;
  }
}
</style>