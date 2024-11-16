<template>
  <div id="my-ai-page">
    <explore-buy-premium v-if="!authStore.isPremium && authStore.isLoginChecked"
                         @click="toPremium" />
    <div class="character-cards">
      <div class="add-ai" @click="toCharacterEditing()">
        <v-icon icon="mdi-plus-circle"/>
        <h2 class="title">Create new AI</h2>
      </div>

      <v-skeleton-loader
          v-if="isFirstLoading"
          v-for="num in skeletonItemCount"
          :key="num"
          loading
          height="380"/>

      <character-card v-else
                      v-for="(item, index) in items"
                      :character="item"
                      with-pointer
                      with-edit
                      @card-clicked="toChat(item)"
                      @edit-clicked="toCharacterEditing(item)"/>
    </div>

    <v-pagination
        v-if="pageCount > 1"
        v-model="filter.pageNum"
        :length="pageCount"
        :total-visible="6"
        :disabled="isLoading"
        color="white"/>
  </div>
</template>

<script>
import {characterApi} from "@/api/character.api.js";
import CharacterCard from "@/components/CharacterCard.vue";
import router from "@/router/index.js";
import ExploreBuyPremium from "@/components/ExploreBuyPremium.vue";
import {useAuthStore} from "@/stores/auth.js";
import {useErrorStore} from "@/stores/error.js";
import {useHead} from "@unhead/vue";

export default {
  components: {ExploreBuyPremium, CharacterCard},
  watch: {
    'authStore.userData.tokenInfo'() {
      if(this.authStore.isAuthorized) {
        this.fetchData()
      } else {
        this.items = []
        this.total = 0
      }
    },
    async 'filter.pageNum'() {
      await this.fetchData()
      await this.$nextTick(() => {
        this.scrollToTop()
      });
    },
  },
  data() {
    return {
      errorStore: useErrorStore(),
      authStore: useAuthStore(),
      filter: {
        pageNum: 1,
        pageSize: 11
      },
      skeletonItemCount: 7,
      items: [],
      total: 0,
      isFirstLoading: false,
      isLoading: false
    }
  },
  async created() {
    useHead({
      title: 'My AI - LizzyChat',
      link: [
        { rel: 'canonical', href: 'https://www.lizzychat.com/myAI' }
      ]
    })
  },
  async mounted() {
    if (this.authStore.isAuthorized) {
      this.isFirstLoading = true;
      try {
        await this.fetchData()
      } finally {
        this.isFirstLoading = false;
      }
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.filter.pageSize);
    }
  },
  methods: {
    toCharacterEditing(item) {
      let path = '/myAI/edit'
      if(item) {
        path += `/${item.id}`
      }
      router.push(path)
    },
    toPremium() {
      router.push('/premium')
    },
    toChat(character) {
      router.push(`/chat/${character.id}`)
    },
    scrollToTop() {
      const app = document.getElementById('app')
      if (app) {
        app.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    },
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await characterApi.findOwn(this.filter)
        console.log('response', response)
        this.items = response.items;
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
#my-ai-page {
  height: 100%;
  padding-bottom: 15px;

  .character-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    padding: 15px 12px 0 12px;
    margin-bottom: 10px;
    gap: 20px;

    .add-ai:hover {
      background-color: #e83487;
    }

    .add-ai {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 380px;
      background-color: #ec61a1;
      border-radius: 8px;
      cursor: pointer;

      .mdi-plus-circle {
        color: white;
        font-size: 100px;
      }
      .title {
        color: white;
        font-weight: bold;
      }
    }

    .character-card {
      padding: 5px;
      background-image: linear-gradient(120deg, #ffa463, #f86aaf);
    }
    .character-card:hover {
      background-image: linear-gradient(120deg, #f66c09, #fa0079);
    }
  }
}
</style>