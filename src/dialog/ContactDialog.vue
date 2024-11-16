<template>
  <BaseDialog id="contact-dialog"
              title="Contact us"
              width="500"
              @close="$emit('close')">
    <template v-slot:content>
      <div class="title-container">
        <div class="title">Contact us</div>
        <div class="description">Write your message here.</div>
      </div>
      <v-form ref="form">
        <v-textarea
            v-model="form.text"
            label="Description"
            variant="outlined"
            maxlength="500"
            :disabled="isLoading"
            :rules="errorStore.getRule('text')"/>
      </v-form>

      <v-btn class="log-button"
             variant="outlined"
             :loading="isLoading"
             @click="send"
             rounded
             block>SEND</v-btn>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from "@/dialog/BaseDialog.vue";
import {ca} from "vuetify/locale";
import {contactRequestApi} from "@/api/contactRequest.api.js";
import {useContactDialogStore, useDialogStore} from "@/stores/dialog.js";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {BaseDialog},
  watch: {
    form: {
      handler() {
        this.errorStore.resetError(this.$refs.form)
      },
      deep: true
    },
  },
  data() {
    return {
      errorStore: useErrorStore(),
      contactDialog: useContactDialogStore(),
      form: {},
      isLoading: false
    }
  },
  methods: {
    async send() {
      this.isLoading = true;
      try {
        await contactRequestApi.create(this.form)
        this.contactDialog.close()
      } catch (error) {
        await this.errorStore.handleError(error, this.$refs.form)
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style lang="scss">
#contact-dialog {
  .header, .footer {
    display: none;
  }
  .content {
    display: flex;
    flex-direction: column;
    //gap: 20px;
    .title-container {
      margin-bottom: 20px;
      .title {
        font-size: 28px;
        font-weight: bold;
      }
      .description {
        font-weight: bold;
      }
    }
    .v-btn {
      margin-top: 10px
    }
  }
}
</style>