<template>
  <v-text-field class="password-text-field"
                density="comfortable"
                v-model="form[fieldName]"
                :label="label"
                variant="outlined"
                color="white"
                base-color="white"
                :type="type"
                :append-inner-icon="icon"
                :on-click:append-inner="changeVisibility"
                :disabled="disabled"
                :rules="passwordRule"></v-text-field>
</template>

<script>
  import {UtError} from "@/util/UtError.js";

  export default {
    props: {
      label: {type: String, default: 'Your password'},
      fieldName: {type: String, default: 'password'},
      form: {type: Object, required: true},
      disabled: {type: Boolean, default: false},
      errors: {type: Array, required: true}
    },
    data() {
      return {
        shown: false
      }
    },
    computed: {
      passwordRule() {
        return UtError.getRule(this.fieldName, this.errors)
      },
      type() {
        return this.shown ? 'text' : 'password'
      },
      icon() {
        return this.shown ? 'mdi-eye' : 'mdi-eye-off'
      }
    },
    methods: {
      changeVisibility() {
        this.shown = !this.shown
      }
    }
  }
</script>

<style lang="scss">
  .password-text-field {
    .mdi {
      color: white;
    }
    .v-field__input {
      color: white;
    }
  }
</style>