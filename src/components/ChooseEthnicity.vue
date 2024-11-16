<template>
  <div id="choose-ethnicity">
    <div class="items">
      <div v-for="(item, index) in ethnicities"
           class="item"
           :class="{'selected':item.id === ethnicityId}"
           @click="$emit('update:ethnicityId', item.id)">
        <v-skeleton-loader v-if="!isImageLoaded[index]" height="160" width="115" loading/>
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

export default {
  props: {
    ethnicityId: {type: Number, required: true}
  },
  data() {
    return {
      isImageLoaded: []
    }
  },
  mounted() {
    this.ethnicities.forEach((item, index) => {
      const img = new Image();
      img.src = item.exampleUrl;
      img.onload = () => {
        this.isImageLoaded[index] = true;
      };
    });
  },
  computed: {
    ethnicities() {
      return UtEthnicity.getEthnicities()
    }
  }
}
</script>

<style lang="scss">
#choose-ethnicity {
  .items {
    display: flex;
    justify-content: center;
    column-gap: 10px;
    row-gap: 20px;
    flex-wrap: wrap;

    .item:hover {
      background: #232323;
      box-shadow: 0 0 14px #232323;
      //min-width: 100px;

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