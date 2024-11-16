<template>
  <div id="chat-items-page">
    <explore-buy-premium v-if="!authStore.isPremium && authStore.isLoginChecked"
                         @click="toPremium"/>
    <div class="content">
      <text-field :form="filter"
                  field-name="text"
                  label="Search"
                  inner-prepend-icon="mdi-magnify"
                  :disabled="isLoading"
                  hide-details/>

      <div class="character-chat-items">
        <character-chat-item v-for="item in items"
                             :key="item.id"
                             :item="item"
                             @click="toChat(item)"/>

        <v-skeleton-loader v-if="isLoading"
                           v-for="num in skeletonItemCount"
                           height="82" width="100%" loading/>
      </div>
    </div>
  </div>
</template>

<script>
import CharacterChatItem from "@/components/CharacterChatItem.vue";
import {characterApi} from "@/api/character.api.js";
import TextField from "@/components/TextField.vue";
import {debounce} from "lodash";
import router from "@/router/index.js";
import ExploreBuyPremium from "@/components/ExploreBuyPremium.vue";
import {useAuthStore} from "@/stores/auth.js";
import {useDialogStore} from "@/stores/dialog.js";
import ProgressCircular from "@/components/ProgressCircular.vue";
import {useHead} from "@unhead/vue";
import {useErrorStore} from "@/stores/error.js";
export default {
  components: {ProgressCircular, ExploreBuyPremium, TextField, CharacterChatItem},
  watch: {
    'filter.text'() {
      this.fetchDataDebounce()
    }
  },
  data() {
    return {
      errorStore: useErrorStore(),
      authStore: useAuthStore(),
      loginDialog: useDialogStore().getLoginDialog,
      items: [],
      total: 1,
      filter: {
        pageNum: 1,
        pageSize: 2
      },
      skeletonItemCount: 4,
      isLoading: false,
      isScrollBottom: null
    }
  },
  async created() {
    useHead({
      title: 'Chat AI - LizzyChat',
      link: [
        { rel: 'canonical', href: 'https://www.lizzychat.com/chat' }
      ]
    })
  },
  async mounted() {
    await this.fetchData()
    const app = document.getElementById('app')
    this.isScrollBottom = function isScrollBottom() {
      return (app.scrollTop + app.offsetHeight)+30 >= app.scrollHeight
    }
    while (this.isScrollBottom() && !this.isMaxPage) {
      this.filter.pageNum++;
      await this.fetchData()
    }

    app.addEventListener('scroll', this.handleScrollBottom);
  },
  unmounted() {
    const app = document.getElementById('app')
    app.removeEventListener('scroll', this.handleScrollBottom)
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.filter.pageSize);
    },
    isMaxPage() {
      return this.filter.pageNum >= this.pageCount;
    }
  },
  methods: {
    async handleScrollBottom() {
      if (this.isScrollBottom() && !this.isMaxPage) {
        this.filter.pageNum++;
        await this.fetchData()
      }
    },
    toPremium() {
      router.push('/premium')
    },
    toChat(item) {
      router.push(`/chat/${item.id}`)
    },
    fetchDataDebounce: debounce(function () {
      this.fetchData()
    }, 600),
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await characterApi.getCharacterCharItems(this.filter)
        response.items.forEach(item => this.items.push(item))
        this.total = response.total;
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
#chat-items-page {
  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 900px;
    margin: 9px auto 10px auto;
    padding: 12px;
    .character-chat-items {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .v-skeleton-loader {
        background-color: #242424;
      }
    }
  }
}
</style>