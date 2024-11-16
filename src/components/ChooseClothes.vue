<template>
  <div id="choose-clothes">
    <div class="items">
      <div v-for="(item, index) in UtClothes.getClothes()"
           class="item"
           :class="{'selected':clothesId === item.id}"
           @click="select(item.id)">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {UtMood} from "@/util/UtMood.js";
import {UtClothes} from "@/util/UtClothes.js";

export default {
  props: {
    clothesId: {type: Number, required: false}
  },
  computed: {
    UtClothes() {
      return UtClothes
    }
  },
  methods: {
    select(id) {
      const value = this.clothesId === id ? null : id;
      this.$emit('update:clothesId', value)
    }
  }
}
</script>

<style lang="scss">
#choose-clothes {
  .items {
    display: flex;
    justify-content: center;
    column-gap: 10px;
    row-gap: 10px;
    flex-wrap: wrap;

    .item.selected {
      background-image: linear-gradient(120deg, #ffa463, #f86aaf);
      box-shadow: 0 0 20px #f86aaf;

      .name {
        background-image: linear-gradient(120deg, #ffa463, #f86aaf);
      }
    }

    .item {
      cursor: pointer;
      padding: 3px 10px;
      border-radius: 4px;
      color: white;
      background-color: #494949;
    }
  }
}
</style>