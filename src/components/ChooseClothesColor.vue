<template>
  <div id="choose-clothes-color">
    <div class="items">
      <div v-for="(item, index) in UtClothesColor.getClothesColors()"
           :key="item.id"
           class="item"
           :class="{'selected':item.id === clothesColorId}"
           @click="select(item)">
        <v-icon icon="mdi-tshirt-crew" :color="item.color"/>
      </div>
    </div>
  </div>
</template>

<script>
import {UtClothesColor} from "@/util/UtClothesColor.js";

export default {
  props: {
    clothesColorId: {type: Number}
  },
  computed: {
    UtClothesColor() {
      return UtClothesColor
    }
  },
  methods: {
    select(item) {
      this.$emit('update:clothesColorId', this.clothesColorId === item.id ? null : item.id)
    }
  }
}
</script>

<style lang="scss">
#choose-clothes-color {
  display: flex;
  justify-content: center;
  .items {
    display: flex;
    justify-content: center;
    column-gap: 10px;
    row-gap: 10px;
    flex-wrap: wrap;
    max-width: 500px;

    .item {
      display: flex;
      justify-content: center;
      position: relative;
      border-radius: 4px;
      padding: 2px;
      background-color: #494949;
      cursor: pointer;

      .mdi {
        font-size: 35px;
      }
    }

    .item:hover {
      background: #232323;
      box-shadow: 0 0 8px #232323;
    }

    .item.selected {
      background-image: linear-gradient(120deg, #ffa463, #f86aaf);
      box-shadow: 0 0 20px #f86aaf;
    }
  }
}
</style>