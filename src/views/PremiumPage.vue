<template>
  <div id="premium-page">
    <explore-buy-premium v-if="!authStore.isPremium && authStore.isLoginChecked" />
    <div class="content">
      <div class="title">
        <h1 class="title-text">Choose your plan</h1>
        <h4 class="title-description">100% anonymous.</h4>
      </div>
      <div class="plan-cards">
        <base-plan-card/>
        <premium-plan-card :is-loading="isPremiumLoading"
                           @purchase="getPremium"/>
      </div>
    </div>
  </div>
</template>

<script>
import ExploreBuyPremium from "@/components/ExploreBuyPremium.vue";
import {useAuthStore} from "@/stores/auth.js";
import {paymentApi} from "@/api/payment.api.js";
import {PLAN} from "@/util/constants.js";
import {UtScroll} from "@/util/UtScroll.js";
import BasePlanCard from "@/components/BasePlanCard.vue";
import PremiumPlanCard from "@/components/PremiumPlanCard.vue";
import {UtRouter} from "@/util/UtRouter.js";
import {useHead} from "@unhead/vue";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {PremiumPlanCard, BasePlanCard, ExploreBuyPremium},
  data() {
    return {
      errorStore: useErrorStore(),
      authStore: useAuthStore(),
      isPremiumLoading: false,
      plans: []
    }
  },
  created() {
    this.setMetaTags()
  },
  methods: {
    setMetaTags() {
      useHead({
        title: 'Premium - LizzyChat',
        meta: [
          {
            name: 'description',
            content: 'Explore premium plans on LizzyChat and choose the one that suits you best. 100% anonymous. You can cancel anytime.'
          },
          {name: 'keywords', content: 'premium plans, subscription, LizzyChat, anonymous chat, cancel anytime'},
          {property: 'og:title', content: 'Choose Your Plan - LizzyChat'},
          {
            property: 'og:description',
            content: 'Explore premium plans on LizzyChat and choose the one that suits you best. 100% anonymous. You can cancel anytime.'
          },
          {property: 'og:type', content: 'website'},
          {property: 'og:url', content: 'https://www.lizzychat.com/premium'},
          {property: 'og:image', content: 'https://www.lizzychat.com/plan-image_612x612.webp'},
          {property: 'og:image:alt', content: 'LizzyChat Plans'},
          {property: 'og:site_name', content: 'LizzyChat'},
          {property: 'og:locale', content: 'en_US'},
          {name: 'twitter:card', content: 'summary_large_image'},
          {name: 'twitter:title', content: 'Choose Your Plan - LizzyChat'},
          {
            name: 'twitter:description',
            content: 'Explore premium plans on LizzyChat and choose the one that suits you best. 100% anonymous. You can cancel anytime.'
          },
          {name: 'twitter:image', content: 'https://www.lizzychat.com/plan-image_612x612.webp'},
          {name: 'twitter:image:alt', content: 'LizzyChat Plans'}
        ],
        link: [
          {rel: 'canonical', href: 'https://www.lizzychat.com/premium'}
        ]
      });
    },
    async getPremium(sourceId) {
      this.isPremiumLoading = true;
      try {
        const url = await paymentApi.createPlanPayment(sourceId, PLAN.premium)
        UtRouter.openUrlBlank(url)
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        this.isPremiumLoading = false;
      }
    }
  }
}
</script>

<style lang="scss">
#premium-page {

  #explore-buy-premium {
    width: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    max-width: 900px;
    margin: 20px auto 10px auto;
    gap: 20px;

    .title {
      text-align: center;
      &-text {
        color: white;
        font-weight: bold;
      }
      &-description {
        color: #d5d5d5;
        font-weight: bold;
      }
    }
    .plan-cards {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      width: 100%;
      padding: 30px 5px;
      justify-content: center;
      align-items: center;
      min-height: 450px;
      border-radius: 6px;
      //background: linear-gradient(200deg, $main-violet, #1f1f1f 70.0%);
    }
  }
}
</style>