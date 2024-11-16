<template>
  <div class="plan-card premium">
    <div v-if="authStore.isLoginChecked && authStore.isAuthorized && authStore.isPremium" class="current-target">CURRENT</div>
    <div class="base-info">
      <h2 class="name">Premium</h2>
      <h3 class="price">
        <span class="not-discount">${{priceWithoutDiscount}}</span> <span class="discount">${{price}} / mo</span>
      </h3>
      <h5 class="description">More text and image messages. daily, 16+ and 18+ images enabled. You also support our project for development</h5>
    </div>

    <div class="button-container">
      <payment-button activator-id="payment-button-premium-plan-card-activator"
                      title="Purchase plan"
                      @purchase="$emit('purchase', $event)"
                      :is-loading="isLoading"/>
    </div>

    <div class="includes">
      <div class="includes-title">Includes:</div>
      <div class="includes-item" v-for="(item, index) in includes" :key="index">
        <v-icon icon="mdi-emoticon-cool-outline"/>
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores/auth.js";
import PaymentButton from "@/components/PaymentButton.vue";
import {paymentApi} from "@/api/payment.api.js";
import {PLAN} from "@/util/constants.js";
import {UtRouter} from "@/util/UtRouter.js";

export default {
  components: {PaymentButton},
  props: {
    current: {type: Boolean, default: false},
    isLoading: {type: Boolean, default: false}
  },
  computed: {
    priceWithoutDiscount() {
      return (this.price + (this.price * 0.75)).toFixed(2);
    }
  },
  data() {
    return {
      authStore: useAuthStore(),
      price: 7.99,
      includes: [
        {
          name: '1000 text messages per month'
        },
        {
          name: '100 image messages per month'
        },
        {
          name: '16+, 18+ photo available'
        },
        {
          name: 'AI creation (with 18+ images)'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/plan-card';

.plan-card.premium {
  .name {
    color: #ffc000;
  }
}
</style>