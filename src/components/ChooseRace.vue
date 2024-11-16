<template>
  <div id="choose-race">
    <div class="items">
      <v-chip
          v-for="item in UtRace.getRaces()"
          :key="item.id"
          class="item"
          :class="{'selected':raceId === item.id}"
          :disabled="(characterTypeId === UtCharacterType.REAL.id && item.id === UtRace.ELF.id) || item.id === UtRace.FURRY.id"
          @click="$emit('update:raceId', item.id)">
        {{ item.name }}
      </v-chip>
    </div>
  </div>
</template>

<script>
import {UtRace} from "@/util/UtRace.js";
import {UtCharacterType} from "@/util/UtCharacterType.js";

export default {
  props: {
    raceId: {type: Number, required: true},
    characterTypeId: {type: Number, required: true}
  },
  computed: {
    UtCharacterType() {
      return UtCharacterType
    },
    UtRace() {
      return UtRace
    }
  },
}
</script>

<style lang="scss">
#choose-race {
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