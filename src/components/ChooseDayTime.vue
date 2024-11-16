<template>
  <div id="choose-day-time">
    <div class="items">
      <div class="item"
           :class="{'selected':dayTimeId === UtDayTime.DAY.id}"
           @click="select(UtDayTime.DAY.id)">
        <v-icon icon="mdi-white-balance-sunny"/>
      </div>
      <div class="item"
           :class="{'selected':dayTimeId === UtDayTime.NIGHT.id}"
           @click="select(UtDayTime.NIGHT.id)">
        <v-icon icon="mdi-weather-night"/>
      </div>
    </div>
  </div>
</template>

<script>
import {UtDayTime} from "@/util/UtDayTime.js";

export default {
  props: {
    dayTimeId: {type: Number, required: false}
  },
  computed: {
    UtDayTime() {
      return UtDayTime
    }
  },
  methods: {
    select(id) {
      const value = this.dayTimeId === id ? null : id;
      this.$emit('update:dayTimeId', value)
    }
  }
}
</script>

<style lang="scss">
#choose-day-time {
  .items {
    display: flex;
    justify-content: center;
    column-gap: 10px;
    row-gap: 20px;
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
      padding: 5px;
      border-radius: 4px;
      background-color: #494949;

      .mdi {
        font-size: 30px;
      }
      .mdi-white-balance-sunny {
        color: #ffff64;
      }
    }
  }
}
</style>