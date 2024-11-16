<template>
  <div id="choose-mood">
    <div class="items">
      <div class="item"
           :class="{'selected':moodId === UtMood.SMILE.id}"
           @click="select(UtMood.SMILE.id)">
        <v-icon icon="mdi-emoticon-happy"/>
      </div>
      <div class="item"
           :class="{'selected':moodId === UtMood.SHY.id}"
           @click="select(UtMood.SHY.id)">
        <v-icon icon="mdi-emoticon-kiss"/>
      </div>
      <div class="item"
           :class="{'selected':moodId === UtMood.ANGRY.id}"
           @click="select(UtMood.ANGRY.id)">
        <v-icon icon="mdi-emoticon-angry"/>
      </div>
    </div>
  </div>
</template>

<script>
import {UtMood} from "@/util/UtMood.js";

export default {
  props: {
    moodId: {type: Number, required: false}
  },
  computed: {
    UtMood() {
      return UtMood
    },
  },
  methods: {
    select(id) {
      const value = this.moodId === id ? null : id;
      this.$emit('update:moodId', value)
    }
  }
}
</script>

<style lang="scss">
#choose-mood {
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
        color: white;
        font-size: 30px;
      }
    }
  }
}
</style>