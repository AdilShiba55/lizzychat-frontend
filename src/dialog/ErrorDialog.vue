<template>
  <BaseDialog id="error-dialog"
              title="Error"
              width="500"
              @close="close">
    <template v-slot:content>
      <div v-for="(item, index) in errorStore.getErrors">
        {{ getMessage(item, index) }}
      </div>
    </template>
    <template v-slot:footer>
      <v-card-actions class="justify-end">
        <v-btn
            text="Close"
            variant="tonal"
            @click="close"/>
      </v-card-actions>
    </template>
  </BaseDialog>
</template>

<script>
import {useErrorStore} from "../stores/error";
import BaseDialog from "./BaseDialog.vue";

export default {
  components: {BaseDialog},
  data() {
    return {
      errorStore: useErrorStore()
    }
  },
  methods: {
    getMessage(item, index) {
      if(typeof item === 'string') {
        return item;
      } else {
        return `${index+1}) ${item.name} ${item.error}`
      }
    },
    close() {
      this.errorStore.hideError()
    }
  },

}
</script>

<style lang="scss">
#error-dialog {
  .v-overlay__content {

    .header {
      .v-toolbar {
        color: white;
      }
    }

    .content {
      font-size: 20px;
    }
  }
}
</style>
