<template>
  <div id="choose-occupations">
    <div class="items">
      <v-chip
          v-for="item in occupations"
          :key="item.id"
          class="item"
          :class="{'selected':occupationId === item.id}"
          @click="$emit('update:occupationId', item.id)">
        {{ item.name }}
      </v-chip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    occupationId: {type: Number, required: true},
    occupations: {type: Array, required: true}
  }
}
</script>

<style lang="scss">
#choose-occupations {
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