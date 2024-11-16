<template>
  <div id="simple-user-nav">
    <v-btn variant="outlined"
           :class="planClass"
           @click="openAddCrystalsDialog">
      <template v-slot:default>
        <span class="top-label">{{planName}}</span>
        <span>{{authStore.getBalance}}</span>
      </template>
      <template v-slot:prepend>
        <img class="crystals" src="/crystals_60x60.webp" alt="crystals"/>
      </template>
      <template v-slot:append>
        <img class="crystals" src="/crystals_60x60.webp" alt="crystals"/>
      </template>
    </v-btn>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores/auth.js";
import {useDialogStore} from "@/stores/dialog.js";

export default {
  data() {
    return {
      authStore: useAuthStore(),
      loginDialog: useDialogStore().getLoginDialog,
      addBalanceDialog: useDialogStore().getAddBalanceDialog,
      text: 'test'
    }
  },
  computed: {
    planClass() {
      return this.authStore.isPremium ? 'premium' : 'base'
    },
    planName() {
      return this.authStore.isPremium ? 'PREMIUM' : 'BASE'
    }
  },
  methods: {
    openAddCrystalsDialog() {
      this.addBalanceDialog.show()
    }
  }
}
</script>

<style lang="scss">
#simple-user-nav {
  min-width: 90px;

  .v-btn.premium {
    color: #ffc000;
  }
  .top-label {
    position: absolute;
    top: -8px;
    font-size: 12px;
    background-color: $main-black;
  }
  .crystals {
    width: 30px;
  }
}
</style>