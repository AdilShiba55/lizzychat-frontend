<template>
  <div id="choose-hair-style">
    <div class="items">
      <div v-for="(item, index) in hairStyle"
           :key="item.id"
           class="item"
           :class="{'selected':item.id === hairStyleId}"
           @click="$emit('update:hairStyleId', item.id)">
        <v-skeleton-loader v-if="!isImageLoaded[index]" height="125" width="120" loading/>
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

export default {
  props: {
    hairStyleId: {type: Number, required: true}
  },
  data() {
    return {
      isImageLoaded: []
    }
  },
  mounted() {
    this.hairStyle.forEach((item, index) => {
      const img = new Image();
      img.src = item.exampleUrl;
      img.onload = () => {
        this.isImageLoaded[index] = true;
      };
    });
  },
  computed: {
    hairStyle() {
      return UtHairStyle.getHairStyles()
    }
  }
}
</script>

<style lang="scss">
#choose-hair-style {
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

      .v-skeleton-loader {
        background-color: #242424;
      }

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