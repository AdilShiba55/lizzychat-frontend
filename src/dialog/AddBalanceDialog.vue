<template>
  <BaseDialog id="add-balance-dialog"
              title="Balance"
              width="600">
    <template v-slot:content>
      <div>
        <h1 class="title">Add <span class="gems-text">CRYSTALS</span></h1>
        <h3 class="description">The more you buy the cheaper the <span class="gems-text">CRYSTALS</span>!</h3>
      </div>
      <div class="price-items">
        <div v-for="(item, index) in priceItems"
             :key="index"
             class="price-item" :class="{'chosen':(currentOption === index), 'events-disabled':isLoading}"
             @click="currentOption = index">
          <img class="crystals" src="/crystals_256x256.webp"/>
          <span class="crystal-count">{{item.crystalsCountText}}</span>
          <span class="gems-text">CRYSTALS</span>
          <span class="total">{{item.total}}</span>
        </div>
      </div>

      <div class="button-containers">
        <div class="button-container">
          <payment-button activator-id="payment-button-add-balance-dialog"
                          title="CONTINUE"
                          variant="outlined"
                          :is-loading="isLoading"
                          @purchase="createBalancePayment"
                          rounded/>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from "@/dialog/BaseDialog.vue";
import {useDialogStore} from "@/stores/dialog.js";
import {paymentApi} from "@/api/payment.api.js";
import {UtRouter} from "@/util/UtRouter.js";
import PaymentButton from "@/components/PaymentButton.vue";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {PaymentButton, BaseDialog},
  data() {
    return {
      errorStore: useErrorStore(),
      addBalanceDialog: useDialogStore().getAddBalanceDialog,
      currentOption: 1,
      isLoading: false,
      priceItems: [
        {
          crystalsCountText: '4000',
          crystalsCount: 4000,
          total: '$49.99'
        },
        {
          crystalsCountText: '200',
          crystalsCount: 200,
          total: '$4.99'
        },
        {
          crystalsCountText: '1000',
          crystalsCount: 1000,
          total: '$19.99'
        }
      ]
    }
  },
  methods: {
    async createBalancePayment(sourceId) {
      const priceItem = this.priceItems[this.currentOption]
      this.isLoading = true;
      try {
        const url = await paymentApi.createCrystalPayment(sourceId, priceItem.crystalsCount)
        UtRouter.openUrlBlank(url)
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style lang="scss">
#add-balance-dialog {

  .header {
    display: none;
  }
  .content {
    display: flex;
    flex-direction: column;
    //padding: 0 40px;
    gap: 30px;
    background: linear-gradient(200deg, #f33879, #1f1f1f 80.0%);
    .title, .description {
      text-align: center;
      font-weight: bold;

      .gems-text {
        color: #ffc000;
        font-weight: bold;
      }
    }

    .price-items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      justify-content: center;
      gap: 30px;
      .price-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        //width: 140px;
        //width: 220px;
        cursor: pointer;
        gap: 1px;
        padding: 0 10px 10px 10px;
        background-color: rgba(0, 0, 0, 0.4);
        .crystals {
          width: 100px;
        }
        .crystal-count, .total {
          font-size: 16px;
          font-weight: bold;
        }
        .gems-text {
          color: #ffc000;
          font-size: 14px;
          font-weight: bold;
        }
        .total {
          color: #981b98;
        }
      }
      .price-item.chosen {
        border: 3px #eb00ff solid;
        .total {
          color: $main-violet;
        }
      }
      .price-item:hover {
        box-shadow: 0 0 4px #efeff2;
        background-color: rgba(0, 0, 0, 0.6);
      }
    }

    .button-containers {
      display: flex;
      justify-content: center;
      .button-container {
        width: 300px;
        .v-btn {
          box-shadow: 0 0 14px white;

          .paypal-icon {
            position: absolute;
            width: 30px
          }
          .paypal-icon.left {
            left: 15px;
          }
          .paypal-icon.right {
            right: 15px;
          }
        }
      }
    }
  }
  .footer {
    display: none;
  }
}
</style>