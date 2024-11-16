<template>
  <div id="faq-page">
    <explore-buy-premium v-if="!authStore.isPremium && authStore.isLoginChecked"
                         @click="toPremium"/>

    <div class="content">
      <text-field :form="filter"
                  field-name="text"
                  label="Search"
                  inner-prepend-icon="mdi-magnify"
                  :disabled="isLoading"/>

      <v-expansion-panels v-if="!isLoading">
        <v-expansion-panel
            v-for="(item, index) in items"
            :key="index"
            :title="item.name"
            :text="item.description">
        </v-expansion-panel>
      </v-expansion-panels>

      <progress-circular v-else/>
    </div>
  </div>
</template>

<script>
import {faqApi} from "@/api/faq.api.js";
import {debounce} from "lodash";
import TextField from "@/components/TextField.vue";
import ExploreBuyPremium from "@/components/ExploreBuyPremium.vue";
import {useAuthStore} from "@/stores/auth.js";
import router from "@/router/index.js";
import ProgressCircular from "@/components/ProgressCircular.vue";
import {useHead} from "@unhead/vue";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {ProgressCircular, ExploreBuyPremium, TextField},
  watch: {
    'filter.text'() {
      this.fetchDataDebounce()
    }
  },
  created() {
    this.setMetaTags()
  },
  mounted() {
    this.fetchData()
  },
  data() {
    return {
      errorStore: useErrorStore(),
      authStore: useAuthStore(),
      filter: {},
      items: [],
      isLoading: false
    }
  },
  methods: {
    setMetaTags() {
      useHead({
        title: 'FAQ - LizzyChat',
        meta: [
          { name: 'description', content: 'Find answers to frequently asked questions about LizzyChat. Get help and start chatting with confidence.' },
          { name: 'keywords', content: 'FAQ, questions, help, support, LizzyChat' },
          { property: 'og:title', content: 'FAQ - LizzyChat' },
          { property: 'og:description', content: 'Find answers to frequently asked questions about LizzyChat. Get help and start chatting with confidence.' },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: 'https://www.lizzychat.com/faq' },
          { property: 'og:image', content: 'https://www.lizzychat.com/faq-image_612x612.webp' },
          { property: 'og:image:alt', content: 'LizzyChat FAQ' },
          { property: 'og:site_name', content: 'LizzyChat' },
          { property: 'og:locale', content: 'en_US' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: 'FAQ - LizzyChat' },
          { name: 'twitter:description', content: 'Find answers to frequently asked questions about LizzyChat. Get help and start chatting with confidence.' },
          { name: 'twitter:image', content: 'https://www.lizzychat.com/faq-image_612x612.webp' },
          { name: 'twitter:image:alt', content: 'LizzyChat FAQ' }
        ],
        link: [
          { rel: 'canonical', href: 'https://www.lizzychat.com/faq' }
        ]
      });
    },
    toPremium() {
      router.push('/premium')
    },
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await faqApi.search(this.filter)
        console.log('response', response)
        this.items = response.items;
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        this.isLoading = false;
      }
    },
    fetchDataDebounce: debounce(function () {
      this.fetchData()
    }, 600),
  }
}
</script>

<style lang="scss">
#faq-page {
  .content {
    max-width: 900px;
    margin: 9px auto 10px auto;
    padding: 12px;

    .v-expansion-panels {
      .v-expansion-panel {
        &-title {}
        &-title, &-text__wrapper {
          font-weight: bold;
        }
        &-text__wrapper {
          padding-top: 16px;
        }
      }
    }
  }
}
</style>

