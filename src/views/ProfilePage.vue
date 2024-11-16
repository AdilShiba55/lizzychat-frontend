<template>
  <div id="profile-page">

    <avatar-banner :form="form"
                   @uploaded="uploadAvatar"
                   :is-loading="isLoading"/>

    <v-form ref="form">
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
    </v-form>

    <div class="button-container">
      <v-btn variant="flat"
             :loading="isLoading"
             @click="editUser"
             block>Save</v-btn>
    </div>
  </div>
</template>
<script>
import PasswordTextField from "@/components/PasswordTextField.vue";
import TextField from "@/components/TextField.vue";
import {useAuthStore} from "@/stores/auth.js";
import AvatarBanner from "@/components/AvatarBanner.vue";
import {userApi} from "@/api/user.api.js";
import {UtScroll} from "@/util/UtScroll.js";
import {useHead} from "@unhead/vue";
import {useErrorStore} from "@/stores/error.js";
export default {
  components: {AvatarBanner, TextField, PasswordTextField},
  watch: {
    'authStore.getUserInfo': {
      handler() {
        const userInfo = this.authStore.getUserInfo
        this.setForm(userInfo)
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    useHead({
      title: 'Profile - LizzyChat',
      link: [
        { rel: 'canonical', href: 'https://www.lizzychat.com/profile' }
      ]
    })
  },
  mounted() {
    UtScroll.removeLayoutMaxWidth()
  },
  unmounted() {
    UtScroll.returnLayoutMaxWidth()
  },
  data() {
    return {
      isLoading: false,
      errorStore: useErrorStore(),
      authStore: useAuthStore(),
      form: {
        files: []
      }
    }
  },
  computed: {
    userInfo() {
      return this.authStore.getUserInfo
    }
  },
  methods: {
    async uploadAvatar() {
      this.isLoading = true;
      try {
        await userApi.uploadAvatar(this.form.files[0])
        const reader = new FileReader();
        reader.readAsDataURL(this.form.files[0])
        reader.onload = () => {
          this.authStore.setAvatarToUserInfo(reader.result)
        }
      } catch (error) {
        await this.errorStore.handleError(error, this.$refs.form)
      } finally {
        this.isLoading = false;
      }
    },
    async editUser() {
      this.isLoading = true;
      try {
        await this.authStore.editUser({username: this.form.username})
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
        exp: `${userInfo.exp} (level: ${Math.round(userInfo.exp / 1000)})`,
        avatarUrl: userInfo.avatarUrl,
        dtCreate: new Date(userInfo.dtCreate),
        dtVerified: new Date(userInfo.dtVerified),
        files: []
      }
    }
  }
}
</script>

<style lang="scss">
#profile-page {
  display: flex;
  flex-direction: column;
  .v-form {
    width: 100%;
    max-width: 800px;
    padding: 12px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    margin: 90px auto 12px auto;
    gap: 20px;
  }
  .button-container {
    display: flex;
    justify-content: center;
    padding-bottom: 18px;
    .v-btn {
      max-width: 300px;
      min-width: unset;
      box-shadow: 0 0 8px #efeff2;
    }
  }
}

@media (max-width: 640px) {
  #profile-page {
    .v-form {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>