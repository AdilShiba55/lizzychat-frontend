<template>
  <div id="payment-button"
       @click="menuOpened = !menuOpened">
    <v-btn :id="activatorId"
           class="text-none mb-4"
           size="large"
           :rounded="rounded"
           :variant="variant"
           :loading="isLoading"
           block>
      <span>{{title}}</span>
      <v-icon class="arrow-icon" :icon="arrowIcon"/>
    </v-btn>
    <v-menu v-model="menuOpened"
            class="payment-button"
            :class="{'rounded':rounded}"
            :close-on-content-click="false"
            transition="slide-y-transition"
            :activator="`#${activatorId}`">

      <v-list>
        <v-list-item>
          <v-btn class="paypal-button"
                 :rounded="rounded"
                 @click="payment(PAYMENT_SOURCE.paypal)"
                 block>
            <img class="paypal-img" src="/paypal_64x64.png" alt="paypal-icon"/>
            <div><span class="pay">Pay</span><span class="pal">Pal</span></div>
            <img class="paypal-img" src="/paypal_64x64.png" alt="paypal-icon"/>
          </v-btn>
        </v-list-item>

<!--        <v-list-item>-->
<!--          <v-btn class="stripe-button"-->
<!--                 text="stripe"-->
<!--                 :rounded="rounded"-->
<!--                 @click="payment(PAYMENT_SOURCE.paypal)"-->
<!--                 disabled-->
<!--                 block/>-->
<!--        </v-list-item>-->
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import {PAYMENT_SOURCE} from "@/util/constants.js";
import {useAuthStore} from "@/stores/auth.js";
import {useDialogStore} from "@/stores/dialog.js";

export default {
  props: {
    title: {type: String, required: true},
    activatorId: {type: String, required: true},
    variant: {type: String, default: 'flat'},
    rounded: {type: Boolean, default: false},
    isLoading: {type: Boolean, default: false}
  },
  data() {
    return {
      menuOpened: false,
      authStore: useAuthStore(),
      loginDialog: useDialogStore().getLoginDialog
    }
  },
  computed: {
    PAYMENT_SOURCE() {
      return PAYMENT_SOURCE
    },
    arrowIcon() {
      return this.menuOpened ? 'mdi-chevron-down' : 'mdi-chevron-up'
    }
  },
  methods: {
    payment(sourceId) {
      this.menuOpened = false;
      if(this.authStore.isAuthorized) {
        this.$emit('purchase', sourceId)
      } else {
        this.loginDialog.openLoginOrVerify()
      }
    }
  }
}
</script>

<style lang="scss">
.v-menu.payment-button.rounded {
  .v-list {
    .v-list-item {
      &__content {
        border-radius: 18px;
      }
    }
  }
}
.v-menu.payment-button {
  .v-list {
    padding: 5px;
    background-color: rgba(0, 0, 0, 0) !important;
    .v-list-item {
      padding-left: unset;
      padding-right: unset;

      &__content {
        border-radius: 4px;
        box-shadow: 0 0 12px #efeff2;
      }

      .v-btn.paypal-button {
        background-color: #ffc53a;
        font-size: 16px;
        .v-btn__content {
          text-transform: none;
          display: flex;
          gap: 10px;
          .paypal-img {
            width: 20px;
          }
          .pay {
            font-style: italic;
            color: #012f83;
            font-weight: bold;
          }
          .pal {
            font-style: italic;
            color: #1a96d0;
            font-weight: bold;
          }
        }
      }

      .v-btn.stripe-button {
        background-color: #6970e5;
        .v-btn__content {
          font-size: 18px;
          color: white;
          text-transform: none;
        }
      }
    }
  }
}
#payment-button {
  .v-btn {
    .arrow-icon {
      position: absolute;
      right: 15px;
    }
  }
}
</style>