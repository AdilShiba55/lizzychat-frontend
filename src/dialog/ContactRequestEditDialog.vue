<template>
  <BaseDialog id="contact-request-edit-dialog"
              title="Request"
              width="500"
              @close="close">
    <template v-slot:content>
      <v-form ref="form">
        <text-field :form="form"
                    field-name="dtCreate"
                    label="created at"
                    disabled
                    :errors="errorStore.errors" />

        <text-field v-if="form.dtArchive"
                    :form="form"
                    field-name="dtArchive"
                    label="archived at"
                    disabled
                    :errors="errorStore.errors" />

        <text-field :form="form"
                    field-name="userId"
                    label="userId"
                    disabled
                    :errors="errorStore.errors" />

        <text-field :form="form"
                    field-name="username"
                    label="username"
                    disabled
                    :errors="errorStore.errors" />

        <text-field :form="form"
                    field-name="userEmail"
                    label="userEmail"
                    disabled
                    :errors="errorStore.errors" />

        <v-textarea
            v-model="form.text"
            label="text"
            variant="outlined"
            maxlength="500"
            disabled
            :rules="errorStore.getRule('text')"/>
      </v-form>
    </template>

    <template v-slot:footer>
      <div class="button-container">
        <v-btn variant="tonal"
               :loading="isLoading"
               @click="close"
               block>Cancel</v-btn>

        <v-btn v-if="!form.dtArchive"
               color="success"
               :loading="isLoading"
               @click="archive"
               block>Archive</v-btn>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from "@/dialog/BaseDialog.vue";
import TextField from "@/components/TextField.vue";
import AvatarBanner from "@/components/AvatarBanner.vue";
import {useAuthStore} from "@/stores/auth.js";
import {useContactEditDialogStore, useDialogStore} from "@/stores/dialog.js";
import {contactRequestAdminApi} from "@/api/contactRequestAdmin.api.js";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {AvatarBanner, TextField, BaseDialog},
  async mounted() {
    const contactRequest = await contactRequestAdminApi.findById(this.id)
    this.setForm(contactRequest)
  },
  data() {
    return {
      errorStore: useErrorStore(),
      authStore: useAuthStore(),
      contactEditDialog: useContactEditDialogStore(),
      form: {},
      isLoading: false,
    }
  },
  computed: {
    id() {
      return this.contactEditDialog.id;
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    setForm(contactRequest) {
      this.form = {
        id: contactRequest.id,
        text: contactRequest.text,
        dtCreate: new Date(contactRequest.dtCreate).toLocaleDateString(),
        dtArchive: null,
        userId: contactRequest.userId,
        username: contactRequest.username,
        userEmail: contactRequest.userEmail
      }
      if(contactRequest.dtArchive) {
        this.form.dtArchive = new Date(contactRequest.dtArchive).toLocaleDateString()
      }
      console.log('setForm', this.form)
    },
    async archive() {
      this.isLoading = true;
      try {
        await contactRequestAdminApi.archive(this.id)
        this.contactEditDialog.successCount++;
        this.$emit('close')
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        this.isLoading = false;
      }
    },
  }
}
</script>

<style lang="scss">
#contact-request-edit-dialog {
  .content {}
  .footer {
    padding: 10px;
    .button-container {
      display: flex;
      justify-content: right;
      gap: 10px;
      .v-btn {
        max-width: 150px;
        min-width: unset;
        padding: unset;
      }
    }
  }
}
</style>