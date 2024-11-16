<template>
  <div id="choose-personality">
    <div class="items">
      <div v-for="(item, index) in UtPersonality.getPersonalities()"
           :key="item.id"
           class="item-container"
           :class="{'selected':personalityId === item.id}"
           @click="$emit('update:personalityId', item.id)">
        <div class="item">
          <v-icon :icon="item.icon" :color="item.iconColor"/>
          <div class="name">{{item.name}}</div>
          <div class="description">{{item.description}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {UtPersonality} from "@/util/UtPersonality.js";

export default {
  props: {
    personalityId: {type: Number, required: true}
  },
  computed: {
    UtPersonality() {
      return UtPersonality
    }
  }

}
</script>

<style lang="scss">
#choose-personality {
  display: flex;
  justify-content: center;
  .items {
    display: flex;
    justify-content: center;
    column-gap: 10px;
    row-gap: 20px;
    flex-wrap: wrap;
    max-width: 1000px;

    .item-container:hover {
      //background: #232323;
      box-shadow: 0 0 14px #232323;
    }

    .item-container.selected {
      background-image: linear-gradient(120deg, #ffa463, #f86aaf);
      box-shadow: 0 0 20px #f86aaf;
    }

    .item-container {
      padding: 4px;
      cursor: pointer;
      border-radius: 10px;
      width: 300px;
      background-color: #494949;

      .item {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 10px;
        gap: 8px;
        background-color: #1f1f1f;
        border-radius: 7px;

        .mdi {
          font-size: 30px;
        }

        .name {
          color: white;
          font-weight: bold;
        }
        .description {
          color: #d3d3d3;
          font-size: 13px;
        }
      }
    }
  }
}
</style>