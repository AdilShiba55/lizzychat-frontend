<template>
  <div id="choose-age">
    <div class="items">
      <v-chip
          v-for="(item, index) in items"
          :key="item.id"
          class="item"
          :class="{'selected':(age >= item.min && age <= item.max) || (index+1 === items.length && age > item.max)}"
          @click="$emit('update:age', UtNumber.getRandomNumberBetween(item.min, item.max))">
        {{ item.text }}
      </v-chip>
    </div>
  </div>
</template>

<script>
import {UtNumber} from "@/util/UtNumber.js";

export default {
  props: {
    age: {type: Number, required: true}
  },
  data() {
    return {
      items: [
        {
          min: 18,
          max: 29,
          text: '18+'
        },
        {
          min: 30,
          max: 39,
          text: '30+'
        },
        {
          min: 40,
          max: 49,
          text: '40+'
        }
      ]
    }
  },
  computed: {
    UtNumber() {
      return UtNumber
    }
  },
}
</script>

<style lang="scss">
#choose-age {
  display: flex;
  justify-content: center;

  .items {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    max-width: 550px;

    .item.selected {
      background-image: linear-gradient(120deg, #ffa463, #f86aaf);
      box-shadow: 0 0 20px #f86aaf;
    }
  }
}
</style>