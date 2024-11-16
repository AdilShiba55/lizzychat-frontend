<template>
  <div id="choose-body-type">
    <div class="items">
      <div v-for="(item, index) in bodyTypes"
           class="item"
           :class="{'selected':item.id === bodyTypeId}"
           @click="$emit('update:bodyTypeId', item.id)">
        <v-skeleton-loader v-if="!isImageLoaded[index]" height="140" width="110" loading/>
        <template v-else>
          <img :src="item.exampleUrl" :alt="item.name"/>
          <div class="name">{{item.name}}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {UtHairStyle} from "@/util/UtHairStyle.js";
import {UtEthnicity} from "@/util/UtEthnicity.js";
import {UtBodyType} from "@/util/UtBodyType.js";

export default {
  props: {
    bodyTypeId: {type: Number, required: true}
  },
  data() {
    return {
      isImageLoaded: []
    }
  },
  mounted() {
    this.preloadImages()
  },
  computed: {
    bodyTypes() {
      return UtBodyType.getBodyTypes()
    }
  },
  methods: {
    async preloadImages() {
      this.bodyTypes.forEach((item, index) => {
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
#choose-body-type {
  .items {
    display: flex;
    justify-content: center;
    column-gap: 10px;
    row-gap: 20px;
    flex-wrap: wrap;

    .item:hover {
      background: #232323;
      box-shadow: 0 0 14px #232323;
      min-width: 100px;

      .name {
        background: #232323;
      }
    }

    .item.selected {
      background-image: linear-gradient(120deg, #ffa463, #f86aaf);
      box-shadow: 0 0 20px #f86aaf;

      .name {
        background-image: linear-gradient(120deg, #ffa463, #f86aaf);
      }
    }

    .item {
      position: relative;
      border-radius: 4px;
      padding: 3px;
      background-color: #494949;
      cursor: pointer;

      img {
        width: 120px;
      }

      .name {
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translate(-50%);
        padding: 2px 10px;
        border-radius: 10px;
        background-color: #494949;
        color: white;
        font-weight: bold;
      }
    }
  }
}
</style>