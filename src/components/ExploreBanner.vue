<template>
  <div id="explore-banner">
    <v-skeleton-loader v-if="!isImageLoaded" height="100%" width="100%" loading/>
    <div v-show="isImageLoaded" class="text">
      <h1 class="title">Find your own <span class="sub">AI Girlfriend</span></h1>
      <h3 class="description">Your dream companion awaits! Create your AI Girlfriend, shape her look, personality, and bring her to life in one click. 100% powered by Artificial Intelligence.</h3>
      <div class="button-container">
        <v-btn class="create-own-button" @click="toCreateOwnCharacter" prepend-icon="mdi-gesture-tap-button" append-icon="mdi-gesture-tap-button">
          <span style="font-weight: bold">Create <span class="ai" style="font-weight: bold">AI</span> girlfriend</span>
        </v-btn>
      </div>
    </div>
    <div/>
    <img v-show="isImageLoaded" class="left-character"
         :src="leftImageSrc"
         alt="character-doctor"/>

    <img v-show="isImageLoaded"
         :src="rightImageSrc"
         alt="character-witch"/>
  </div>
</template>

<script>
import router from "@/router/index.js";
import {useAuthStore} from "@/stores/auth.js";
import {useDialogStore} from "@/stores/dialog.js";
import {useSidebarStore} from "@/stores/sidebar.js";
import {UtRouter} from "@/util/UtRouter.js";
import ImageLoaderWorker from "../worker/imageLoaderWorker.js?worker";

export default {
  data() {
    return {
      authStore: useAuthStore(),
      loginDialog: useDialogStore().getLoginDialog,
      sidebarStore: useSidebarStore(),
      leftImageSrc: '/character-doctor_300x300.webp',
      rightImageSrc: '/character-witch_300x300.webp',
      leftLoaded: false,
      rightLoaded: false
    }
  },
  mounted() {
    if(window.Worker) {
      this.preloadImagesWithWorker()
    } else {
      this.preloadImages()
    }
  },
  computed: {
    isImageLoaded() {
      return this.leftLoaded && this.rightLoaded
    }
  },
  methods: {
    preloadImagesWithWorker() {
      // Helper function to load image with a worker
      const loadImageWithWorker = (src, callback) => {
        const worker = new ImageLoaderWorker();
        worker.postMessage({ url: src });
        worker.onmessage = (e) => {
          this.$nextTick(callback);
          worker.terminate();
        };
      };

      // Load the left image
      loadImageWithWorker(this.leftImageSrc, () => {
        this.leftLoaded = true;
      });

      // Load the right image
      loadImageWithWorker(this.rightImageSrc, () => {
        this.rightLoaded = true;
      });

      const nextLeftSrc = '/character-doctor_612x612.webp';
      const nextRightSrc = '/character-witch_612x612.webp';

      // Load the next left image
      loadImageWithWorker(nextLeftSrc, () => {
        this.leftImageSrc = nextLeftSrc;
      });

      // Load the next right image
      loadImageWithWorker(nextRightSrc, () => {
        this.rightImageSrc = nextRightSrc;
      });
    },
    preloadImages() {
      const left = new Image();
      left.src = this.leftImageSrc;
      left.onload = () => {
        this.leftLoaded = true;
      }

      const right = new Image();
      right.src = this.rightImageSrc;
      right.onload = () => {
        this.rightLoaded = true;
      }

      const nextLeftSrc = '/character-doctor_612x612.webp'
      const nextRightSrc = '/character-witch_612x612.webp'

      const nextLeft = new Image();
      nextLeft.src = nextLeftSrc;
      nextLeft.onload = () => {
        this.leftImageSrc = nextLeftSrc;
      }

      const nextRight = new Image();
      nextRight.src = nextLeftSrc;
      nextRight.onload = () => {
        this.rightImageSrc = nextRightSrc;
      }
    },
    toCreateOwnCharacter() {
      const path = this.authStore.isAuthorized ? '/myAI' : '/myAI/edit'
      router.push(path)
      if(UtRouter.isLessThan930()) {
        this.sidebarStore.close()
      }
    }
  }
}
</script>

<style lang="scss">

#explore-banner {
  display: flex;
  position: relative;
  height: 250px;
  //margin: 0 12px;
  border-radius: 4px;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(90deg, $main-violet, #1f1f1f 70.0%);

  .v-skeleton-loader {
    background-color: #242424;
  }

  .text {
    display: flex;
    width: 450px;
    z-index: 1;
    flex-direction: column;
    gap: 5px;

    .title {
      color: white;
      font-size: 32px;
      font-weight: bold;

      .sub {
        font-weight: bold;
        color: $main-violet;
      }
    }
    .description {
      color: white;
      font-weight: bold;
      font-size: 14px;
    }

    .button-container {
      display: flex;
      justify-content: left;
      align-items: center;
      .create-own-button {
        color: white;
        font-weight: bold;
        font-size: 15px;
        //max-width: 300px;
        background: linear-gradient(90deg, #573bea, #f14c98 72%);

        .ai {
          font-size: 18px;
          color: $main-violet;
        }
      }
    }
  }
  img {
    width: 275px;
    position: absolute;
    right: -50px;
    bottom: 0;
  }
  .left-character {
    right: 80px;
  }
}

@media (max-width: 840px) {
  #explore-banner {
    align-items: end;
    .text {
      padding: 10px;
      .title {
        font-size: 20px;
      }
      .description {
        font-size: 12px;
      }
    }
  }
}
</style>