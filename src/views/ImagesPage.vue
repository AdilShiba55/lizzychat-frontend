<template>
  <div id="images-page">
    <explore-buy-premium v-if="!authStore.isPremium && authStore.isLoginChecked"
                         @click="toPremium" />
    <no-records v-if="!isLoading && items.length === 0"
                icon="mdi-magnify"
                title="IMAGES NOT FOUND"
                description="This shows all the photos you have received (routine, 16+, 18+)"/>
    <template v-else>
      <div class="character-images">
        <v-skeleton-loader
            v-if="isLoading"
            v-for="num in filter.pageSize"
            :key="num"
            loading
            height="360"
            width="100%"/>
        <div v-else v-for="(item, index) in items"
             class="character-image"
             @click="clicked(item)"
             :class="{'blured':isBlured(item)}">
          <v-icon v-if="isBlured(item)" icon="mdi-lock"/>
          <v-skeleton-loader v-if="!isImageLoaded[index]"
                             width="100%"
                             height="100%"/>
          <img v-show="isImageLoaded[index]"
               :src="getImageUrl(item)"
               alt="character image"
               @load="isImageLoaded[index] = true"/>
          <v-btn v-if="!isBlured(item)"
                 color="success"
                 class="download-button"
                 icon="mdi-download"
                 @click.stop="downloadImage(item)"
                 rounded/>
        </div>
      </div>

      <v-pagination
          v-if="pageCount > 1"
          v-model="filter.pageNum"
          :length="pageCount"
          :total-visible="6"
          :disabled="isLoading"
          color="white"/>
    </template>
  </div>
</template>

<script>
import {characterImageApi} from "@/api/characterImage.api.js";
import {CHARACTER_IMAGE_TYPE} from "@/util/constants.js";
import {useDialogStore} from "@/stores/dialog.js";
import router from "@/router/index.js";
import NoRecords from "@/components/NoRecords.vue";
import ExploreBuyPremium from "@/components/ExploreBuyPremium.vue";
import {useAuthStore} from "@/stores/auth.js";
import {useErrorStore} from "@/stores/error.js";
import {UtFile} from "@/util/UtFile.js";
import {useHead} from "@unhead/vue";

export default {
  components: {ExploreBuyPremium, NoRecords},
  watch: {
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
      getPremiumDialog: useDialogStore().getPremiumDialog,
      filter: {
        characterImageTypeId: null,
        pageNum: 1,
        pageSize: 12
      },
      items: [],
      total: 0,
      isImageLoaded: [],
      isLoading: false
    }
  },
  created() {
    useHead({
      title: 'Gallery - LizzyChat',
      link: [
        { rel: 'canonical', href: 'https://www.lizzychat.com/gallery' }
      ]
    })
  },
  mounted() {
    this.fetchData()
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.filter.pageSize);
    }
  },
  methods: {
    async downloadImage(item) {
      const file = await characterImageApi.getCharacterImageFile(item.id)
      UtFile.downloadFileFromByteArray(file.content, file.name)
    },
    toPremium() {
      router.push('/premium')
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
    isBlured(item) {
      return !item.imageUrl && item.imageBluredUrl;
    },
    getImageUrl(item) {
      return item.imageUrl??item.imageBluredUrl;
    },
    clicked(item) {
      if(this.isBlured(item)) {
        this.getPremiumDialog.show()
      } else {
        router.push(`/chat/${item.characterId}`)
      }
    },
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await characterImageApi.search(this.filter)
        this.isImageLoaded = [];
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
#images-page {
  height: 100%;
  padding-bottom: 15px;
  .character-images {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    padding: 15px 12px 0 12px;
    margin-bottom: 10px;
    gap: 10px;

    .v-skeleton-loader {
      background-color: #242424;
    }

    .character-image.blured {
      .mdi-lock {
        display: flex;
      }
    }

    .character-image {
      min-width: 200px;
      height: 360px;
      position: relative;
      cursor: pointer;
      border: 3px #ec61a1 solid;
      border-radius: 8px;

      .mdi-lock {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 200px;
        color: rgba(255, 255, 255, 0.8);
      }
      .download-button {
        position: absolute;
        top: -5px;
        right: -5px;
      }
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>