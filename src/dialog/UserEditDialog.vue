<template>
  <BaseDialog id="user-edit-dialog"
              :title="title"
              width="500"
              @close="close">
    <template v-slot:content>
      <avatar-banner :form="form"
                     :is-loading="isLoading"
                     @uploaded="uploadAvatar"/>

      <v-form ref="form">
        <text-field :form="form"
                    field-name="dtCreate"
                    label="created at"
                    read-only
                    :errors="errorStore.errors" />

        <text-field v-if="form.dtVerified"
                    :form="form"
                    field-name="dtVerified"
                    label="verified at"
                    read-only
                    :errors="errorStore.errors" />

        <text-field :form="form"
                    field-name="id"
                    label="ID"
                    read-only
                    :errors="errorStore.errors" />

        <text-field :form="form"
                    field-name="email"
                    label="email"
                    read-only
                    :errors="errorStore.errors" />

        <text-field :form="form"
                    field-name="username"
                    label="username"
                    :disabled="isLoading"
                    :errors="errorStore.errors" />

        <text-field v-if="form.dtBlocked"
                    :form="form"
                    field-name="dtBlocked"
                    label="blocked at"
                    read-only
                    :errors="errorStore.errors" />

        <v-switch
            v-model="form.blocked"
            label="blocked"
            color="error"
            :disabled="isLoading"
            hide-details/>
      </v-form>
    </template>

    <template v-slot:footer>
      <div class="button-container">
        <v-btn variant="flat"
               :loading="isLoading"
               @click="editUser"
               block>Save</v-btn>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from "@/dialog/BaseDialog.vue";
import TextField from "@/components/TextField.vue";
import AvatarBanner from "@/components/AvatarBanner.vue";
import {useAuthStore} from "@/stores/auth.js";
import {userApi} from "@/api/user.api.js";
import {userAdminApi} from "@/api/userAdmin.api.js";
import {useDialogStore} from "@/stores/dialog.js";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {AvatarBanner, TextField, BaseDialog},
  props: {
    id: {type: Number},
  },
  async created() {
    if (this.isUpdate) {
      await this.fetchData()
    }
  },
  data() {
    return {
      errorStore: useErrorStore(),
      authStore: useAuthStore(),
      userEditDialog: useDialogStore().getUserEditDialog,
      form: {},
      isLoading: false,
    }
  },
  computed: {
    title() {
      return this.id ? 'Editing' : 'Creating'
    },
    isUpdate() {
      return !!this.id;
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async fetchData() {
      this.isLoading = true;
      try {
        const userInfo = await userAdminApi.getUserInfo(this.id)
        this.setForm(userInfo)
      } catch (error) {
        await this.errorStore.handleError(error, this.$refs.form)
      } finally {
        this.isLoading = false;
      }
    },
    setForm(userInfo) {
      this.form = {
        id: userInfo.id,
        email: userInfo.email,
        username: userInfo.username,
        avatarUrl: userInfo.avatarUrl,
        dtCreate: new Date(userInfo.dtCreate)?.toLocaleDateString(),
        dtVerified: null,
        dtBlocked: null,
        blocked: !!userInfo.dtBlocked,
        files: []
      }
      if(userInfo.dtVerified) {
        this.form.dtVerified = new Date(userInfo.dtVerified)?.toLocaleDateString()
      }
      if(userInfo.dtBlocked) {
        this.form.dtBlocked = new Date(userInfo.dtBlocked)?.toLocaleDateString()
      }
      console.log('setForm', this.form)
    },
    async uploadAvatar() {
      this.isLoading = true;
      try {
        await userAdminApi.uploadAvatar(this.id, this.form.files[0])
        const reader = new FileReader();
        reader.readAsDataURL(this.form.files[0])
        reader.onload = () => {
          this.form.avatarUrl = reader.result;
        }
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        this.isLoading = false;
      }
    },
    async editUser() {
      this.isLoading = true;
      try {
        await userAdminApi.edit(this.form)
        this.userEditDialog.triggerSuccess()
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
#user-edit-dialog {
  .content {
    #avatar-banner {
      margin-bottom: 90px;
    }
  }
  .footer {
    padding: 10px;
    .button-container {
      display: flex;
      justify-content: right;
      .v-btn {
        max-width: 150px;
        min-width: unset;
        padding: unset;
      }
    }
  }
}
</style>