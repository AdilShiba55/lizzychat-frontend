<template>
  <div id="character-slider">
    <v-skeleton-loader v-if="!isImageLoaded" width="330" height="460"/>
    <carousel v-show="isImageLoaded" :items-to-show="1" :autoplay="2500" wrap-around>
      <slide v-for="(character, index) in characters" :key="index">
        <div class="character-slider-card">
          <img :src="character.src" alt="" :style="`height: ${character.height}`"/>
          <character-info :name="character.name" :status="character.status" :description="character.description"/>
        </div>
      </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import CharacterInfo from "@/components/CharacterInfo.vue";
import ImageLoaderWorker from "../worker/imageLoaderWorker.js?worker";

export default {
  components: {
    CharacterInfo,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      characters: [
        {
          name: 'Alex',
          src: '/character-student_612x612.webp',
          status: 'Student',
          description: 'Teach me a couple of things ;)',
          height: '460px',
          imageLoaded: false
        },
        {
          name: 'Binna',
          src: '/character_wife_612x765.webp',
          status: 'Wife',
          description: 'Keep me warm on a cold night))',
          height: '480px',
          imageLoaded: false
        },
        {
          name: 'Saber',
          src: '/character-knight_350x612.webp',
          status: 'Knight',
          description: 'My sword will always protect you!',
          height: '530px',
          imageLoaded: false
        }
      ]
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
      return this.characters[0].imageLoaded && this.characters[0].imageLoaded
    }
  },
  methods: {
    preloadImagesWithWorker() {
      this.characters.forEach((character, index) => {
        const worker = new ImageLoaderWorker();
        worker.postMessage({ url: character.src, index });
        worker.onmessage = (e) => {
          this.$nextTick(() => {
            character.imageLoaded = true;
          });
          worker.terminate();
        };
      });
    },
    async preloadImages() {
      this.characters.forEach((character, index) => {
        const img = new Image();
        img.src = character.src;
        img.onload = () => {
          character.imageLoaded = true;
        }
      });
    }
  }
}
</script>

<style lang="scss">
$character-height: 400px;
#character-slider {
  display: flex;
  align-items: end;
  background-image: url("/banner_496x512.webp");
  background-position: center;
  border-radius: 4px;
  width: fit-content;

  .v-skeleton-loader {
    background-color: #242424;
  }

  .carousel {
    //margin-top: 30px;
    width: 330px;

    .carousel__pagination {
      display: none;
    }

    .carousel__prev, .carousel__next {
      color: white;
    }

    .carousel__viewport {
      background: radial-gradient(51.8% 72.24% at 45.31% 73.22%, rgb(157, 29, 166) 0%, rgba(56, 28, 199, 0) 100%);
      //border-left: #0a0a0a dashed 5px;
      //border-right: #0a0a0a dashed 5px;
      //border-bottom: #0a0a0a dashed 5px;
    }

    .carousel__track {
      .carousel__slide {
        display: flex;
        align-items: end;
        //justify-content: end;
        .character-slider-card {
          display: flex;
          img {
            //height: 420px;
          }
          .info {
            //display: none;
          }
        }
      }

      .carousel__slide--active {
        .character-slider-card {
          img {
            //height: 350px;
          }
        }
      }
    }
  }
}
</style>

