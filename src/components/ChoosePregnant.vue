<template>
  <div id="choose-pregnant">
    <div class="items">
      <v-chip
          class="item"
          :class="{'selected':pregnant}"
          :disabled="characterTypeId === UtCharacterType.REAL.id"
          @click="$emit('update:pregnant', true)">
        Pregnant
      </v-chip>

      <v-chip
          class="item"
          :class="{'selected':!pregnant}"
          @click="$emit('update:pregnant', false)">
        Not Pregnant
      </v-chip>
    </div>
  </div>
</template>
<script>
import {UtCharacterType} from "@/util/UtCharacterType.js";

export default {
  props: {
    pregnant: {type: Boolean, required: true},
    characterTypeId: {type: Number, required: true}
  },
  computed: {
    UtCharacterType() {
      return UtCharacterType
    }
  }
}
</script>

<style lang="scss">
#choose-pregnant {
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