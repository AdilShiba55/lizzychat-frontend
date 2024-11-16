<template>
  <BaseDialog id="faq-edit-dialog"
              title="FAQ"
              width="500"
              @close="close">
    <template v-slot:content>
      <v-form ref="form">

        <text-field v-if="form.dtCreate"
                    :form="form"
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
                    field-name="name"
                    label="name"
                    :errors="errorStore.errors" />

        <v-textarea
            v-model="form.description"
            label="description"
            variant="outlined"
            maxlength="500"
            :rules="errorStore.getRule('text')"/>

        <v-switch
            v-model="form.archived"
            label="archived"
            color="error"
            :disabled="isLoading"
            hide-details/>
      </v-form>
    </template>

    <template v-slot:footer>
      <div class="button-container">
        <v-btn color="success"
               :loading="isLoading"
               @click="edit"
               block>Save</v-btn>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from "@/dialog/BaseDialog.vue";
import TextField from "@/components/TextField.vue";
import {useAuthStore} from "@/stores/auth.js";
import {useDialogStore} from "@/stores/dialog.js";
import {faqAdminApi} from "@/api/faqAdmin.api.js";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {TextField, BaseDialog},
  props: {
    id: {type: Number},
  },
  async mounted() {
    if(this.isUpdate) {
      await this.fetchData()
    }
  },
  computed: {
    title() {
      return this.id ? 'Editing' : 'Creating'
    },
    isCreate() {
      return !this.id
    },
    isUpdate() {
      return !!this.id;
    }
  },
  data() {
    return {
      errorStore: useErrorStore(),
      authStore: useAuthStore(),
      faqEditDialog: useDialogStore().getFaqEditDialog,
      form: {
        archived: false
      },
      isLoading: false,
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async fetchData() {
      this.isLoading = true;
      try {
        const faq = await faqAdminApi.findById(this.id)
        this.setForm(faq)
      } catch (error) {
        await this.errorStore.handleError(error, this.$refs.form)
      } finally {
        this.isLoading = false;
      }
    },
    setForm(faq) {
      this.form = {
        id: this.id,
        name: faq.name,
        description: faq.description,
        dtCreate: null,
        dtArchive: null,
        archived: !!faq.dtArchive
      }
      if(faq.dtCreate) {
        this.form.dtCreate = new Date(faq.dtCreate).toLocaleDateString();
      }
      if(faq.dtArchive) {
        this.form.dtArchive = new Date(faq.dtArchive).toLocaleDateString()
      }
      console.log('setForm', this.form)
    },
    async edit() {
      this.isLoading = true;
      try {
        await faqAdminApi.edit(this.form)
        this.faqEditDialog.triggerSuccess()
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style lang="scss">
#faq-edit-dialog {
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