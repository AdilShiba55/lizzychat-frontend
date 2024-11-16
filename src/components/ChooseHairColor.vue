<template>
  <div id="choose-hair-color">
    <div class="items">
      <div v-for="(item, index) in UtHairColor.getHairColorsByCharacterTypeId(characterTypeId)"
           :key="item.id"
           class="item"
           :class="{'selected':item.id === hairColorId}"
           @click="$emit('update:hairColorId', item.id)">
        <div class="hair-title" :style="`background-color: ${item.exampleColor}`">HAIR</div>
        <div class="name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {UtHairColor} from "@/util/UtHairColor.js";

export default {
  props: {
    hairColorId: {type: Number, required: true},
    characterTypeId: {type: Number, required: true}
  },
  computed: {
    UtHairColor() {
      return UtHairColor
    }
  }
}
</script>

<style lang="scss">
#choose-hair-color {
  display: flex;
  justify-content: center;
  .items {
    display: flex;
    justify-content: center;
    column-gap: 10px;
    row-gap: 20px;
    flex-wrap: wrap;
    max-width: 500px;

    .item {
      position: relative;
      border-radius: 4px;
      padding: 2px;
      background-color: #494949;
      cursor: pointer;

      .hair-title {
        height: 30px;
        width: 90px;
        color: white;
        font-weight: bold;
        text-align: center;
      }
      .name {
        font-size: 12px;
        text-align: center;
        width: 90%;

        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translate(-50%);
        padding: 1px 10px;
        border-radius: 10px;
        background-color: #494949;
        color: white;
        font-weight: bold;
      }
    }

    .item:hover {
      background: #232323;
      box-shadow: 0 0 8px #232323;

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
  }
}
</style>