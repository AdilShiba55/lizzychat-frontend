<template>
  <div id="explore-page">
    <explore-buy-premium v-if="!authStore.isPremium && authStore.isLoginChecked"
                         @click="toPremium"/>
    <explore-banner/>
    <div class="character-cards-container">
      <character-type-tab :form="form"
                          :disabled="isLoading"/>
      <div class="character-cards">

        <character-card v-for="(character, index) in characters"
                        :character="character"
                        :key="character.id" with-lock with-crystals with-pointer
                        @card-clicked="toChat(character)"
                        @unlock-clicked="openUnlockDialog(character)"/>

        <v-skeleton-loader
            v-if="isLoading"
            v-for="num in skeletonItemCount"
            :key="num"
            loading
            height="380"/>
      </div>
    </div>

    <choose-character-type-dialog v-if="!form.typeId"
                                  v-model:type-id="form.typeId"/>
  </div>
</template>

<script>
import {characterApi} from "@/api/character.api.js";
import CharacterCard from "@/components/CharacterCard.vue";
import ExploreBanner from "@/components/ExploreBanner.vue";
import ExploreBuyPremium from "@/components/ExploreBuyPremium.vue";
import CharacterTypeTab from "@/components/CharacterTypeTab.vue";
import ProgressCircular from "@/components/ProgressCircular.vue";
import router from "@/router/index.js";
import {useAuthStore} from "@/stores/auth.js";
import {useDialogStore} from "@/stores/dialog.js";
import {useHead} from "@unhead/vue";
import {useErrorStore} from "@/stores/error.js";
import ChooseCharacterTypeDialog from "@/dialog/ChooseCharacterTypeDialog.vue";

export default {
  components: {
    ChooseCharacterTypeDialog,
    ProgressCircular, CharacterTypeTab, ExploreBuyPremium, ExploreBanner, CharacterCard},
  data() {
    return {
      errorStore: useErrorStore(),
      authStore: useAuthStore(),
      loginDialog: useDialogStore().getLoginDialog,
      unlockCharacterDialog: useDialogStore().getUnlockCharacterDialog,
      form: {
        typeId: null,
        pageNum: 1,
        pageSize: 12,
      },
      skeletonItemCount: 4,
      characters: [],
      total: 1,
      isLoading: false,
      isScrollBottom: null
    }
  },
  watch: {
    'form.typeId'() {
      this.form.pageNum = 1;
      this.characters = []
      this.loadDataFirstly()
    },
    'chosenCharacterType'() {
      this.form.pageNum = 1;
      this.characters = []
      this.loadDataFirstly()
    }
  },
  created() {
    this.setMetaTags()
  },
  async mounted() {
    this.emitter.on('logout', this.loadDataFirstly)
    const app = document.getElementById('app')
    this.isScrollBottom = function isScrollBottom() {
      return (app.scrollTop + app.offsetHeight)+30 >= app.scrollHeight
    }
    // await this.loadDataFirstly()

    app.addEventListener('scroll', this.handleScrollBottom);
  },
  unmounted() {
    this.emitter.off('logout')
    const app = document.getElementById('app')
    app.removeEventListener('scroll', this.handleScrollBottom)
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.form.pageSize);
    },
    isMaxPage() {
      return this.form.pageNum >= this.pageCount;
    }
  },
  methods: {
    setMetaTags() {
      useHead({
        title: 'Explore - LizzyChat',
        meta: [
          { name: 'description', content: 'Explore a variety of characters on LizzyChat and start chatting with your favorite ones.' },
          { name: 'keywords', content: 'ai chat, intimate chat, llm, adult 18+ chat, messaging, communication, social, soulmate, ai girlfriend' },
          { property: 'og:title', content: 'Explore - LizzyChat' },
          { property: 'og:description', content: 'Explore a variety of characters on LizzyChat and start chatting with your favorite ones.' },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: 'https://www.lizzychat.com/explore' },
          { property: 'og:image', content: 'https://www.lizzychat.com/character-doctor_612x612.webp' },
          { property: 'og:image:alt', content: 'Character image on LizzyChat' },
          { property: 'og:site_name', content: 'LizzyChat' },
          { property: 'og:locale', content: 'en_US' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: 'Explore - LizzyChat' },
          { name: 'twitter:description', content: 'Explore a variety of characters on LizzyChat and start chatting with your favorite ones.' },
          { name: 'twitter:image', content: 'https://www.lizzychat.com/character-doctor_612x612.webp' },
          { name: 'twitter:image:alt', content: 'Character image on LizzyChat' }
        ],
        link: [
          { rel: 'canonical', href: 'https://www.lizzychat.com/explore' }
        ]
      });
    },
    async loadDataFirstly() {
      console.log('loadDataFirstly')
      this.form.pageNum = 1
      this.characters = []
      this.total = 1
      await this.fetchData()
      while (this.isScrollBottom() && !this.isMaxPage) {
        this.form.pageNum++;
        await this.fetchData()
      }
    },
    async handleScrollBottom() {
      if (this.isScrollBottom() && !this.isMaxPage) {
        this.form.pageNum++;
        await this.fetchData()
      }
    },
    openUnlockDialog(character) {
      this.unlockCharacterDialog.show(character)
    },
    toChat(character) {
      if(this.authStore.isAuthorized) {
        router.push(`/chat/${character.id}`)
      } else {
        this.loginDialog.openLoginOrVerify()
      }
    },
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await characterApi.search(this.form)
        response.items.forEach(item => this.characters.push(item))
        this.total = response.total;
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        this.isLoading = false;
      }
    },
    toPremium() {
      router.push('/premium')
    }
  }
}
</script>

<style lang="scss">
#explore-page {
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  //gap: 30px;

  #explore-banner {
    margin: 20px 12px;
  }

  .character-cards-container {
    display: flex;
    flex-direction: column;
    //min-height: 530px;

    #character-type-tab {
      margin-bottom: 30px;
    }

    .v-skeleton-loader {
      background-color: #242424;
    }

    .character-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      padding: 0 12px;
      gap: 20px;
      margin-bottom: 10px;

      .character-card {
        padding: 5px;
        background-image: linear-gradient(120deg, #ffa463, #f86aaf);
        .crystal-target {
          border: 3px #653737 solid;
          background-image: linear-gradient(120deg, #ffa463, #f86aaf);
        }
      }
      .character-card:hover {
        background-image: linear-gradient(120deg, #f66c09, #fa0079);
        .crystal-target {
          background-image: linear-gradient(120deg, #f66c09, #fa0079);
        }
      }
    }
  }
}
</style>