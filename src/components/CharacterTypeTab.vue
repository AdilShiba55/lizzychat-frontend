<template>
  <div id="character-type-tab">
    <v-tabs
        v-model="form.typeId"
        align-tabs="center"
        color="deep-purple-accent-4">
      <v-tab v-for="(type) in characterTypes"
             :value="type.id"
             :disabled="disabled"
      >{{type.name}}</v-tab>
    </v-tabs>
  </div>
</template>

<script>
import {CHARACTER_TYPE} from "@/util/constants.js";

export default {
  props: {
    form: {type: Object, required: true},
    disabled: {type: Boolean, default: false}
  },
  computed: {
    characterTypes() {
      return [{id: null, name: 'All'}, CHARACTER_TYPE[0], CHARACTER_TYPE[1], CHARACTER_TYPE[2]]
    }
  }
}
</script>

<style lang="scss">
#character-type-tab {
  display: flex;
  justify-content: center;
  gap: 20px;

  button {
    color: white;
    min-width: 70px !important;
    .v-btn__content {
      font-weight: bold;
    }
  }
}
</style>