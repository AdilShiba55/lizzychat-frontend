<template>
  <div class="plan-card base">
    <div v-if="authStore.isAuthorized && !authStore.isPremium" class="current-target">CURRENT</div>
    <div class="base-info">
      <h2 class="name">Base</h2>
      <h3 class="price">
        <span>Free</span>
      </h3>
      <h5 class="description">Limited text and image messages. <br/> Only daily and 16+ images enabled.</h5>
    </div>

    <div class="button-container">
      <v-btn class="text-none mb-4"
             size="large"
             disabled
             block>
        <span>Purchase plan</span>
      </v-btn>
    </div>

    <div class="includes">
      <div class="includes-title">Includes:</div>
      <div class="includes-item" v-for="(item, index) in includes" :key="index">
        <v-icon icon="mdi-emoticon-angry-outline"/>
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores/auth.js";

export default {
  props: {
    current: {type: Boolean, default: false}
  },
  data() {
    return {
      authStore: useAuthStore(),
      includes: [
        {
          name: '1 text messages per month'
        },
        {
          name: '1 image messages per month'
        },
        {
          name: '16+ photo available'
        },
        {
          name: 'AI creation (no 18+ images)'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/plan-card';

.plan-card.base {
  .name, .price {
    color: gray;
  }
}
</style>