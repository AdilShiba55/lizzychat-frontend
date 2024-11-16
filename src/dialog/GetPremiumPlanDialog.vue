<template>
  <base-dialog id="get-premium-dialog"
              title="Get Premium"
              width="400">

    <template v-slot:content>
      <premium-plan-card :is-loading="isLoading"
                         @purchase="getPremium"/>
    </template>
  </base-dialog>
</template>

<script>
import BaseDialog from "@/dialog/BaseDialog.vue";
import PremiumPlanCard from "@/components/PremiumPlanCard.vue";
import {paymentApi} from "@/api/payment.api.js";
import {PLAN} from "@/util/constants.js";
import {UtRouter} from "@/util/UtRouter.js";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {PremiumPlanCard, BaseDialog},
  data() {
    return {
      errorStore: useErrorStore(),
      isLoading: false
    }
  },
  methods: {
    async getPremium(sourceId) {
      this.isLoading = true;
      this.isPremiumLoading = true;
      try {
        const url = await paymentApi.createPlanPayment(sourceId, PLAN.premium)
        UtRouter.openUrlBlank(url)
      } catch (error) {
        this.isLoading = false;
        await this.errorStore.handleError(error)
      }
    }
  }
}
</script>

<style lang="scss">
#get-premium-dialog {
  .header, .footer {
    display: none;
  }

  .content {
    .plan-card {
      width: 100%;
      box-shadow: 0 0 14px #ffc000;
      border: 2px #ffc000 solid;
    }
  }
}
</style>