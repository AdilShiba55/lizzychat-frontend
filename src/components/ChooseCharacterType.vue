<template>
  <div id="choose-character-type">
    <div class="items">
      <div v-for="(item, index) in characterTypes"
           :key="item.id"
           class="item"
           :class="{'selected':item.id === characterTypeId}"
           @click="$emit('update:characterTypeId', item.id)">
        <v-skeleton-loader v-if="!isImageLoaded[index]" height="350" width="100%" loading/>
        <template v-else>
          <img :src="item.exampleUrl" :alt="item.name"/>
          <div class="name">{{ item.name }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {UtCharacterType} from "@/util/UtCharacterType.js";
import ImageLoaderWorker from '/src/worker/imageLoaderWorker.js?worker';

export default {
  props: {
    characterTypeId: {type: Number, required: true}
  },
  data() {
    return {
      isImageLoaded: []
    }
  },
  mounted() {
    if (window.Worker) {
      this.preloadImagesWithWorker()
    } else {
      this.preloadImages()
    }
  },
  computed: {
    characterTypes() {
      return UtCharacterType.getCharacterTypes();
    },
  },
  methods: {
    preloadImagesWithWorker() {
      this.characterTypes.forEach((item, index) => {
        const worker = new ImageLoaderWorker();
        worker.postMessage({ url: item.exampleUrl, index });
        worker.onmessage = (e) => {
          this.$nextTick(() => {
            this.isImageLoaded[e.data.index] = true;
          });
          worker.terminate();
        };
      });
    },
    preloadImages() {
      this.characterTypes.forEach((item, index) => {
        const img = new Image();
        img.src = item.exampleUrl;
        img.onload = () => {
          this.isImageLoaded[index] = true;
        };
      });
    }
  }
}
</script>

<style lang="scss">
#choose-character-type {
  .items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 5px;

    .item:hover {
      background: #232323;
      box-shadow: 0 0 14px #232323;
      //padding: 5px;

      .name {
        background: #232323;
      }
    }

    .item.selected {
      background-image: linear-gradient(120deg, #ffa463, #f86aaf);
      box-shadow: 0 0 20px #f86aaf;
      //padding: 5px;

      .name {
        background-image: linear-gradient(120deg, #ffa463, #f86aaf);
      }
    }

    .item {
      width: 100%;
      background: #494949;
      border-radius: 4px;
      padding: 4px;
      display: flex;
      flex-direction: column;
      position: relative;
      cursor: pointer;
      overflow: hidden;

      .v-skeleton-loader {
        background-color: #242424;
      }

      img {
        width: 100%;
        height: 100%;
      }

      .name {
        color: white;
        font-weight: bold;
        width: 100%;
        position: absolute;
        bottom: 0;
        padding: 5px;
        background-color: #494949;
      }
    }
  }
}
</style>