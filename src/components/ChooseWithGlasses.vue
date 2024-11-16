<template>
  <div id="choose-with-glasses">
    <div class="items">
      <v-chip
          class="item"
          :class="{'selected':withGlasses}"
          @click="$emit('update:withGlasses', true)">
        With glasses
      </v-chip>

      <v-chip
          class="item"
          :class="{'selected':!withGlasses}"
          @click="$emit('update:withGlasses', false)">
        No glasses
      </v-chip>
    </div>
  </div>
</template>
<script>
import {UtCharacterType} from "@/util/UtCharacterType.js";

export default {
  props: {
    withGlasses: {type: Boolean, required: true}
  },
  computed: {
    UtCharacterType() {
      return UtCharacterType
    }
  }
}
</script>

<style lang="scss">
#choose-with-glasses {
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