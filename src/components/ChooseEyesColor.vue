<template>
  <div id="choose-eyes-color">
    <div class="items">
      <div v-for="(item, index) in eyesColors"
           class="item"
           :class="{'selected':item.id === eyesColorId}"
           @click="$emit('update:eyesColorId', item.id)">
        <v-skeleton-loader v-if="item.exampleUrl && !isImageLoaded[index]" height="56" width="100" loading/>
        <template v-else>
          <img v-if="item.exampleUrl" :src="item.exampleUrl" :alt="item.name"/>
          <div v-else-if="item.color" :style="`background-color: ${item.color}; height: 100%; width: 100px`"/>
          <div class="name">{{item.name}}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {UtHairStyle} from "@/util/UtHairStyle.js";
import {UtEyesColor} from "@/util/UtEyesColor.js";

export default {
  props: {
    eyesColorId: {type: Number, required: true},
    characterTypeId: {type: Number, required: true},
    adminMode: {type: Boolean, required: true}
  },
  data() {
    return {
      isImageLoaded: []
    }
  },
  mounted() {
    UtEyesColor.getEyesColors(this.adminMode).filter(item => item.exampleUrl).forEach((item, index) => {
      const img = new Image();
      img.src = item.exampleUrl;
      img.onload = () => {
        this.isImageLoaded[index] = true;
      };
    });
  },
  computed: {
    eyesColors() {
      return UtEyesColor.getEyesColorsByCharacterTypeId(this.characterTypeId, this.adminMode)
    }
  }
}
</script>

<style lang="scss">
#choose-eyes-color {
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
        width: 95px;
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
        font-size: 13px;
      }
    }
  }
}
</style>