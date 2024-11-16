<template>
  <div class="character-card"
       :class="{'locked':(authStore.isAuthorized && !authStore.isCharacterEnabled(character) && withLock), 'pointer':withPointer, 'single-image':(character.avatarUrls.length === 1 || character.avatarUrls.length === 0)}">
    <div class="locked-overlay"
         @click="$emit('unlock-clicked')">
      <v-icon icon="mdi-lock"/>
    </div>
    <template v-if="withCrystals && character.cost > 0">
      <div class="crystal-target">
        <img src="/crystals_256x256.webp" alt="crystals"/>
      </div>
    </template>
    <template v-if="withEdit">
      <div class="actions">
        <v-btn icon="mdi-pencil" rounded @click="$emit('edit-clicked')"/>
      </div>
    </template>

    <v-carousel v-if="character.avatarUrls.length > 0" hide-delimiters>
      <v-carousel-item v-for="(avatarUrl, index) in character.avatarUrls" :key="index">
        <v-skeleton-loader v-if="!isImageLoaded[0]"/>
        <img v-show="isImageLoaded[0]"
             :src="avatarUrl"
             alt="character-avatar"
             @click="$emit('card-clicked')"/>
      </v-carousel-item>
    </v-carousel>

    <div v-else class="no-image" @click="$emit('card-clicked')">
      <v-icon icon="mdi-image-off-outline"/>
    </div>

    <div class="character-card__character-info" @click="$emit('card-clicked')">
      <span class="name">{{ character.name }}</span>
      <div style="display: flex; gap: 10px">
        <span class="occupation">{{ character.occupation.name }}</span>
        <span class="age">{{ character.age }} y.o.</span>
      </div>
      <span class="description">{{ character.description }}</span>
    </div>
  </div>
</template>

<script>
import CharacterInfo from "@/components/CharacterInfo.vue";
import {useAuthStore} from "@/stores/auth.js";
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import ImageLoaderWorker from "../worker/imageLoaderWorker.js?worker";

export default {
  components: {Carousel, Navigation, Slide, Pagination, CharacterInfo},
  props: {
    withLock: {type: Boolean, default: false},
    withCrystals: {type: Boolean, default: false},
    withPointer: {type: Boolean, default: false},
    character: {type: Object, required: true},
    withEdit: {type: Boolean, default: false}
  },
  data() {
    return {
      authStore: useAuthStore(),
      isImageLoaded: []
    }
  },
  mounted() {
    if(window.Worker) {
      this.preloadAvatarsWithWorker()
    } else {
      this.preloadAvatars()
    }
  },
  methods: {
    preloadAvatarsWithWorker() {
      this.character.avatarUrls.forEach((avatarUrl, index) => {
        const worker = new ImageLoaderWorker();
        worker.postMessage({ url: avatarUrl, index });
        worker.onmessage = (e) => {
          this.$nextTick(() => {
            this.isImageLoaded[e.data.index] = true;
          });
          worker.terminate();
        };
      });
    },
    preloadAvatars() {
      this.character.avatarUrls.forEach((avatarUrl, index) => {
        const img = new Image();
        img.src = avatarUrl;
        img.onload = () => {
          this.isImageLoaded[index] = true;
        }
      });
    }
  }
}
</script>

<style lang="scss">
.character-card.pointer {
  cursor: pointer;
  .locked-overlay {
    cursor: pointer;
  }
  .v-carousel {
    .v-window {
      &-item {
        cursor: pointer;
      }

      &__controls {
        padding: 0 4px;
      }
    }
  }
  .character-card__character-info {
    cursor: pointer;
  }
}
.character-card.single-image {
  .v-window {
    &__controls {
      display: none;
    }
  }
}
.character-card.locked {
  .locked-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 2;
    height: 100%;
    width: 100%;
    padding: 8px;

    .mdi-lock {
      color: rgba(255, 255, 255, 0.6);
      font-size: 150px;
    }
  }

  .v-window {
    border-radius: 5px;
    &__controls {
      display: none;
    }
  }

  .character-card__character-info {
    height: 100%;
    border-radius: inherit;
  }
}

.character-card {
  position: relative;
  min-width: 200px;
  height: 380px;
  border-radius: 8px;
  //border: 5px #2f1a2f solid;

  .v-carousel {
    .v-window {
      &-item {
        cursor: pointer;
      }

      &__controls {
        padding: 0 4px;

        .mdi-chevron-left, .mdi-chevron-right {
          color: black;
        }
      }
    }
  }

  .locked-overlay {
    display: none;
  }

  .no-image {
    height: 100%;
    background-color: $main-black;
    position: relative;

    .mdi-image-off-outline {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 200px;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .v-window {
    height: 100% !important;
  }

  .actions {
    position: absolute;
    top: -5px;
    right: -5px;
    z-index: 1000;

    //.mdi {
    //  font-size: 34px;
    //}
  }

  .crystal-target {
    width: 50px;
    height: 50px;
    top: -15px;
    right: -15px;
    background-color: white;
    border-radius: 50%;
    //border: 4px #2f1a2f solid;
  }

  .crystal-target {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 1;
    padding: 10px;
    text-align: center;
    box-sizing: border-box;
    //background-color: $main-black;

    .lv {
      color: #db34c7;
      font-weight: bold;
      font-size: 12px;
    }

    .cost {
      position: absolute;
      color: #db34c7;
      font-weight: bold;
      font-size: 20px;
    }
  }

  img {
    position: absolute;
    bottom: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .v-skeleton-loader {
    height: 100%;
    background-color: $main-black;
  }


  .character-card__character-info {
    position: absolute;
    display: flex;
    justify-content: end;
    width: 100%;
    color: white;
    left: 0;
    bottom: 0;
    padding: 10px 15px;
    flex-direction: column;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    background-color: rgba(0, 0, 0, 0.6);
    //border-bottom-right-radius: 8px;

    .name {
      font-size: 25px;
      font-weight: bold;
    }

    .occupation {
      color: #7eff7e;
      font-size: 15px;
      font-weight: bold;
    }

    .age {
      color: #ff83ed;
      font-size: 15px;
      font-weight: bold;
    }

    .description {
      line-height: 1.5em;
      max-height: 3em;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-weight: bold;
    }
  }
}
</style>